import React, { useEffect, useState } from 'react'
// Magic UI — Meteors
import { Meteors } from './magicui/meteors'

function SiteFooter() {
  const [showMeteors, setShowMeteors] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setShowMeteors(!reduce)
  }, [])

  return (
    <footer className='relative overflow-hidden border-t border-white/10 bg-[var(--bg-void)] px-6 py-16'>
      {showMeteors ? (
        <div className='pointer-events-none absolute inset-0 opacity-40'>
          <Meteors number={12} />
        </div>
      ) : null}

      <div className='relative z-10 mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='text-sm font-semibold text-white'>Chethan Sai Kakunuri</p>
          <p className='mt-2 max-w-md text-sm text-white/55'>
            Computer Science (Data Science) student with hands-on experience building full-stack MERN applications and ML-powered tools.
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-4 text-sm text-white/70'>
          <a
            href='mailto:kakunurichethansai@gmail.com'
            className='transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
          >
            kakunurichethansai@gmail.com
          </a>
          <a
            href='https://github.com/KChethansai'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
          >
            GitHub
          </a>
          <a
            href='https://www.linkedin.com/in/kakunuri-chethan-sai-130a503b5'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
          >
            LinkedIn
          </a>
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60'
          >
            Resume
          </a>
        </div>
      </div>

      <p className='relative z-10 mx-auto mt-10 max-w-6xl text-[10px] font-semibold uppercase tracking-widest text-white/40'>
        © 2026 Chethan Sai Kakunuri
      </p>
    </footer>
  )
}

export default SiteFooter
