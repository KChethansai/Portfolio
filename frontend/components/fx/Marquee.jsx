// Infinite scroll-direction marquee: gsap.ticker at 0.4px/tick, direction
// flips with scroll direction, wraps on ±contentWidth. Two identical
// children required for the seamless loop. Width re-measured on resize and
// font load; static fallback under reduced motion. Scoped cleanup only.
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/performance'

export default function Marquee({ children, className = '', rowClassName = '' }) {
  const marqueeRef = useRef(null)
  const contentRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !marqueeRef.current || !contentRef.current) return
    const marquee = marqueeRef.current
    const content = contentRef.current
    let direction = 1
    const speed = 0.22
    let x = 0
    let contentWidth = content.offsetWidth
    const measure = () => {
      contentWidth = content.offsetWidth
    }
    gsap.set(marquee, { x: 0 })
    const tick = () => {
      x += speed * direction
      if (x <= -contentWidth) x += contentWidth
      if (x >= 0) x -= contentWidth
      gsap.set(marquee, { x })
    }
    gsap.ticker.add(tick)
    const st = ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        direction = self.direction === 1 ? 1 : -1
      },
    })
    window.addEventListener('resize', measure)
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {})
    return () => {
      gsap.ticker.remove(tick)
      st.kill()
      window.removeEventListener('resize', measure)
    }
  }, [reduced])

  if (reduced) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <div className={`flex flex-wrap items-center gap-x-8 gap-y-4 ${rowClassName}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div ref={marqueeRef} className="flex w-max">
        <div ref={contentRef} className={rowClassName}>
          {children}
        </div>
        <div className={rowClassName} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
