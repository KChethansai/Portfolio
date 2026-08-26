import { lazy, Suspense, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import TextType from './TextType'
import Navbar from './Navbar'
import ScrollIndicator from './ScrollIndicator'
import { Magnetic } from './motion/primitives'
import { profile } from '@/lib/data'
import { ease, duration } from '@/lib/motion'
import { useReducedMotion } from '@/lib/performance'
import { world } from './world/WorldState'

const IntroSection = lazy(() => import('./IntroSection'))
const ExperienceSection = lazy(() => import('./ExperienceSection'))
const ProjectsSection = lazy(() => import('./ProjectsSection'))
const SkillsSection = lazy(() => import('./SkillsSection'))
const TerminalSection = lazy(() => import('./TerminalSection'))
const SiteFooter = lazy(() => import('./SiteFooter'))

const TracingBeam = lazy(() =>
  import('./aceternity/tracing-beam').then((m) => ({ default: m.TracingBeam }))
)

const rise = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.slow, ease: ease.out, delay },
})

export default function Home() {
  const reduced = useReducedMotion()

  const scrollToIntro = (e) => {
    e.preventDefault()
    document.getElementById('intro')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div className='relative z-10 flex min-h-screen flex-col'>
      <Navbar />
      <HoverTooltip />

      {/* Hero — editorial composition. Text dominates; robot is the visual anchor
          in the right half of the fixed world canvas behind. */}
      <section className='relative grid min-h-screen w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-6 pb-20 pt-32 md:pt-36 lg:grid-cols-12 lg:gap-4'>
        <div className='flex flex-col items-start text-left lg:col-span-7'>
          <motion.p
            {...rise(0.05)}
            className='section-label mb-6'
          >
            Portfolio — 2026
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className='text-[clamp(2.8rem,7.5vw,5.8rem)] font-black leading-[0.92] tracking-[-0.03em] text-white'
          >
            {profile.name.split(' ').map((word, i) => (
              <span key={i} className='block'>
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.div {...rise(0.28)} className='mt-6 h-8'>
            <TextType
              text={profile.roles}
              typingSpeed={65}
              pauseDuration={2400}
              showCursor
              cursorCharacter='|'
              className='font-mono text-sm font-medium tracking-tight text-[var(--color-accent)] md:text-lg'
            />
          </motion.div>

          <motion.p
            {...rise(0.4)}
            className='mt-7 max-w-[52ch] text-[0.95rem] leading-[1.7] text-[var(--color-ink-secondary)]'
          >
            {profile.tagline.split('Anurag University, Hyderabad')[0]}
            <span className='font-medium text-[var(--color-ink)]'>Anurag University, Hyderabad</span>
            {profile.tagline.split('Anurag University, Hyderabad')[1]}
          </motion.p>

          <motion.div {...rise(0.52)} className='mt-10 flex flex-wrap items-center gap-4'>
            <Magnetic>
              <button
                onClick={scrollToIntro}
                className='rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/50'
              >
                View Work
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className='rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/50'
              >
                Contact
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right column — intentionally empty. The robot lives in the world canvas
            behind and is framed by this negative space. */}
        <div className='pointer-events-none relative hidden lg:col-span-5 lg:block' aria-hidden />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className='absolute bottom-8 left-1/2 -translate-x-1/2'
        >
          <ScrollIndicator />
        </motion.div>
      </section>

      <NarrativeBody reduced={reduced} />

      <div id='contact'>
        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
      </div>
    </div>
  )
}

// DOM-side tooltip for 3D hover state — zero React renders.
function HoverTooltip() {
  const ref = useRef(null)
  useEffect(() => {
    let raf
    const tick = () => {
      const el = ref.current
      if (el) {
        const show = world.hoverLabel != null
        el.style.opacity = show ? '1' : '0'
        el.style.transform = `translate(${world.hoverX}px, ${world.hoverY}px) translate(-50%,-100%)`
        el.textContent = show ? world.hoverLabel : ''
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className='pointer-events-none fixed left-0 top-0 z-40 -translate-x-1/2 -translate-y-full rounded-md border border-white/10 bg-black/80 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm whitespace-nowrap'
      style={{ willChange: 'transform, opacity', opacity: 0 }}
    />
  )
}

function NarrativeBody({ reduced }) {
  const sections = (
    <>
      <IntroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <TerminalSection />
    </>
  )

  if (reduced) return <div>{sections}</div>

  return (
    <Suspense fallback={null}>
      <TracingBeam className='px-2 md:px-6'>{sections}</TracingBeam>
    </Suspense>
  )
}
