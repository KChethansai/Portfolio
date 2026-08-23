import React, { useEffect, useState } from 'react'
import { Home as HomeIcon, User, Briefcase, TerminalSquare, Mail } from 'lucide-react'
// Magic UI — Dock
import { Dock, DockIcon } from './magicui/dock'

function Navbar() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])

  const scrollTo = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const items = [
    { id: 'top', label: 'Home', icon: HomeIcon },
    { id: 'intro', label: 'Intro', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: TerminalSquare },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  return (
    <div className='pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 md:top-6 md:bottom-auto'>
      <Dock
        className='pointer-events-auto border-white/12 bg-black/40 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)]'
        iconSize={42}
        iconMagnification={reduced ? 42 : 58}
        disableMagnification={reduced}
        direction='middle'
      >
        {items.map(({ id, label, icon: Icon }) => (
          <DockIcon key={id} className='bg-white/5'>
            <button
              type='button'
              onClick={() => scrollTo(id)}
              aria-label={label}
              className='flex h-full w-full items-center justify-center text-white/80 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
            >
              <Icon className='size-5' aria-hidden />
            </button>
          </DockIcon>
        ))}
      </Dock>
    </div>
  )
}

export default Navbar
