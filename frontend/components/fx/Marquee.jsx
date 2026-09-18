// Infinite scroll-direction marquee — verbatim port of the reference
// partners/footer ticker: gsap.ticker at 0.4px/tick, direction flips with
// scroll direction, wraps on ±contentWidth. Two identical children required
// for the seamless loop. Scoped ScrollTrigger cleanup (never killAll).
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Marquee({ children, className = '', rowClassName = '' }) {
  const marqueeRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!marqueeRef.current || !contentRef.current) return
    const marquee = marqueeRef.current
    const content = contentRef.current
    let direction = 1
    const speed = 0.4
    let x = 0
    const contentWidth = content.offsetWidth
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
    return () => {
      gsap.ticker.remove(tick)
      st.kill()
    }
  }, [])

  return (
    <div className={`relative overflow-hidden w-full ${className}`}>
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
