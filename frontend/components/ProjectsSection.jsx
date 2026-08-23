import React from 'react'
// Magic UI — Border Beam
import { BorderBeam } from './magicui/border-beam'
// Magic UI — Number Ticker
import { NumberTicker } from './magicui/number-ticker'
// Kokonut UI — Spotlight Cards
import { SpotlightCard } from './kokonutui/spotlight-card'
// Aceternity — 3D Card Effect
import { CardBody, CardContainer, CardItem } from './aceternity/3d-card'

const projects = [
  {
    title: 'MarketForge — Paper Trading Simulator',
    tech: 'React, Node.js, Express, MongoDB, Zustand, Yahoo Finance API, Tailwind CSS',
    year: 'May 2026 – Jun 2026',
    summary: 'Full-stack paper trading platform tracking 30 stocks with real-time Yahoo Finance market data. JWT cookie authentication with persistent sessions, portfolio tracking, and real-time P&L. Dark premium dashboard using Tailwind CSS, Zustand, and react-hook-form.',
    flagship: true,
  },
  {
    title: 'AI Health Prediction Application',
    tech: 'Python, FastAPI, XGBoost, Gradient Boosting, OCR',
    year: 'Oct 2025 – Dec 2025',
    summary: 'Disease classification model covering 150+ diseases using XGBoost and Gradient Boosting, served via a FastAPI backend. OCR pipeline for extracting medicines from prescription images, plus a medication reminder workflow.',
  },
  {
    title: 'Kanvora — Collaborative Project Board',
    tech: 'React, Node.js, Express, MongoDB, Socket.IO, react-beautiful-dnd',
    year: 'Apr 2026 – Jun 2026',
    summary: 'Trello-style project management app with real-time collaboration using Socket.IO. Drag-and-drop cards and columns with concurrent-edit race-condition handling. USER / AUTHOR / ADMIN role-based access control.',
  },
]

function FlagshipCard({ item }) {
  return (
    <SpotlightCard color='#22d3ee' className='relative col-span-1 md:col-span-2'>
      <BorderBeam size={80} duration={10} colorFrom='#22d3ee' colorTo='#8b5cf6' />
      <div className='p-6 md:p-8'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-cyan-300'>Project</p>
        <h3 className='mt-3 text-2xl font-bold tracking-tight text-white md:text-4xl'>{item.title}</h3>
        <p className='mt-2 text-sm text-white/60'>
          {item.tech} - {item.year}
        </p>
        <p className='mt-6 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg'>{item.summary}</p>
        <div className='mt-8 inline-flex items-baseline gap-2 rounded-[var(--radius-sm)] border border-white/12 bg-black/30 px-4 py-3'>
          <span className='text-3xl font-bold text-white'>
            <NumberTicker value={30} className='text-white' />
          </span>
          <span className='text-xs font-semibold uppercase tracking-[0.18em] text-white/50'>stocks tracked</span>
        </div>
      </div>
    </SpotlightCard>
  )
}

function SiblingCard({ item }) {
  return (
    <CardContainer containerClassName='py-0' className='w-full'>
      <CardBody className='relative h-auto w-full rounded-[var(--radius-lg)] border border-white/12 bg-white/[0.03] p-6 [transform-style:preserve-3d]'>
        <CardItem translateZ='40' className='w-full'>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-violet-300'>Project</p>
          <h3 className='mt-3 text-xl font-bold tracking-tight text-white md:text-2xl'>{item.title}</h3>
          <p className='mt-2 text-sm text-white/60'>
            {item.tech} - {item.year}
          </p>
        </CardItem>
        <CardItem translateZ='20' className='mt-6'>
          <p className='text-sm leading-relaxed text-white/75 md:text-base'>{item.summary}</p>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

function ProjectsSection() {
  const [flagship, ...siblings] = projects

  return (
    <section id='projects' className='relative scroll-mt-24 px-6 py-16 md:py-24'>
      <div className='mx-auto max-w-6xl'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-white/50'>03 - Projects</p>
        <div className='my-8 h-px w-full bg-white/20' />
        <h2 className='max-w-5xl text-[clamp(2.75rem,8vw,6rem)] font-black uppercase leading-[0.88] tracking-tight text-white'>
          Ideas
          <br />
          Into
          <br />
          Impact.
        </h2>

        <div className='mt-12 grid grid-cols-1 gap-5 md:grid-cols-2'>
          <FlagshipCard item={flagship} />
          {siblings.map((item) => (
            <SiblingCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
