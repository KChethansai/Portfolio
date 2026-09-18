import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { SectionHeading, useTitleRise, useHighlightWipe } from './fx/SectionTitle'
import { projects } from '@/lib/data'
import { useReducedMotion } from '@/lib/performance'

export default function ProjectsTable() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduced = useReducedMotion()
  useTitleRise('.projects-title', '.projects-title')
  useHighlightWipe('.projects-highlight')

  useGSAP(() => {
    if (reduced) return
    const section = sectionRef.current
    const follower = section?.querySelector('#project-follower')
    const rows = section?.querySelectorAll('.project-row')
    if (!section || !follower || !rows?.length) return
    gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0.85, autoAlpha: 0 })
    const show = () => gsap.to(follower, { autoAlpha: 1, scale: 1, duration: 0.25, ease: 'power3.out' })
    const hide = () => gsap.to(follower, { autoAlpha: 0, scale: 0.85, duration: 0.2, ease: 'power3.in' })
    const cleanups = []
    rows.forEach((row) => {
      const onEnter = () => {
        setActiveIndex(Number(row.dataset.index))
        show()
      }
      const onMove = (e) => gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power3.out' })
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
    section.addEventListener('mouseleave', hide)
    cleanups.push(() => section.removeEventListener('mouseleave', hide))
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onLeave: hide,
      onLeaveBack: hide,
    })
    cleanups.push(() => st.kill())
    return () => {
      hide()
      cleanups.forEach((fn) => fn())
    }
  }, [reduced])

  const active = projects[activeIndex] ?? projects[0]

  return (
    <section id="projects" ref={sectionRef} className="relative w-full bg-black text-white">
      <div className="px-5 pt-24">
        <SectionHeading
          accent="Selected"
          title="Projects"
          titleClass="projects-title text-[3.6em] md:text-[8em] lg:text-[10.8em]"
          highlightClass="projects-highlight"
        />
        <div className="pt-10">
          <div className="relative w-fit overflow-hidden">
            <h3 className="font-sans text-sm font-bold uppercase tracking-tighter">
              Idea to deployment
            </h3>
            <span className="projects-highlight absolute inset-0 block bg-default" />
          </div>
        </div>
      </div>
      <div className="mt-14 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="font-sans text-sm uppercase tracking-tighter">
              <th scope="col" className="pb-9 pl-5 text-left">No / Project</th>
              <th scope="col" className="pb-9 pl-5 text-left">Stack</th>
              <th scope="col" className="pb-9 pl-5 text-left">When</th>
              <th scope="col" className="pb-9 pr-5 text-left">Proof</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr
                key={p.title}
                data-index={i}
                className="project-row hover:bg-default hover:text-black transition-colors uppercase"
              >
                <td className="border-t border-b border-[#222] py-5 pl-5 pr-4 text-xs md:text-xl font-bold">
                  {String(i + 1).padStart(2, '0')} — {p.title}
                </td>
                <td className="border-t border-b border-[#222] py-5 pl-5 pr-4 text-xs md:text-xl font-bold">
                  {p.tech.slice(0, 3).join(' / ')}
                </td>
                <td className="border-t border-b border-[#222] py-5 pl-5 pr-4 text-xs md:text-xl font-bold whitespace-nowrap">
                  {p.year}
                </td>
                <td className="border-t border-b border-[#222] py-5 pl-5 pr-5 text-xs md:text-xl font-bold">
                  {p.metric ? (
                    <span>{p.metric.value} {p.metric.label}</span>
                  ) : (
                    <span className="flex gap-4">
                      <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} source code`} className="underline underline-offset-4" onClick={(e) => e.stopPropagation()}>GitHub</a>
                      <a href={p.website} target="_blank" rel="noreferrer" aria-label={`${p.title} live site`} className="underline underline-offset-4" onClick={(e) => e.stopPropagation()}>Live</a>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="project-follower" className="pointer-events-none fixed left-0 top-0 z-50 hidden opacity-0 md:block" aria-hidden>
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
