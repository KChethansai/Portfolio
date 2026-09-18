import Marquee from './fx/Marquee'
import { SectionHeading, useTitleRise, useHighlightWipe } from './fx/SectionTitle'
import { skillGroups } from '@/lib/data'
import { useReducedMotion } from '@/lib/performance'

const skills = skillGroups.flatMap((g) => g.items)
const rowClassName = 'flex items-center gap-12 md:gap-16 2xl:gap-20 pr-20 scale-50 md:scale-75 lg:scale-100'

function SkillItems() {
  return (
    <>
      {skills.map((skill, i) => (
        <span
          key={`${skill}-${i}`}
          className={
            i % 2 === 0
              ? 'font-sans text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white whitespace-nowrap'
              : 'font-bungee text-3xl md:text-5xl uppercase text-default whitespace-nowrap'
          }
        >
          {skill}
        </span>
      ))}
    </>
  )
}

export default function SkillsMarquee() {
  const reduced = useReducedMotion()
  useTitleRise('.skills-title', '.skills-title')
  useHighlightWipe('.skills-highlight')

  return (
    <section id="skills" className="relative w-full bg-black py-24 text-white overflow-hidden">
      <div className="px-5">
        <SectionHeading
          accent="Stack"
          title="Skills"
          titleClass="skills-title text-[3.6em] md:text-[8em] lg:text-[10.8em]"
          highlightClass="skills-highlight"
        />
        <div className="pt-10">
          <div className="relative w-fit overflow-hidden">
            <h3 className="font-sans text-sm font-bold uppercase tracking-tighter">
              Shipped with
            </h3>
            <span className="skills-highlight absolute inset-0 block bg-default" />
          </div>
          <div className="relative overflow-hidden">
            <p className="mt-6 font-sans text-2xl lg:max-w-lg">
              Every project in this portfolio runs on
              <strong className="mx-1.5 font-bungee font-normal text-default">real tools</strong>
              picked for the job.
            </p>
            <span className="skills-highlight absolute inset-0 block bg-default" />
          </div>
        </div>
      </div>
      <div className="relative mt-14 overflow-hidden">
        {reduced ? (
          <div className="flex flex-wrap items-center gap-6 px-5">
            <SkillItems />
          </div>
        ) : (
          <Marquee rowClassName={rowClassName}>
            <SkillItems />
          </Marquee>
        )}
        <span className="skills-highlight pointer-events-none absolute inset-0 block bg-default" />
      </div>
    </section>
  )
}
