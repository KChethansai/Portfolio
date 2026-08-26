import { NumberTicker } from './magicui/number-ticker'
import { Reveal, SectionHeading } from './motion/primitives'
import { stats } from '@/lib/data'

function StatBlock({ stat }) {
  return (
    <div className='flex flex-col'>
      <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]'>
        {stat.label}
      </p>
      <p className='mt-1.5 text-3xl font-bold tabular-nums text-white md:text-4xl'>
        <NumberTicker value={stat.value} decimalPlaces={stat.decimals} className='text-white' />
      </p>
    </div>
  )
}

export default function IntroSection() {
  return (
    <section id='intro' className='relative scroll-mt-24 px-6 py-24 md:py-36'>
      <div className='mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:items-end'>
        <div className='lg:col-span-7'>
          <SectionHeading index='01' kicker='Introduction' title={null} />
          <Reveal delay={0.08}>
            <h2 className='text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white [text-wrap:balance]'>
              Build.
              <br />
              Ship.
              <br />
              <span className='accent-text'>Learn.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className='mt-8 max-w-[48ch] text-[clamp(0.95rem,1.8vw,1.25rem)] leading-[1.7] text-[var(--color-ink-secondary)]'>
              A story of internships and projects built across data science, machine
              learning, and full-stack development.
            </p>
          </Reveal>
        </div>

        <div className='grid grid-cols-3 gap-6 lg:col-span-5'>
          {stats.map((stat) => (
            <StatBlock key={stat.label} stat={stat} />
          ))}
        </div>
      </div>

      <div className='editorial-rule mx-auto mt-20 max-w-[1400px]' />
    </section>
  )
}
