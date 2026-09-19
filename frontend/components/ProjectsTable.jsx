import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { SectionHeading } from './fx/SectionTitle'
import { useTitleRise, useHighlightWipe } from './fx/reveal'
import ScrollReveal from './effects/ScrollReveal'
import { projects } from '@/lib/data'
import { useReducedMotion } from '@/lib/performance'

const FOLLOWER_OFFSET_X = 28
const FOLLOWER_OFFSET_Y = 28

export default function ProjectsTable() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduced = useReducedMotion()
  useTitleRise('.projects-title', '.projects-title')
  useHighlightWipe('.projects-highlight')

  useGSAP(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const section = sectionRef.current
    const follower = section?.querySelector('#project-follower')
    const rows = section?.querySelectorAll('.project-row')
    if (!section || !follower || !rows?.length) return
    gsap.set(follower, { scale: 0.9, autoAlpha: 0 })
    const xTo = gsap.quickTo(follower, 'x', { duration: 0.3, ease: 'power3.out' })
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.3, ease: 'power3.out' })
    const show = () => gsap.to(follower, { autoAlpha: 1, scale: 1, duration: 0.25, ease: 'power3.out' })
    const hide = () => gsap.to(follower, { autoAlpha: 0, scale: 0.9, duration: 0.2, ease: 'power3.in' })
    const cleanups = []
    rows.forEach((row) => {
      const onEnter = () => {
        setActiveIndex(Number(row.dataset.index))
        show()
      }
      const onMove = (e) => {
        // Flip inside the viewport so the 288px card never clips at edges.
        xTo(Math.min(e.clientX + FOLLOWER_OFFSET_X, window.innerWidth - 304))
        yTo(Math.min(e.clientY + FOLLOWER_OFFSET_Y, window.innerHeight - 220))
      }
      const onLeave = () => hide()
      row.addEventListener('mouseenter', onEnter)
      row.addEventListener('mousemove', onMove)
      row.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        row.removeEventListener('mouseenter', onEnter)
        row.removeEventListener('mousemove', onMove)
        row.removeEventListener('mouseleave', onLeave)
      })
    })
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onLeave: hide,
      onLeaveBack: hide,
    })
    cleanups.push(() => st.kill())
    return () => {
      cleanups.forEach((fn) => fn())
      gsap.killTweensOf(follower)
    }
  }, [reduced])

  const active = projects[activeIndex] ?? projects[0]

  return (
    <section id="projects" ref={sectionRef} className="relative w-full bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeading
          accent="Selected"
          title="Projects"
          titleClass="projects-title"
          highlightClass="projects-highlight"
        />
        <div className="pt-10">
          <div className="relative w-fit overflow-hidden">
            <p className="font-sans text-sm font-bold uppercase tracking-tighter">
              Idea to deployment
            </p>
            <span className="projects-highlight pointer-events-none absolute inset-0 block bg-default" aria-hidden />
          </div>
        </div>

        <div className="mt-12 hidden overflow-hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="font-sans text-sm uppercase tracking-tighter">
                <th scope="col" className="pb-9 pr-4 text-left">No / Project</th>
                <th scope="col" className="pb-9 pr-4 text-left">Stack</th>
                <th scope="col" className="pb-9 pr-4 text-left">When</th>
                <th scope="col" className="pb-9 text-left">Proof</th>
              </tr>
            </thead>
            <tbody className="[&:hover_.project-row]:opacity-35">
              {projects.map((p, i) => (
                <tr
                  key={p.title}
                  data-index={i}
                  className="project-row group transition hover:bg-default hover:text-black hover:opacity-100!"
                >
                  <td className="border-y border-[#222] py-6 pr-4 align-top">
                    <span className="block font-bungee text-3xl leading-none text-default group-hover:text-black lg:text-4xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-2 block font-sans text-xl font-bold uppercase leading-tight tracking-tight lg:text-2xl">
                      {p.title}
                    </span>
                  </td>
                  <td className="border-y border-[#222] py-6 pr-4 align-top font-sans text-sm font-semibold uppercase tracking-tight">
                    {p.tech.slice(0, 3).join(' / ')}
                  </td>
                  <td className="whitespace-nowrap border-y border-[#222] py-6 pr-4 align-top font-sans text-sm font-semibold uppercase tracking-tight">
                    {p.year}
                  </td>
                  <td className="border-y border-[#222] py-6 align-top font-sans text-sm font-semibold uppercase tracking-tight">
                    {p.metric ? (
                      <span>{p.metric.value} {p.metric.label}</span>
                    ) : (
                      <span className="flex gap-4">
                        <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code`} className="underline underline-offset-4">GitHub</a>
                        <a href={p.website} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live site`} className="underline underline-offset-4">Live</a>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex flex-col gap-5 md:hidden">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title}>
              <article className="rounded-xl border border-white/12 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between font-sans text-xs font-bold uppercase tracking-tighter text-white/50">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="mt-3 font-sans text-xl font-bold uppercase leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/65">
                  {p.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${p.title} tech stack`}>
                  {p.tech.map((t) => (
                    <li key={t} className="rounded-full border border-default/50 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-tight text-default">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex gap-6">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code`} className="inline-block py-2 font-sans text-sm font-bold uppercase underline underline-offset-4">
                    GitHub
                  </a>
                  <a href={p.website} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live site`} className="inline-block py-2 font-sans text-sm font-bold uppercase underline underline-offset-4">
                    Live
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div id="project-follower" aria-hidden className="pointer-events-none fixed left-0 top-0 z-50 hidden opacity-0 md:block">
        <div className="w-72 bg-default p-5 text-black">
          <p className="font-bungee text-base uppercase leading-tight">{active.title}</p>
          {active.metric && (
            <p className="mt-2 font-sans text-3xl font-bold leading-none">
              {active.metric.value} <span className="text-sm font-semibold uppercase">{active.metric.label}</span>
            </p>
          )}
          <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-tight">
            {active.tech.slice(0, 4).join(' / ')}
          </p>
        </div>
      </div>
    </section>
  )
}
