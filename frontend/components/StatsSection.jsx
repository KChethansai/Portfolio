import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SectionHeading } from './fx/SectionTitle'
import { useTitleRise, useHighlightWipe } from './fx/reveal'
import ScrollReveal from './effects/ScrollReveal'
import { NumberTicker } from './magicui/number-ticker'
import { stats, projects } from '@/lib/data'
import { useReducedMotion } from '@/lib/performance'

const X_OFF = 28
const Y_OFF = 28

export default function StatsSection() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  useTitleRise('.stats-title', '.stats-title')
  useHighlightWipe('.stats-highlight')

  useGSAP(() => {
    if (reduced) return
    const section = sectionRef.current
    const card = cardRef.current
    if (!section || !card) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    gsap.set(card, { opacity: 0, scale: 0.9 })
    const xTo = gsap.quickTo(card, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(card, 'y', { duration: 0.4, ease: 'power3' })
    const show = (i) => (e) => {
      setActive(i)
      xTo(Math.min(e.clientX + X_OFF, window.innerWidth - 304))
      yTo(Math.min(e.clientY + Y_OFF, window.innerHeight - 220))
      gsap.to(card, { opacity: 1, scale: 1, duration: 0.3 })
    }
    const move = (e) => {
      xTo(Math.min(e.clientX + X_OFF, window.innerWidth - 304))
      yTo(Math.min(e.clientY + Y_OFF, window.innerHeight - 220))
    }
    const hide = () => gsap.to(card, { opacity: 0, scale: 0.9, duration: 0.25 })
    const cells = section.querySelectorAll('.stat-cell')
    const cleanups = []
    cells.forEach((cell, i) => {
      const onEnter = show(i)
      cell.addEventListener('mouseenter', onEnter)
      cell.addEventListener('mousemove', move)
      cell.addEventListener('mouseleave', hide)
      cleanups.push(() => {
        cell.removeEventListener('mouseenter', onEnter)
        cell.removeEventListener('mousemove', move)
        cell.removeEventListener('mouseleave', hide)
      })
    })
    section.addEventListener('mouseleave', hide)
    return () => {
      section.removeEventListener('mouseleave', hide)
      cleanups.forEach((fn) => fn())
    }
  }, [reduced])

  const preview = projects[active % projects.length]

  return (
    <section id="intro" ref={sectionRef} className="relative w-full overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-32 pb-16 md:pb-24">
        <SectionHeading
          accent="Intro"
          title="Stats"
          titleClass="stats-title"
          highlightClass="stats-highlight"
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
      {!reduced && (
        <div
          ref={cardRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-50 hidden w-72 bg-default p-5 text-black opacity-0 md:block"
        >
          <p className="font-bungee text-base uppercase leading-tight">{preview.title}</p>
          <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-tight">
            {preview.tech.slice(0, 4).join(' / ')}
          </p>
        </div>
      )}
    </section>
  )
}
