import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/lib/performance'

const ITEMS = [
  { id: 'top', label: 'Home' },
  { id: 'intro', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState('top')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const mid = window.innerHeight / 2
      let best = 'top'
      let bestDist = Infinity
      for (const { id } of ITEMS) {
        const el = id === 'top' ? document.body : document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const dist =
          id === 'top' ? Math.abs(rect.top) : Math.abs(rect.top + rect.height / 2 - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = id
        }
      }
      setActive(best)
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-[#050608]/80 backdrop-blur-md border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <nav className='mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:py-5'>
        <button
          onClick={() => scrollTo('top')}
          className='text-sm font-bold tracking-tight text-white hover:text-[var(--color-accent)] transition-colors duration-200'
        >
          chethan
        </button>

        {/* Desktop nav */}
        <ul className='hidden items-center gap-8 md:flex'>
          {ITEMS.filter((i) => i.id !== 'top').map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`text-[13px] font-medium transition-colors duration-200 ${
                  active === id
                    ? 'text-white'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink-secondary)]'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile nav — horizontal scroll */}
        <ul className='flex items-center gap-5 overflow-x-auto md:hidden scrollbar-none'>
          {ITEMS.filter((i) => i.id !== 'top').map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`whitespace-nowrap text-[12px] font-medium transition-colors duration-200 ${
                  active === id
                    ? 'text-white'
                    : 'text-[var(--color-ink-muted)]'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href='mailto:kakunurichethansai@gmail.com'
          className='hidden text-[13px] font-medium text-[var(--color-ink-muted)] hover:text-white transition-colors duration-200 sm:block'
        >
          Say hello
        </a>
      </nav>
    </header>
  )
}

export default Navbar
