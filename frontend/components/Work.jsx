import React from 'react'
import FlowArt, { FlowSection } from './ui/story-scroll'

const internships = [
  {
    title: 'MERN Stack Intern',
    company: 'Suntek IT Solutions',
    year: 'Feb 2026 – Apr 2026',
    summary: 'Completed a 10-week structured training program in JavaScript, Node.js, Express, and full-stack MERN development alongside DSA. Shipped a full-stack blog application with end-to-end deployment on Vercel, Render, and MongoDB Atlas. Delivered two production-grade MERN applications independently.',
    link: '#',
  },
  {
    title: 'Virtual Intern',
    company: 'Google Cloud via EduSkills / AICTE',
    year: 'May 2026 – Jun 2026',
    summary: 'Completed Google\'s Data Analytics learning path covering BigQuery, Looker Studio, and cloud-based data pipeline fundamentals. Queried large datasets using SQL in BigQuery and built analytical dashboards in Looker Studio. Authored a 30-page internship report documenting BigQuery workflows, Looker Studio dashboards, and data analytics outcomes.',
    link: '#',
  },
]

const projects = [
  {
    title: 'MarketForge — Paper Trading Simulator',
    tech: 'React, Node.js, Express, MongoDB, Zustand, Yahoo Finance API, Tailwind CSS',
    year: 'May 2026 – Jun 2026',
    summary: 'Full-stack paper trading platform tracking 30 stocks with real-time Yahoo Finance market data. JWT cookie authentication with persistent sessions, portfolio tracking, and real-time P&L. Dark premium dashboard using Tailwind CSS, Zustand, and react-hook-form.',
    link: '#',
  },
  {
    title: 'AI Health Prediction Application',
    tech: 'Python, FastAPI, XGBoost, Gradient Boosting, OCR',
    year: 'Oct 2025 – Dec 2025',
    summary: 'Disease classification model covering 150+ diseases using XGBoost and Gradient Boosting, served via a FastAPI backend. OCR pipeline for extracting medicines from prescription images, plus a medication reminder workflow.',
    link: '#',
  },
  {
    title: 'Kanvora — Collaborative Project Board',
    tech: 'React, Node.js, Express, MongoDB, Socket.IO, react-beautiful-dnd',
    year: 'Apr 2026 – Jun 2026',
    summary: 'Trello-style project management app with real-time collaboration using Socket.IO. Drag-and-drop cards and columns with concurrent-edit race-condition handling. USER / AUTHOR / ADMIN role-based access control.',
    link: '#',
  },
]

function ResumeCard({ item, badge }) {
  return (
    <a
      href={item.link}
      target='_blank'
      rel='noopener noreferrer'
      className='group relative block rounded-md border border-dashed border-white/30 bg-black/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:bg-black/35 md:p-8'
    >
      <span className='absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-white/80' />
      <span className='absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-white/80' />
      <span className='absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-white/80' />
      <span className='absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-white/80' />
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-orange-300'>{badge}</p>
          <h3 className='mt-3 text-2xl font-bold tracking-tight md:text-4xl'>{item.title}</h3>
          <p className='mt-2 text-sm text-white/60'>{item.company || item.tech} - {item.year}</p>
        </div>
        <span className='text-2xl text-orange-300 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1'>↗</span>
      </div>
      <p className='mt-8 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg'>{item.summary}</p>
      <p className='mt-8 text-xs font-bold uppercase tracking-[0.2em] text-white/55 group-hover:text-orange-300'>View details</p>
    </a>
  )
}

function SectionHeading({ index, eyebrow, title }) {
  return (
    <>
      <p className='text-xs font-bold uppercase tracking-[0.2em] text-current/70'>{index} - {eyebrow}</p>
      <div className='my-8 h-px w-full bg-current/30' />
      <h2 className='max-w-5xl text-[clamp(3.5rem,12vw,11rem)] font-black uppercase leading-[0.82] tracking-tight'>{title}</h2>
    </>
  )
}

function Work() {
  return (
    <section id='work' className='relative z-10 w-full overflow-hidden bg-black/75 text-white'>
      <FlowArt aria-label='Resume story scroll'>
        <FlowSection aria-label='Work introduction' style={{ backgroundColor: '#100c18', color: '#fff' }}>
          <SectionHeading index='01' eyebrow='Selected work' title={<>Build.<br />Ship.<br />Learn.</>} />
          <p className='mt-auto max-w-[52ch] text-[clamp(1rem,2.2vw,1.6rem)] leading-relaxed text-white/75'>A scrollable story of internships and projects built across data science, machine learning, and full-stack development.</p>
        </FlowSection>

        <FlowSection aria-label='Internships' style={{ backgroundColor: '#4b1d0b', color: '#fff' }}>
          <SectionHeading index='02' eyebrow='Experience' title={<>Learn<br />By<br />Doing.</>} />
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            {internships.map((item) => <ResumeCard key={item.title} item={item} badge='Internship' />)}
          </div>
        </FlowSection>

        <FlowSection aria-label='Projects' style={{ backgroundColor: '#101b4d', color: '#fff' }}>
          <SectionHeading index='03' eyebrow='Projects' title={<>Ideas<br />Into<br />Impact.</>} />
          <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
            {projects.map((item) => <ResumeCard key={item.title} item={item} badge='Project' />)}
          </div>
        </FlowSection>
      </FlowArt>
    </section>
  )
}

export default Work
