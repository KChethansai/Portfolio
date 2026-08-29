import { Reveal, SectionHeading } from './motion/primitives'
import { skillGroups, education, certifications } from '@/lib/data'

function SkillGroup({ group, index }) {
  return (
    <Reveal delay={index * 0.04}>
      <div>
        <h3 className='flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]'>
          <span
            className='inline-block h-1.5 w-1.5 rounded-full'
            style={{ background: group.color }}
            aria-hidden
          />
          {group.title}
        </h3>
        <ul className='mt-3 flex flex-wrap gap-x-4 gap-y-1.5'>
          {group.items.map((skill) => (
            <li key={skill} className='text-[13px] text-[var(--color-ink-secondary)]'>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

function EduBlock({ edu }) {
  return (
    <div className='flex items-baseline justify-between gap-4'>
      <div>
        <h4 className='text-sm font-semibold text-white'>{edu.title}</h4>
        <p className='mt-0.5 text-[13px] text-[var(--color-ink-muted)]'>{edu.place}</p>
      </div>
      <div className='flex items-center gap-3 shrink-0'>
        <span className='text-[11px] tabular-nums text-[var(--color-ink-muted)]'>{edu.year}</span>
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider ${
            edu.status === 'ongoing' ? 'text-[var(--color-accent)]/70' : 'text-emerald-400/70'
          }`}
        >
          {edu.status === 'ongoing' ? 'Ongoing' : 'Done'}
        </span>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section id='skills' className='relative scroll-mt-24 px-6 py-16 md:py-28 section-tint-2'>
      <div className='mx-auto max-w-[1400px]'>
        {/* Technology */}
        <SectionHeading
          index='04'
          kicker='Technology'
          title={<>The tools behind the work.</>}
        />

        <Reveal>
          <p className='-mt-6 mb-10 text-[13px] text-[var(--color-ink-muted)]'>
            Hover the orbiting nodes in the background to explore the full stack.
          </p>
        </Reveal>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.title} group={group} index={i} />
          ))}
        </div>

        {/* Focus areas */}
        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
          <Reveal>
            <div>
              <h3 className='text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]/80'>
                AI &amp; Data
              </h3>
              <p className='mt-3 text-[0.9rem] leading-[1.7] text-[var(--color-ink-body)]'>
                Building ML-powered tools including a disease prediction model covering 150+
                diseases with XGBoost and Gradient Boosting, plus cloud analytics with BigQuery.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <div>
              <h3 className='text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400/80'>
                Full Stack
              </h3>
              <p className='mt-3 text-[0.9rem] leading-[1.7] text-[var(--color-ink-body)]'>
                Building full-stack MERN applications — including real-time collaborative systems
                and a paper trading platform with live market data.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Education */}
        <div id='education' className='mt-24'>
          <SectionHeading index='05' kicker='Education' title={<>Credentials.</>} />

          <div className='flex flex-col gap-5'>
            {education.map((edu) => (
              <EduBlock key={edu.title} edu={edu} />
            ))}
          </div>

          <div className='mt-10'>
            <p className='section-label mb-4'>Certifications</p>
            <div className='flex flex-wrap gap-x-6 gap-y-2'>
              {certifications.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.url}
                  target='_blank'
                  rel='noreferrer'
                  className='text-[13px] text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-accent)]'
                >
                  {cert.title} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='editorial-rule mx-auto mt-20 max-w-[1400px]' />
    </section>
  )
}
