import Marquee from './fx/Marquee'
import { SectionHeading } from './fx/SectionTitle'
import { useHighlightWipe } from './fx/reveal'
import { skillGroups } from '@/lib/data'

const skills = skillGroups.flatMap((g) => g.items)
const EDGE_MASK = 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'

function SkillItems() {
  return (
    <>
      {skills.map((skill, i) => (
        <span
          key={`${skill}-${i}`}
          className={
            i % 2 === 0
              ? 'whitespace-nowrap font-sans text-[clamp(1.75rem,4vw,3.5rem)] font-bold uppercase leading-none text-white'
              : 'whitespace-nowrap font-bungee text-[clamp(1.25rem,3vw,2.25rem)] uppercase leading-none text-default'
          }
        >
          {skill}
        </span>
      ))}
    </>
  )
}

export default function SkillsMarquee() {
  useHighlightWipe('.skills-highlight')

  return (
    <section id="skills" className="relative w-full overflow-hidden bg-black py-24 text-white md:py-32">
      <div className="px-5 md:px-10">
        <SectionHeading
          accent="Stack"
          title="Skills"
        />
        <div className="pt-10">
          <div className="relative w-fit overflow-hidden">
            <p className="font-sans text-sm font-bold uppercase tracking-tighter">
              Shipped with
            </p>
            <span className="skills-highlight pointer-events-none absolute inset-0 block bg-default" aria-hidden />
          </div>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-white/70 md:text-xl">
            Every project in this portfolio runs on
            <strong className="mx-1.5 font-bungee font-normal text-default">real tools</strong>
            picked for the job.
          </p>
        </div>
      </div>
      <div className="relative mt-12 overflow-hidden" style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}>
        <Marquee rowClassName="flex items-center gap-10 pr-10 md:gap-14 md:pr-14">
          <SkillItems />
        </Marquee>
      </div>
    </section>
  )
}
