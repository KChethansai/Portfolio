import { useRef } from 'react'
import clsx from 'clsx'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/performance'

export default function Header({ open, onToggle }) {
  const topLineRef = useRef(null)
  const bottomLineRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(() => {
    if (!topLineRef.current || !bottomLineRef.current) return
    const tl = gsap.timeline({ paused: true })
    tl.to(topLineRef.current, { y: 6, rotation: 45, duration: 0.35, ease: 'power2.out' }).to(
      bottomLineRef.current,
      { y: -6, rotation: -45, duration: 0.35, ease: 'power2.out' },
      '<',
    )
    if (open) {
      tl.play()
    } else {
      gsap.to(topLineRef.current, {
        y: 0,
        rotation: 0,
        duration: 0.35,
        ease: 'power2.out',
      })
      gsap.to(bottomLineRef.current, {
        y: 0,
        rotation: 0,
        duration: 0.35,
        ease: 'power2.out',
      })
    }
  }, [open])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })

  return (
    <header
      className={clsx(
        'px-6 top-0 left-0 w-full h-24 md:h-28 flex justify-between items-center bg-transparent z-[999] mix-blend-difference',
        open ? 'fixed' : 'absolute',
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        className="font-bungee text-xl tracking-tight leading-none text-white"
      >
        chethan©
      </button>
      <div className="flex items-center gap-x-2">
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={onToggle}
          className={clsx(
            'w-18 h-14 flex flex-col justify-center items-center gap-2',
            open ? 'bg-black' : 'bg-transparent',
          )}
        >
          <div ref={topLineRef} className="w-6 h-0.75 bg-white" />
          <div ref={bottomLineRef} className="w-6 h-0.75 bg-white" />
        </button>
      </div>
    </header>
  )
}
