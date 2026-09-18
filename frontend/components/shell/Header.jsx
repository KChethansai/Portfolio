import { useRef } from 'react'
import clsx from 'clsx'
import { gsap, useGSAP } from '@/lib/gsap'

export default function Header({ open, onToggle }) {
  const topLineRef = useRef(null)
  const bottomLineRef = useRef(null)

  useGSAP(() => {
    if (!topLineRef.current || !bottomLineRef.current) return
    const tl = gsap.timeline({ paused: true })
    tl.to(topLineRef.current, { y: 6, rotation: 45, duration: 0.35, ease: 'power2.out' }).to(
      bottomLineRef.current,
      { y: -6, rotation: -45, duration: 0.35, ease: 'power2.out' },
      '<',
    )
    tl.to([topLineRef.current, bottomLineRef.current], { backgroundColor: '#fff', duration: 0.2 }, '<')
    if (open) {
      tl.play()
    } else {
      gsap.to(topLineRef.current, {
        y: 0,
        rotation: 0,
        backgroundColor: '#000',
        duration: 0.35,
        ease: 'power2.out',
      })
      gsap.to(bottomLineRef.current, {
        y: 0,
        rotation: 0,
        backgroundColor: '#000',
        duration: 0.35,
        ease: 'power2.out',
      })
    }
  }, [open])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <header
      className={clsx(
        'px-6 top-0 left-0 w-full h-30 flex justify-between items-center bg-transparent z-[999]',
        open ? 'fixed' : 'absolute',
      )}
    >
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        className={clsx(
          'font-bungee text-xl tracking-tight leading-none',
          open ? 'text-white' : 'text-black',
        )}
      >
        chethan©
      </button>
      <div className="flex items-center gap-x-2">
        <button
          type="button"
          aria-label="menu"
          aria-expanded={open}
          onClick={onToggle}
          className={clsx(
            'w-18 h-14 flex flex-col justify-center items-center gap-2',
            open ? 'bg-black' : 'bg-transparent',
          )}
        >
          <div ref={topLineRef} className="w-6 h-0.75 bg-black" />
          <div ref={bottomLineRef} className="w-6 h-0.75 bg-black" />
        </button>
      </div>
    </header>
  )
}
