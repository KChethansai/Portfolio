// Single-use scroll entrance. Opacity + small Y only — never scale, never
// lime-wipe body copy. Fires once per element.
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/performance'

export default function ScrollReveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  y = 28,
  children,
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(() => {
    if (reduced || !ref.current) return
    gsap.fromTo(
      ref.current,
      { y, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      },
    )
  }, [reduced])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
