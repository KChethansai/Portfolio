import React, { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import TextType from './TextType'
import Navbar from './Navbar'
import ScrollIndicator from './ScrollIndicator'
import IntroSection from './IntroSection'
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'
import SkillsSection from './SkillsSection'
import TerminalSection from './TerminalSection'
import SiteFooter from './SiteFooter'
// React Bits — Galaxy
import { GalaxyBackground } from './reactbits/GalaxyBackground'

// Magic UI — Icon Cloud (lazy)
const IconCloud = lazy(() =>
  import('./magicui/icon-cloud.jsx').then((m) => ({ default: m.IconCloud }))
)
// Magic UI — Smooth Cursor
const SmoothCursor = lazy(() =>
  import('./magicui/smooth-cursor').then((m) => ({ default: m.SmoothCursor }))
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
  'gitlab',
  'linux',
  'cplusplus',
  'c',
  'java',
  'tailwindcss',
  'postman',
  'godot',
]

function Home() {
  const prefersReducedMotion = useReducedMotion()
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setShowCursor(fine && !reduce)
  }, [])

  const scrollToIntro = (e) => {
    e.preventDefault()
    const section = document.getElementById('intro')
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='relative flex min-h-screen flex-col bg-[var(--bg-void)] text-white'>
      {showCursor ? (
        <Suspense fallback={null}>
          <SmoothCursor />
        </Suspense>
      ) : null}

      <Navbar />

      {/* Hero — asymmetric split */}
      <section className='relative flex min-h-screen flex-col overflow-hidden px-6 pb-16 pt-28 md:pt-32'>
        <div className='pointer-events-none absolute inset-0 z-0 opacity-70'>
          <GalaxyBackground className='h-full w-full' density={0.65} />
        </div>
        <div className='pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[var(--bg-void)] via-[var(--bg-void)]/80 to-transparent md:via-[var(--bg-void)]/55' />

        <div className='relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-12'>
          {/* Left text column ~55–60% */}
          <div className='flex flex-col items-start text-left lg:col-span-7'>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className='mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80'
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
            >
              Chethan Sai Kakunuri
            </motion.h1>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className='mt-5'
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
              className='mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg'
            >
              Computer Science (Data Science) student at{' '}
              <span className='font-medium text-white'>Anurag University, Hyderabad</span>{' '}
              with hands-on experience building full-stack MERN applications and ML-powered tools.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              className='mt-8 flex flex-wrap items-center justify-start gap-3'
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

          {/* Right focal Icon Cloud */}
          <div className='relative flex min-h-[320px] items-center justify-center lg:col-span-5 lg:min-h-[520px]'>
            <div className='absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_60%)]' />
            <Suspense
              fallback={
                <div className='h-64 w-64 animate-pulse rounded-full bg-white/5' aria-hidden />
              }
            >
              <div className='relative z-10 h-[300px] w-full max-w-md md:h-[420px]'>
                <IconCloud iconSlugs={STACK_SLUGS} />
              </div>
            </Suspense>
          </div>
        </div>

        <div className='relative z-10'>
          <ScrollIndicator />
        </div>
      </section>

      {/* Aceternity — Tracing Beam wraps narrative sections */}
      <NarrativeBody />

      <div id='contact'>
        <SiteFooter />
      </div>
    </div>
  )
}

function NarrativeBody() {
  const [Beam, setBeam] = useState(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduce(reduced)
    if (reduced) return
    import('./aceternity/tracing-beam').then((m) => setBeam(() => m.TracingBeam))
  }, [])

  const content = (
    <>
      <IntroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <TerminalSection />
    </>
  )

  if (!Beam || reduce) {
    return <div className='relative z-10'>{content}</div>
  }

  return (
    <div className='relative z-10'>
      <Beam className='px-2 md:px-6'>{content}</Beam>
    </div>
  )
}

export default Home
