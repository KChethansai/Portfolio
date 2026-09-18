import { Fragment, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SectionHeading, useTitleRise, useHighlightWipe } from './fx/SectionTitle'
import { NumberTicker } from './magicui/number-ticker'
import { stats, projects } from '@/lib/data'
import { useReducedMotion } from '@/lib/performance'

const CARD_COUNT = 5

export default function StatsSection() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  useTitleRise('.stats-title', '.stats-title')
  useHighlightWipe('.stats-highlight')

  useGSAP(() => {
    if (reduced) return
    const section = sectionRef.current
    if (!section) return
    const areas = section.querySelectorAll('.picture-area')
    const cards = section.querySelectorAll('.hover-card')
    gsap.set(cards, { opacity: 0, scale: 0.9, xPercent: -50, yPercent: -50 })
    const cleanups = []
    areas.forEach((area, index) => {
      const card = cards[index]
      if (!card) return
      const xTo = gsap.quickTo(card, 'x', { duration: 0.4, ease: 'power3' })
      const yTo = gsap.quickTo(card, 'y', { duration: 0.4, ease: 'power3' })
      const show = () => gsap.to(card, { opacity: 1, scale: 1, duration: 0.3 })
      const hide = () => gsap.to(card, { opacity: 0, scale: 0.9, duration: 0.25 })
      const move = (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
      }
      area.addEventListener('mouseenter', show)
      area.addEventListener('mouseleave', hide)
      area.addEventListener('mousemove', move)
      cleanups.push(() => {
        area.removeEventListener('mouseenter', show)
        area.removeEventListener('mouseleave', hide)
        area.removeEventListener('mousemove', move)
      })
    })
    const hideAll = () => gsap.to(cards, { opacity: 0, scale: 0.9, duration: 0.2 })
    section.addEventListener('mouseleave', hideAll)
    return () => {
      section.removeEventListener('mouseleave', hideAll)
      cleanups.forEach((fn) => fn())
    }
  }, [reduced])

  return (
    <section id="intro" ref={sectionRef} className="relative w-full bg-black text-white overflow-hidden">
      <div className="px-5 pt-24">
        <SectionHeading
          accent="Intro"
          title="Stats"
          titleClass="stats-title text-[3.6em] md:text-[8em] lg:text-[10.8em]"
          highlightClass="stats-highlight"
        />
      </div>
      <div className="relative flex overflow-hidden px-5 pb-10">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-4">
          {stats.map((s, i) => (
            <Fragment key={s.label}>
              <div className="flex flex-col">
                <span className="font-sans text-[4em] md:text-[9em] font-bold leading-none tracking-tighter">
                  <NumberTicker value={s.value} decimalPlaces={s.decimals} delay={i * 0.2} className="text-white" />
                </span>
                <span className="relative mt-2 w-fit font-sans text-xs md:text-base font-semibold uppercase tracking-tighter">
                  {s.label}
                  <span className="stats-highlight absolute inset-0 block bg-default" />
                </span>
              </div>
              {i < stats.length - 1 && (
                <span aria-hidden className="font-bungee text-[2em] md:text-[4em] text-default">
                  /
                </span>
              )}
            </Fragment>
          ))}
        </div>
        <div className="absolute inset-0 z-10 hidden md:grid grid-cols-5">
          {[...Array(CARD_COUNT)].map((_, i) => (
            <div key={i} className="picture-area" />
          ))}
        </div>
        <div className="pointer-events-none fixed inset-0 z-50 hidden md:block" aria-hidden>
          {[...Array(CARD_COUNT)].map((_, i) => {
            const p = projects[i % projects.length]
            return (
              <div key={i} className="hover-card absolute top-0 left-0 w-72 bg-default p-5 text-black opacity-0">
                <p className="font-bungee text-base uppercase leading-tight">{p.title}</p>
                <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-tight">
                  {p.tech.slice(0, 4).join(' / ')}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
