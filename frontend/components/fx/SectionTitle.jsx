// Shared scroll-reveal primitives — verbatim ports of the reference motion
// language. Title rise: y:80/autoAlpha, 1s, power3.out, stagger 0.15.
// Highlight wipe: scaleX 0→1 (0.6, power3.out) → 0 origin-right (0.6,
// power3.in, delay 0.15), trigger parent top 90%, restart on re-enter.
import { gsap, useGSAP } from '@/lib/gsap'

export function useTitleRise(selector, trigger, start = 'top 85%') {
  useGSAP(() => {
    gsap.fromTo(
      `${selector} > *`,
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

export function useHighlightWipe(selector, triggerStart = 'top 90%', inDuration = 0.6) {
  useGSAP(() => {
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

// Section heading: Bungee accent line over a giant overlapped title,
// matching the reference partners/calendar/ontrack heading composition.
// Props: accent (Bungee word), title (giant word), titleClass (root),
// accentClass, highlightClass (wipe span class registered via useHighlightWipe).
export function SectionHeading({ accent, title, titleClass, highlightClass }) {
  return (
    <div className="relative overflow-hidden">
      <h2
        className={`${titleClass} flex flex-col uppercase leading-none text-white relative z-10 font-sans`}
      >
        <strong className="font-bungee text-default">{accent}</strong>
        <span className="absolute font-bold">{title}</span>
      </h2>
      <span className={`${highlightClass} absolute inset-0 block bg-default z-10`} />
    </div>
  )
}
