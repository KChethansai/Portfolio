import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { profile } from '@/lib/data'
import { ease, duration } from '@/lib/motion'
import { useReducedMotion } from '@/lib/performance'

const easeInOutQuint = (t) =>
  t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2

const TYPING_RATE = 36 // characters / second
const MIN_MS = 900 // floor so the beat never feels instant
const CAP_MS = 4000 // safety net — a stalled GPU never hangs the visitor
const COUNT_RAMP_MS = 1400 // counter 0 → 88
const LAND_MS = 430 // counter 88 → 100
const HOLD_MS = 220 // beat on 100 before the curtain lifts
const FONTS_GRACE_MS = 1200 // fonts.ready can hang on slow networks; don't stall on it

// Boot log — typed top to bottom. Each step resolves on a real signal when it
// has one (fonts.ready, worldReady) so the counter reads honest, never random.
const LINES = [
  '$ mount styles',
  '$ fetch fonts',
  '$ build world.scene',
  '✓ system ready',
]

export default function Preloader({ ready, onExitStart }) {
  const reduced = useReducedMotion()
  const prompt = `${profile.name.split(' ')[0].toLowerCase()}@portfolio:~$`

  const startAt = useRef(performance.now())
  const fontsReady = useRef(false)
  const forceReady = useRef(false)
  const pending = useRef(false)
  const ended = useRef(false)
  const landAt = useRef(0)
  const lastAt = useRef(performance.now())
  const startedAt = useRef(LINES.map(() => 0))
  const lines = useRef(LINES.map(() => ({ t: 0, locked: false })))

  const [count, setCount] = useState(0)
  const [log, setLog] = useState({ active: 0, typed: 0 })

  useEffect(() => {
    document.fonts?.ready.then(() => (fontsReady.current = true)).catch(() => {})

    let raf
    let lastSnapshot = ''

    const resolve = (i, elapsed) => {
      if (i === 0) return true
      if (i === 1) return fontsReady.current || elapsed - startedAt.current[i] > FONTS_GRACE_MS
      if (i === 2) return ready || forceReady.current
      return true
    }

    const tick = () => {
      if (ended.current) return
      const now = performance.now()
      const elapsed = now - startAt.current
      const dt = Math.min((now - lastAt.current) / 1000, 0.1)
      lastAt.current = now

      // Safety net — force-finish if WebGL never reports ready.
      if (elapsed >= CAP_MS) forceReady.current = true

      // Typewriter chain. Active line = first un-locked line, derived from refs.
      const firstPending = lines.current.findIndex((l) => !l.locked)
      const active = firstPending === -1 ? LINES.length : firstPending
      if (active < LINES.length) {
        const line = lines.current[active]
        if (!line.locked) {
          const len = LINES[active].length
          if (line.t < len) line.t = Math.min(len, line.t + TYPING_RATE * dt)
          if (line.t >= len && resolve(active, elapsed)) {
            line.locked = true
            startedAt.current[active + 1] = now
          }
        }
        const nextActive = active + (line.locked ? 1 : 0)
        const snapshot = `${nextActive}:${Math.round(line.t)}`
        if (snapshot !== lastSnapshot) {
          lastSnapshot = snapshot
          setLog({ active: nextActive, typed: Math.round(line.t) })
        }
      }

      // Armed once every boot step is done and the world is actually ready.
      if (
        !pending.current &&
        active >= LINES.length &&
        (ready || forceReady.current) &&
        elapsed >= MIN_MS
      ) {
        pending.current = true
        landAt.current = now
      }

      // Counter: 0 → 88 on a quint curve, then 88 → 100 as the world reports in.
      const target = pending.current
        ? 88 + 12 * easeInOutQuint(Math.min((now - landAt.current) / LAND_MS, 1))
        : 88 * easeInOutQuint(Math.min(elapsed / COUNT_RAMP_MS, 1))
      setCount(target)

      // Hold a beat on 100, then lift the curtain — the page enters underneath.
      if (pending.current && now - landAt.current > LAND_MS + HOLD_MS) {
        ended.current = true
        cancelAnimationFrame(raf)
        onExitStart()
        return
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready, onExitStart])

  const shownCount = reduced ? 100 : Math.round(count)
  const active = log.active
  const busy = !reduced && active < LINES.length && log.typed >= LINES[active].length
  const blink = reduced ? '' : ' animate-[type-blink_1s_steps(1)_infinite]'

  return (
    <motion.div
      className='fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[var(--color-void)]'
      exit={reduced ? { opacity: 0 } : { y: '-100%' }}
      transition={reduced ? { duration: 0.2 } : { duration: duration.slow, ease: ease.out }}
      aria-label='Loading portfolio'
    >
      <p className='sr-only' role='status'>
        Loading portfolio
      </p>
      {/* Leading edge — the cyan hairline is the first thing to clear on the lift. */}
      <div
        aria-hidden
        className='absolute inset-x-0 top-0 h-px bg-[var(--color-accent)]/60 shadow-[0_0_14px_rgba(34,211,238,0.35)]'
      />

      <div className='mx-auto flex h-full w-full max-w-[1400px] flex-col justify-between px-6 py-10 md:px-12'>
        <div className='font-mono text-[13px] leading-7 tracking-tight md:text-sm'>
          <p className='text-[var(--color-ink-muted)]'>
            {prompt}
            <span className={`ml-1 inline-block${blink} text-[var(--color-accent)]`} aria-hidden>
              {'▌'}
            </span>
          </p>
          <div className='mt-4'>
            {LINES.map((cmd, i) => {
              if (i < active) {
                return (
                  <p key={cmd} className={i === 3 ? 'text-emerald-400/80' : 'text-[var(--color-ink-secondary)]'}>
                    {cmd}
                  </p>
                )
              }
              if (i === active && active < LINES.length) {
                if (reduced) {
                  return (
                    <p key={cmd} className={i === 3 ? 'text-emerald-400/80' : 'text-[var(--color-ink-secondary)]'}>
                      {cmd}
                    </p>
                  )
                }
                if (busy) {
                  return (
                    <p key={cmd} className='text-white/90'>
                      {cmd}
                      <span className={`ml-1${blink} text-[var(--color-accent)]`} aria-hidden>
                        …
                      </span>
                    </p>
                  )
                }
                return (
                  <p key={cmd} className='text-white/90'>
                    {cmd.slice(0, log.typed)}
                    <span className={`inline-block${blink} text-[var(--color-accent)]`} aria-hidden>
                      {'▌'}
                    </span>
                  </p>
                )
              }
              return null
            })}
          </div>
        </div>

        <div>
          <p className='font-mono text-[clamp(5rem,18vw,12rem)] font-medium leading-[0.8] tracking-[-0.06em] tabular-nums text-white'>
            {String(shownCount).padStart(3, '0')}
          </p>
          <div className='mt-8 h-px w-full overflow-hidden bg-white/[0.06]'>
            <div
              className='h-full origin-left bg-gradient-to-r from-[var(--color-accent)]/40 to-[var(--color-accent)]'
              style={{ transform: `scaleX(${Math.max(shownCount / 100, 0.01)})` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}