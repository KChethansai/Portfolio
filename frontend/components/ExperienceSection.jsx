import { Reveal, SectionHeading } from './motion/primitives'
import { experience } from '@/lib/data'

export default function ExperienceSection() {
  return (
    <section id='experience' className='relative scroll-mt-24 py-16 md:py-28 section-tint-1'>
      <div className='mx-auto max-w-[1400px] px-6'>
        <SectionHeading index='02' kicker='Experience' title={<>Learn by doing.</>} />

        <div className='relative'>
          {/* Vertical editorial line */}
          <div className='absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]' />

          <div className='flex flex-col gap-12'>
            {experience.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className='relative pl-8'>
                  {/* Timeline dot */}
                  <div className='absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-[var(--color-accent)]/50 bg-[var(--color-void)] shadow-[0_0_8px_rgba(34,211,238,0.15)]' />

                  <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]'>
                    {item.year}
                  </p>

                  <h3 className='mt-2 text-xl font-bold tracking-tight text-white md:text-2xl'>
                    {item.title}
                  </h3>

                  <p className='mt-1 text-sm text-[var(--color-ink-muted)]'>
                    {item.company}
                  </p>

                  <p className='mt-4 max-w-2xl text-[0.95rem] leading-[1.7] text-[var(--color-ink-body)]'>
                    {item.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className='editorial-rule mx-auto mt-20 max-w-[1400px]' />
    </section>
  )
}
