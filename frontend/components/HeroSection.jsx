import { Fragment, useEffect, useId, useMemo, useRef } from 'react'
import {
  motion,
  motionValue,
  useMotionValue,
  useSpring,
  useTransform,
  useTime,
  useAnimationFrame,
} from 'motion/react'
import { profile } from '@/lib/data'
import { useReducedMotion } from '@/lib/performance'

const NUM_AUTO_BLOBS = 25

export default function HeroSection({ parallaxStrength = 3, blobSize = 140 }) {
  const reduced = useReducedMotion()
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mouseXRatio = useMotionValue(0)
  const mouseYRatio = useMotionValue(0)
  const smooth = { stiffness: 300, damping: 40 }
  const smoothX = useSpring(mouseXRatio, smooth)
  const smoothY = useSpring(mouseYRatio, smooth)
  const baseX = useTransform(smoothX, [-1, 1], [parallaxStrength, -parallaxStrength])
  const baseY = useTransform(smoothY, [-1, 1], [parallaxStrength, -parallaxStrength])
  const revealX = useTransform(smoothX, [-1, 1], [parallaxStrength * 2, -parallaxStrength * 2])
  const revealY = useTransform(smoothY, [-1, 1], [parallaxStrength * 2, -parallaxStrength * 2])

  useEffect(() => {
    if (reduced) return
    const handleMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      if (!inside) {
        mouseXRatio.set(0)
        mouseYRatio.set(0)
        return
      }
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseX.set(x)
      mouseY.set(y)
      mouseXRatio.set((x / rect.width) * 2 - 1)
      mouseYRatio.set((y / rect.height) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [reduced, mouseX, mouseY, mouseXRatio, mouseYRatio])

  const headX = useSpring(mouseX, { stiffness: 250, damping: 30 })
  const headY = useSpring(mouseY, { stiffness: 250, damping: 30 })
  const body1X = useSpring(mouseX, { stiffness: 220, damping: 34 })
  const body1Y = useSpring(mouseY, { stiffness: 220, damping: 34 })
  const body2X = useSpring(mouseX, { stiffness: 190, damping: 38 })
  const body2Y = useSpring(mouseY, { stiffness: 190, damping: 38 })
  const head = { x: headX, y: headY }
  const body1 = { x: body1X, y: body1Y }
  const body2 = { x: body2X, y: body2Y }

  const time = useTime()
  const wobble = blobSize * 0.35
  const satX = useTransform(time, (t) => head.x.get() + Math.sin(t * 0.002) * wobble)
  const satY = useTransform(time, (t) => head.y.get() + Math.cos(t * 0.002) * wobble)

  const autoBlobs = useMemo(
    () =>
      [...Array(NUM_AUTO_BLOBS)].map(() => ({
        mainX: motionValue(0),
        mainY: motionValue(0),
        satX: motionValue(0),
        satY: motionValue(0),
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speedX: 0.0005 + Math.random() * 0.0005,
        speedY: 0.0003 + Math.random() * 0.0005,
        radius: blobSize * 0.6,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useAnimationFrame((t) => {
    if (reduced || !containerRef.current) return
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    autoBlobs.forEach((b) => {
      const mainX = ((Math.sin(t * b.speedX + b.phaseX) + 1) / 2) * width
      const mainY = ((Math.cos(t * b.speedY + b.phaseY) + 1) / 2) * height
      b.mainX.set(mainX)
      b.mainY.set(mainY)
      const satRadius = blobSize * 0.35
      b.satX.set(mainX + Math.sin(t * 0.002 + b.phaseX) * satRadius)
      b.satY.set(mainY + Math.cos(t * 0.002 + b.phaseY) * satRadius)
    })
  })

  const maskId = useId()
  const filterId = useId()

  const words = profile.name.split(' ')
  const baseLayer = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    willChange: 'transform',
    pointerEvents: 'none',
  }

  const nameBase = (
    <h1 className="text-center font-sans text-[clamp(3rem,11vw,10rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
      {words.map((w, i) => (
        <span key={i} className="block">
          {w}
        </span>
      ))}
    </h1>
  )

  const nameReveal = (
    <div
      aria-hidden
      className="text-center font-bungee text-[clamp(3rem,11vw,10rem)] uppercase leading-[0.9] text-transparent"
      style={{ WebkitTextStroke: '2px #d2ff00' }}
    >
      {words.map((w, i) => (
        <span key={i} className="block">
          {w}
        </span>
      ))}
    </div>
  )

  return (
    <section className="flex h-dvh w-full items-center justify-center overflow-hidden bg-black">
      <div ref={containerRef} className="relative h-full w-full overflow-hidden">
        {!reduced && (
          <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
            <defs>
              <filter id={filterId}>
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
              <mask id={maskId}>
                <g filter={`url(#${filterId})`}>
                  <motion.g animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    {autoBlobs.map((b, i) => (
                      <Fragment key={i}>
                        <motion.circle cx={b.satX} cy={b.satY} r={blobSize * 0.6} fill="white" />
                        <motion.circle cx={b.mainX} cy={b.mainY} r={blobSize * 0.8} fill="white" />
                        <motion.circle cx={b.mainX} cy={b.mainY} r={blobSize * 0.45} fill="white" />
                      </Fragment>
                    ))}
                    <motion.circle cx={satX} cy={satY} r={blobSize * 0.6} fill="white" />
                    <motion.circle cx={head.x} cy={head.y} r={blobSize * 0.8} fill="white" />
                    <motion.circle cx={body1.x} cy={body1.y} r={blobSize * 0.6} fill="white" />
                    <motion.circle cx={body2.x} cy={body2.y} r={blobSize * 0.45} fill="white" />
                  </motion.g>
                </g>
              </mask>
            </defs>
          </svg>
        )}

        <motion.div style={{ ...baseLayer, x: reduced ? 0 : baseX, y: reduced ? 0 : baseY }}>
          {nameBase}
        </motion.div>

        {!reduced && (
          <motion.div
            style={{
              ...baseLayer,
              x: revealX,
              y: revealY,
              mask: `url(#${maskId})`,
              WebkitMask: `url(#${maskId})`,
              pointerEvents: 'none',
            }}
          >
            {nameReveal}
          </motion.div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-mono text-sm font-medium tracking-tight text-default md:text-base"
          >
            {profile.roles.join(' · ')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-3 max-w-[60ch] text-sm leading-relaxed text-white/60"
          >
            {profile.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#intro"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default"
            >
              View Work
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default"
            >
              Contact
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
