// Shared scroll-reveal primitives. Geometry rule: everything animated here
// is IN-FLOW. Title lines are masked per-line (overflow-hidden wrappers);
// the lime wipe is reserved for small labels only, never body copy or the
// giant title itself.
import { gsap, useGSAP } from '@/lib/gsap'

// Reduced-motion: skip scroll choreography, set final states instantly.
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Animates `.rise-line > span` children from y:80/autoAlpha.
export function useTitleRise(selector, trigger, start = 'top 85%') {
  useGSAP(() => {
    if (prefersReduced()) {
      gsap.set(`${selector} .rise-line > span`, { y: 0, autoAlpha: 1 })
      return
    }
    gsap.fromTo(
      `${selector} .rise-line > span`,
      { y: 80, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger, start, toggleActions: 'restart none restart none' },
      },
    )
  }, [])
}

// Lime wipe for SMALL labels only. Target must be an in-flow element inside
// a `relative w-fit overflow-hidden` wrapper — the wipe never escapes it.
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
            toggleActions: 'restart none restart none',
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
