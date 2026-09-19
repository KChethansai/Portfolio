import { useEffect, useId, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'
import { profile } from '@/lib/data'
import { useDeviceCapability, useReducedMotion } from '@/lib/performance'
import { attachPointer, pointerX, pointerY } from '@/lib/pointer'
import MagneticButton from './effects/MagneticButton'
import Scene3D from './effects/Scene3D'

const HEAD_R = 112
const BODY1_R = 84
const BODY2_R = 63

export default function HeroSection() {
  const reduced = useReducedMotion()
  const tier = useDeviceCapability()
  // Goo is the most expensive hero effect (fullscreen SVG filter re-rastered
  // per frame) — off under reduced motion and on low-tier devices, same gate
  // as Scene3D. Static h1 covers both cases.
  const gooOn = !reduced && tier !== 'low'
  const sectionRef = useRef(null)
  const maskId = `hero-mask-${useId().replace(/:/g, '')}`
  const filterId = `hero-goo-${useId().replace(/:/g, '')}`

  useEffect(() => attachPointer(), [])

  const [size, setSize] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const sx = useSpring(pointerX, { stiffness: 120, damping: 22 })
  const sy = useSpring(pointerY, { stiffness: 120, damping: 22 })
  const revealX = useTransform(sx, [-1, 1], [3, -3])
  const revealY = useTransform(sy, [-1, 1], [3, -3])

  const cursorX = useTransform(sx, [-1, 1], [0, size.w])
  const cursorY = useTransform(sy, [-1, 1], [0, size.h])
  const headX = useSpring(cursorX, { stiffness: 250, damping: 30 })
  const headY = useSpring(cursorY, { stiffness: 250, damping: 30 })
  const body1X = useSpring(cursorX, { stiffness: 220, damping: 34 })
  const body1Y = useSpring(cursorY, { stiffness: 220, damping: 34 })
  const body2X = useSpring(cursorX, { stiffness: 190, damping: 38 })
  const body2Y = useSpring(cursorY, { stiffness: 190, damping: 38 })

  const words = profile.name.split(' ')
  const nameSize = 'text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.9]'

  return (
    <section ref={sectionRef} className="relative flex min-h-dvh flex-col overflow-hidden bg-black">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(60% 40% at 50% 0%, rgba(210,255,0,0.06), transparent 70%)' }}
        />
        <Scene3D targetRef={sectionRef} />
        {/* Text-shade: guarantees name/meta contrast whatever pose the 3D object holds. */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(48% 42% at 50% 46%, rgba(0,0,0,0.55), transparent 70%)' }}
        />
        {gooOn && (
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <filter id={filterId}>
                <feGaussianBlur stdDeviation="8" result="blur" />
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
                  <motion.g style={{ x: headX, y: headY }}>
                    <circle r={HEAD_R} fill="white" />
                  </motion.g>
                  <motion.g style={{ x: body1X, y: body1Y }}>
                    <circle r={BODY1_R} fill="white" />
                  </motion.g>
                  <motion.g style={{ x: body2X, y: body2Y }}>
                    <circle r={BODY2_R} fill="white" />
                  </motion.g>
                </g>
              </mask>
            </defs>
          </svg>
        )}
      </div>

      <div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-16 text-center"
      >
        <div className="grid justify-items-center">
          <h1 className={`[grid-area:1/1] font-sans font-black text-white ${nameSize}`}>
            {words.map((w, i) => (
              <span key={i} className="block">
                {w}
              </span>
            ))}
          </h1>
          {gooOn && (
            <motion.div
              aria-hidden="true"
              style={{
                x: revealX,
                y: revealY,
                mask: `url(#${maskId})`,
                WebkitMask: `url(#${maskId})`,
                WebkitTextStroke: '2px #d2ff00',
              }}
              className={`[grid-area:1/1] font-bungee text-transparent ${nameSize}`}
            >
              {words.map((w, i) => (
                <span key={i} className="block">
                  {w}
                </span>
              ))}
            </motion.div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-sm font-semibold uppercase tracking-wide text-default md:text-base"
          >
            {profile.roles.join(' · ')}
          </motion.p>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-4 max-w-[60ch] text-sm leading-relaxed text-white/60 md:text-base"
          >
            {profile.tagline}
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <MagneticButton
              href="#intro"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default"
            >
              View Work
            </MagneticButton>
            <MagneticButton
              href={`mailto:${profile.email}`}
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default"
            >
              Contact
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
