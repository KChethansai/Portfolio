import { SectionHeading, useTitleRise, useHighlightWipe } from './fx/SectionTitle'
import { experience } from '@/lib/data'

export default function ExperienceSection() {
  useTitleRise('.experience-title', '.experience-title', 'top 100%')
  useHighlightWipe('.experience-highlight', 'top 90%', 0.7)

  return (
    <section id="experience" className="relative w-full bg-black px-5 pb-10 pt-24 text-white">
      <SectionHeading
        accent="Work"
        title="Experience"
        titleClass="experience-title text-[3.6em] md:text-[8em] lg:text-[10.8em]"
        highlightClass="experience-highlight"
      />
      <div className="flex flex-col gap-16 pt-10 md:gap-24">
        {experience.slice(0, 2).map((job) => (
          <article key={job.company}>
            <div className="relative w-fit overflow-hidden">
              <p className="font-bungee text-lg md:text-3xl uppercase text-default">{job.company}</p>
              <span className="experience-highlight absolute inset-0 block bg-default" />
            </div>
            <div className="relative mt-4 w-fit overflow-hidden">
              <h3 className="font-sans text-4xl md:text-7xl font-bold uppercase tracking-tighter">{job.title}</h3>
              <span className="experience-highlight absolute inset-0 block bg-default" />
            </div>
            <div className="relative mt-3 w-fit overflow-hidden">
              <p className="font-sans text-sm md:text-base font-semibold uppercase tracking-tighter">{job.year}</p>
              <span className="experience-highlight absolute inset-0 block bg-default" />
            </div>
            <div className="relative mt-6 overflow-hidden">
              <p className="font-sans text-lg md:text-2xl lg:max-w-3xl">{job.summary}</p>
              <span className="experience-highlight absolute inset-0 block bg-default" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
