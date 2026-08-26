import React, { lazy, Suspense, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import TextType from './TextType'
import Navbar from './Navbar'
import ScrollIndicator from './ScrollIndicator'
import { SplineScene } from './ui/splite'

const IntroSection = lazy(() => import('./IntroSection'))
const ExperienceSection = lazy(() => import('./ExperienceSection'))
const ProjectsSection = lazy(() => import('./ProjectsSection'))
const SkillsSection = lazy(() => import('./SkillsSection'))
const TerminalSection = lazy(() => import('./TerminalSection'))
const SiteFooter = lazy(() => import('./SiteFooter'))

// Aceternity — Tracing Beam (lazy)
const TracingBeam = lazy(() =>
  import('./aceternity/tracing-beam').then((m) => ({ default: m.TracingBeam }))
)

// React Bits — Galaxy (perf-tuned: half-res, 30fps cap)
import { GalaxyBackground } from './reactbits/GalaxyBackground'

// Magic UI — Icon Cloud (lazy)
const IconCloud = lazy(() =>
  import('./magicui/icon-cloud.jsx').then((m) => ({ default: m.IconCloud }))
)

const STACK_SLUGS = [
  'react',
  'javascript',
  'nodedotjs',
  'express',
  'mongodb',
  'python',
  'fastapi',
  'mysql',
  'googlecloud',
  'supabase',
  'git',
  'github',
  'tailwindcss',
  'linux',
]

function Home() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { margin: '200px' })

  const scrollToIntro = (e) => {
    e.preventDefault()
    const section = document.getElementById('intro')
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='relative flex min-h-screen flex-col bg-[var(--bg-void)] text-white'>
      <Navbar />

      {/* Hero — asymmetric split */}
      <section
        ref={heroRef}
        className='relative flex min-h-screen flex-col overflow-hidden px-6 pb-16 pt-28 md:pt-32 [transform:translateZ(0)] [will-change:transform]'
      >
        {/* Galaxy backdrop — perf-tuned (half-res render, 30fps cap, paused off-screen) */}
        {isHeroInView ? (
          <div className='pointer-events-none absolute inset-0 z-0 opacity-70 [transform:translateZ(0)]'>
            <GalaxyBackground className='h-full w-full' />
          </div>
        ) : null}
        <div className='pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[var(--bg-void)] via-[var(--bg-void)]/80 to-transparent md:via-[var(--bg-void)]/55' />

        <div className='relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-12'>
          {/* Left text column ~55–60% */}
          <div className='flex flex-col items-start text-left lg:col-span-7 [transform:translateZ(0)]'>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className='mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80 [will-change:transform]'
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl [will-change:transform]'
            >
              Chethan Sai Kakunuri
            </motion.h1>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className='mt-5 [will-change:transform]'
            >
              <TextType
                text={['Full Stack Developer', 'Data Science Student']}
                typingSpeed={75}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter='|'
                loop={true}
                as='span'
                className='text-lg font-semibold text-cyan-300 md:text-2xl'
              />
            </motion.div>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              className='mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg [will-change:transform]'
            >
              Computer Science (Data Science) student at{' '}
              <span className='font-medium text-white'>Anurag University, Hyderabad</span>{' '}
              with hands-on experience building full-stack MERN applications and ML-powered tools.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              className='mt-8 flex flex-wrap items-center justify-start gap-3 [will-change:transform]'
            >
              <button
                onClick={scrollToIntro}
                className='rounded-[var(--radius-sm)] bg-white px-6 py-3 font-semibold text-black transition-colors duration-300 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
              >
                Explore My Work
              </button>
              <a
                href='mailto:kakunurichethansai@gmail.com'
                className='rounded-[var(--radius-sm)] border border-white/25 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-violet-400 hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60'
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Right focal — interactive 3D robot over the tech-stack cloud */}
          <div className='relative flex min-h-[250px] flex-col items-center justify-center gap-3 lg:col-span-5 lg:min-h-[560px]'>
            <div className='absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_60%)]' />
            {isHeroInView ? (
              <>
                <div className='relative z-10 h-[300px] w-full max-w-sm md:h-[360px] lg:h-[400px] lg:max-w-md'>
                  <SplineScene
                    scene='https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
                    className='h-full w-full'
                  />
                </div>
                <div className='relative z-10 h-px w-40 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent' />
                <div className='relative z-10 h-36 w-full max-w-xs opacity-90 md:h-40 lg:h-44'>
                  <Suspense fallback={null}>
                    <IconCloud iconSlugs={STACK_SLUGS} />
                  </Suspense>
                </div>
              </>
            ) : (
              <div className='h-64 w-64 animate-pulse rounded-full bg-white/5' aria-hidden />
            )}
          </div>
        </div>

        <div className='relative z-10'>
          <ScrollIndicator />
        </div>
      </section>

      {/* Aceternity — Tracing Beam wraps narrative sections */}
      <NarrativeBody />

      <div id='contact'>
        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
      </div>
    </div>
  )
}

function NarrativeBody() {
  const prefersReducedMotion = useReducedMotion()

  // NOTE: don't memoize/reuse these elements in two positions (fallback +
  // children) — mounting the same Suspense tree twice deadlocks resolution.
  const sections = (
    <>
      <IntroSection />
      <ExperienceSection />
      <ProjectsSection />
        <SkillsSection />
        <TerminalSection />
    </>
  )

  if (prefersReducedMotion) {
    return <div className='relative z-10'>{sections}</div>
  }

  return (
    <div className='relative z-10'>
      <Suspense fallback={null}>
        <TracingBeam className='px-2 md:px-6'>{sections}</TracingBeam>
      </Suspense>
    </div>
  )
}

export default Home
