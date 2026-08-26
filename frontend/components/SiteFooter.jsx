import React, { useEffect, useState } from 'react'
import { Mail, FileText, ArrowUp, ArrowUpRight } from 'lucide-react'
// Magic UI — Meteors
import { Meteors } from './magicui/meteors'

function GithubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
      <path fillRule='evenodd' clipRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
    </svg>
  )
}

function LinkedinIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
    </svg>
  )
}

function SiteFooter() {
  const [showMeteors, setShowMeteors] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setShowMeteors(!reduce)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='relative overflow-hidden border-t border-white/10 bg-[var(--bg-void)] px-6 py-16 md:py-20'>
      {/* Top glowing gradient line */}
      <div className='pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent' />
      <div className='pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-24 w-72 -translate-y-12 bg-cyan-500/10 blur-2xl rounded-full' />

      {showMeteors ? (
        <div className='pointer-events-none absolute inset-0 opacity-30'>
          <Meteors number={12} />
        </div>
      ) : null}

      <div className='relative z-10 mx-auto max-w-6xl'>
        <div className='flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between'>
          <div className='max-w-md'>
            <div className='inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
              </span>
              Available for new opportunities
            </div>

            <h3 className='mt-4 text-xl font-bold tracking-tight text-white md:text-2xl'>
              Chethan Sai Kakunuri
            </h3>
            <p className='mt-2 text-sm leading-relaxed text-white/60'>
              Computer Science (Data Science) student at Anurag University with hands-on experience building full-stack MERN applications and ML-powered tools.
            </p>
          </div>

          {/* Action Links */}
          <div className='flex flex-wrap items-center gap-3'>
            <a
              href='mailto:kakunurichethansai@gmail.com'
              className='group inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white/80 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
            >
              <Mail className='h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110' />
              <span>Email</span>
              <ArrowUpRight className='h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100' />
            </a>

            <a
              href='https://github.com/KChethansai'
              target='_blank'
              rel='noopener noreferrer'
              className='group inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white/80 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
            >
              <GithubIcon className='h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110' />
              <span>GitHub</span>
              <ArrowUpRight className='h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100' />
            </a>

            <a
              href='https://www.linkedin.com/in/kakunuri-chethan-sai-130a503b5'
              target='_blank'
              rel='noopener noreferrer'
              className='group inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white/80 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
            >
              <LinkedinIcon className='h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110' />
              <span>LinkedIn</span>
              <ArrowUpRight className='h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100' />
            </a>

            <a
              href='/resume.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='group inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-xs font-medium text-violet-200 transition-all duration-300 hover:border-violet-400 hover:bg-violet-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60'
            >
              <FileText className='h-4 w-4 text-violet-400 transition-transform group-hover:scale-110' />
              <span>Resume</span>
              <ArrowUpRight className='h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100' />
            </a>
          </div>
        </div>

        <div className='my-10 h-px w-full bg-white/10' />

        <div className='flex flex-col items-center justify-between gap-4 text-xs text-white/40 sm:flex-row'>
          <p>© 2026 Chethan Sai Kakunuri. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className='group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/60 transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
          >
            <span>Back to top</span>
            <ArrowUp className='h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5' />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
