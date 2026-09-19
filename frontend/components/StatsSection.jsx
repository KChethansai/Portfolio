import { SectionHeading } from './fx/SectionTitle'
import ScrollReveal from './effects/ScrollReveal'
import { NumberTicker } from './magicui/number-ticker'
import { stats } from '@/lib/data'

export default function StatsSection() {

  return (
    <section id="intro" className="relative w-full overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-32 pb-16 md:pb-24">
        <SectionHeading
          accent="Intro"
          title="Stats"
        />
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 md:mt-16 md:gap-6">
          {stats.map((s, i) => (
            <ScrollReveal
              key={s.label}
              delay={i * 0.08}
              y={24}
              className="stat-cell relative border-t border-white/15 pt-6"
            >
              <p className="font-sans font-bold leading-none tracking-tighter text-[clamp(3.5rem,7vw,6.5rem)] text-white">
                <NumberTicker value={s.value} decimalPlaces={s.decimals} delay={i * 0.2} className="text-white" />
              </p>
              <p className="mt-3 flex items-baseline gap-3">
                <span className="text-sm font-semibold uppercase tracking-widest text-white/70">{s.label}</span>
                <span aria-hidden className="font-bungee text-xs text-default">
                  {`0${i + 1}`}
                </span>
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
