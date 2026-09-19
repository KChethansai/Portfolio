// Shared scroll-reveal primitives. Everything animated here is IN-FLOW.
// The lime wipe is reserved for two small labels only (Projects, Skills) —
// never body copy, never giant titles. All triggers fire once.
import { gsap, useGSAP } from '@/lib/gsap'

// Reduced-motion: skip scroll choreography, set final states instantly.
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Lime wipe for SMALL labels only. Fires once — never re-triggers on
// re-enter. Target must be an in-flow element inside a
// `relative w-fit overflow-hidden` wrapper.
export function useHighlightWipe(selector, triggerStart = 'top 90%', inDuration = 0.6) {
  useGSAP(() => {
    if (prefersReduced()) {
      gsap.set(selector, { scaleX: 0 })
      return
    }
    gsap.utils.toArray(selector).forEach((highlight) => {
      gsap.set(highlight, { scaleX: 0, transformOrigin: 'left center' })
      gsap
        .timeline({
          scrollTrigger: {
            trigger: highlight.parentElement,
            start: triggerStart,
            toggleActions: 'play none none none',
          },
        })
        .to(highlight, { scaleX: 1, duration: inDuration, ease: 'power3.out' })
        .to(highlight, {
          scaleX: 0,
          transformOrigin: 'right center',
          duration: 0.6,
          ease: 'power3.in',
          delay: 0.15,
        })
    })
  }, [])
}
