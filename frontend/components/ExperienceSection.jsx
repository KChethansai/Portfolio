import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SectionHeading } from './fx/SectionTitle'
import { useTitleRise, useHighlightWipe } from './fx/reveal'
import ScrollReveal from './effects/ScrollReveal'
import { experience } from '@/lib/data'
import { useReducedMotion } from '@/lib/performance'

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function ExperienceSection() {
  const listRef = useRef(null)
  const fillRef = useRef(null)
  const reduced = useReducedMotion()
  useTitleRise('.experience-title', '.experience-title', 'top 100%')
  useHighlightWipe('.experience-highlight', 'top 90%', 0.7)

  useGSAP(() => {
    if (reduced || !listRef.current || !fillRef.current) return
    gsap.fromTo(
      fillRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: true,
        },
      },
    )
  }, [reduced])

  return (
    <section id="experience" className="relative w-full overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-32 pb-16 md:pb-24">
        <SectionHeading
          accent="Work"
          title="Experience"
          titleClass="experience-title"
          highlightClass="experience-highlight"
        />
        <div ref={listRef} className="relative mt-12 md:mt-16">
          <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-white/10">
            {!reduced && <div ref={fillRef} className="h-full w-full bg-default" />}
          </div>
          {experience.slice(0, 2).map((job) => (
            <ScrollReveal
              as="article"
              key={job.company}
              className="relative pl-8 md:pl-12 pb-16 md:pb-20 last:pb-0"
            >
              <span aria-hidden className="pointer-events-none absolute left-0 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-default" />
              <div className="flex items-center gap-4">
                <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/20 font-bungee text-sm text-default">
                  {initials(job.company)}
                </span>
                <p className="font-bungee text-base uppercase text-default md:text-xl">{job.company}</p>
              </div>
              <h3 className="mt-4 font-sans font-bold uppercase tracking-tighter leading-tight text-[clamp(1.75rem,4vw,3.5rem)]">
                {job.title}
              </h3>
              <p className="mt-2 text-sm uppercase text-white/50">{job.year}</p>
              <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-white/70">
                {job.summary}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
