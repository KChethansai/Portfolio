import { Reveal, SectionHeading } from './motion/primitives'
import { NumberTicker } from './magicui/number-ticker'
import { projects } from '@/lib/data'

function TechList({ tech }) {
  return (
    <ul className='mt-4 flex flex-wrap gap-2'>
      {tech.map((t) => (
        <li
          key={t}
          className='text-[11px] font-medium text-[var(--color-ink-muted)] after:content-["·"] after:ml-2 last:after:content-[""]'
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

function FlagshipProject({ item }) {
  return (
    <Reveal>
      <article className='group relative'>
        <div className='editorial-rule mb-8' />

        <div className='grid gap-8 lg:grid-cols-12'>
          <div className='lg:col-span-8'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]'>
              Featured Project
            </p>
            <h3 className='mt-3 text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-white leading-[1.1]'>
              {item.title}
            </h3>
            <p className='mt-2 text-sm text-[var(--color-ink-muted)]'>{item.year}</p>

            <p className='mt-5 max-w-2xl text-[0.9rem] leading-[1.7] text-[var(--color-ink-secondary)]'>
              {item.summary}
            </p>

            <TechList tech={item.tech} />
          </div>

          {item.metric && (
            <div className='flex items-start lg:col-span-4'>
              <div className='flex flex-col'>
                <span className='text-4xl font-bold tabular-nums text-white md:text-5xl'>
                  <NumberTicker value={item.metric.value} className='text-white' />
                </span>
                <span className='mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]'>
                  {item.metric.label}
                </span>
              </div>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}

function ProjectCard({ item }) {
  return (
    <Reveal>
      <article className='group'>
        <div className='editorial-rule mb-6' />

        <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]'>
          Project
        </p>
        <h3 className='mt-2 text-lg font-bold tracking-tight text-white md:text-xl'>
          {item.title}
        </h3>
        <p className='mt-1 text-sm text-[var(--color-ink-muted)]'>{item.year}</p>

        <p className='mt-3 max-w-xl text-[0.85rem] leading-[1.7] text-[var(--color-ink-secondary)]'>
          {item.summary}
        </p>

        <TechList tech={item.tech} />
      </article>
    </Reveal>
  )
}

export default function ProjectsSection() {
  const flagship = projects.find((p) => p.flagship)
  const siblings = projects.filter((p) => !p.flagship)

  return (
    <section id='projects' className='relative scroll-mt-24 px-6 py-16 md:py-28'>
      <div className='mx-auto max-w-[1400px]'>
        <SectionHeading index='03' kicker='Selected Work' title={<>Ideas into impact.</>} />

        {flagship && <FlagshipProject item={flagship} />}

        <div className='mt-16 grid grid-cols-1 gap-12 md:grid-cols-2'>
          {siblings.map((item) => (
            <ProjectCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      <div className='editorial-rule mx-auto mt-20 max-w-[1400px]' />
    </section>
  )
}
