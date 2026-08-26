import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { profile } from '@/lib/data'

export default function Preloader({ ready, onDone }) {
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const start = useRef(performance.now())
  const done = useRef(false)

  useEffect(() => {
    let raf
    const tick = () => {
      const elapsed = performance.now() - start.current
      setCount((c) => {
        const ceiling = ready ? 100 : Math.min(90, c + 1.4)
        return Math.min(Math.max(c, ceiling), 100)
      })
      if (!done.current && ready && count >= 99 && elapsed > 900) {
        done.current = true
        setLeaving(true)
        setTimeout(onDone, 650)
        return
      }
      if (elapsed < 4000) raf = requestAnimationFrame(tick)
      else if (!done.current) {
        done.current = true
        setLeaving(true)
        setTimeout(onDone, 650)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready, count, onDone])

  useEffect(() => {
    document.fonts?.ready.catch(() => {})
  }, [])

  return (
    <motion.div
      className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050608]'
      initial={{ opacity: 1 }}
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label='Loading portfolio'
    >
      <p className='section-label text-[var(--color-accent)]/70'>
        Initializing
      </p>
      <h1 className='mt-3 text-xl font-bold tracking-tight text-white md:text-3xl'>
        {profile.name}
      </h1>

      <div className='mt-8 h-px w-40 overflow-hidden bg-white/[0.06]'>
        <div
          className='h-full bg-white/40 transition-[width] duration-150 ease-out'
          style={{ width: `${Math.round(count)}%` }}
        />
      </div>
      <p className='mt-3 text-[10px] tabular-nums uppercase tracking-[0.25em] text-[var(--color-ink-faint)]'>
        {String(Math.round(count)).padStart(3, '0')}%
      </p>
    </motion.div>
  )
}
