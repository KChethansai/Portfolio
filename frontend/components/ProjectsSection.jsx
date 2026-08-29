import { useRef, useState } from 'react'
import { Reveal, SectionHeading } from './motion/primitives'
import { NumberTicker } from './magicui/number-ticker'
import { projects } from '@/lib/data'

function ProjectLinks({ item }) {
  if (!item.github && !item.website) return null
  return (
    <div className='mt-4 flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]'>
      {item.github && (
        <a href={item.github} target='_blank' rel='noreferrer' className='transition-colors hover:text-[var(--color-accent)]'>
          GitHub ↗
        </a>
      )}
      {item.website && (
        <a href={item.website} target='_blank' rel='noreferrer' className='transition-colors hover:text-[var(--color-accent)]'>
          Website ↗
        </a>
      )}
    </div>
  )
}

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
            <h3 className='mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.03em] text-white leading-[1.05]'>
              {item.title}
            </h3>
            <p className='mt-2 text-sm text-[var(--color-ink-muted)]'>{item.year}</p>

            <p className='mt-5 max-w-2xl text-[0.95rem] leading-[1.7] text-[var(--color-ink-body)]'>
              {item.summary}
            </p>

            <ProjectLinks item={item} />

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

function ProjectCard({ item, index = 0 }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Skip cursor tracking on touch devices
  const isTouchDevice = typeof window !== 'undefined' && (window.matchMedia?.('(hover: none)').matches || window.matchMedia?.('(pointer: coarse)').matches)

  // Write glow origin straight to the DOM — no React re-render per pointer move.
  const onMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty('--glow-x', `${x}%`)
    cardRef.current.style.setProperty('--glow-y', `${y}%`)
  }

  return (
    <Reveal delay={index * 0.06}>
      <article
        ref={cardRef}
        className={`group relative rounded-md border border-white/[0.04] bg-white/[0.015] p-5 transition-colors duration-300 ${!isTouchDevice && isHovered ? 'hover:border-[var(--color-accent)]/15' : ''}`}
        onMouseMove={onMouseMove}
        onMouseEnter={() => { if (!isTouchDevice) setIsHovered(true) }}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cursor-following gradient glow */}
        {!isTouchDevice && (
          <div
            className={`pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}
            style={{
              background: 'radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(34,211,238,0.06), transparent 40%)',
            }}
          />
        )}
        <div className={`relative z-10 transition-colors duration-300 ${!isTouchDevice && isHovered ? 'bg-white/[0.025]' : ''}`}>
          <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]'>
            Project
          </p>
          <h3 className='mt-2 text-lg font-bold tracking-tight text-white md:text-xl'>
            {item.title}
          </h3>
          <p className='mt-1 text-sm text-[var(--color-ink-muted)]'>{item.year}</p>

          <p className='mt-3 max-w-xl text-[0.9rem] leading-[1.7] text-[var(--color-ink-body)]'>
            {item.summary}
          </p>

          <ProjectLinks item={item} />

          <TechList tech={item.tech} />
        </div>
      </article>
    </Reveal>
  )
}

export default function ProjectsSection() {
  const flagship = projects.find((p) => p.flagship)
  const siblings = projects.filter((p) => !p.flagship)

  return (
    <section id='projects' className='relative scroll-mt-24 px-6 py-16 md:py-28 section-glow'>
      <div className='mx-auto max-w-[1400px]'>
        <SectionHeading index='03' kicker='Selected Work' title={<>Ideas into impact.</>} />

        {flagship && <FlagshipProject item={flagship} />}

        <div className='mt-16 grid grid-cols-1 gap-12 md:grid-cols-2'>
          {siblings.map((item, i) => (
            <ProjectCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>

      <div className='editorial-rule mx-auto mt-20 max-w-[1400px]' />
    </section>
  )
}