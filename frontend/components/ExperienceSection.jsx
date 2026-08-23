import React from 'react'
// Aceternity — Timeline
import { Timeline } from './aceternity/timeline'

const internships = [
  {
    title: 'MERN Stack Intern',
    company: 'Suntek IT Solutions',
    year: 'Feb 2026 – Apr 2026',
    summary: 'Completed a 10-week structured training program in JavaScript, Node.js, Express, and full-stack MERN development alongside DSA. Shipped a full-stack blog application with end-to-end deployment on Vercel, Render, and MongoDB Atlas. Delivered two production-grade MERN applications independently.',
  },
  {
    title: 'Virtual Intern',
    company: 'Google Cloud via EduSkills / AICTE',
    year: 'May 2026 – Jun 2026',
    summary: 'Completed Google\'s Data Analytics learning path covering BigQuery, Looker Studio, and cloud-based data pipeline fundamentals. Queried large datasets using SQL in BigQuery and built analytical dashboards in Looker Studio. Authored a 30-page internship report documenting BigQuery workflows, Looker Studio dashboards, and data analytics outcomes.',
  },
]

function ExperienceSection() {
  const data = internships.map((item) => ({
    title: item.year,
    content: (
      <div className='panel-surface p-6 md:p-8'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-cyan-300'>Internship</p>
        <h3 className='mt-3 text-2xl font-bold tracking-tight text-white md:text-4xl'>{item.title}</h3>
        <p className='mt-2 text-sm text-white/60'>
          {item.company} - {item.year}
        </p>
        <p className='mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg'>{item.summary}</p>
      </div>
    ),
  }))

  return (
    <section id='experience' className='relative scroll-mt-24 py-16 md:py-24'>
      <div className='mx-auto max-w-6xl px-6'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-white/50'>02 - Experience</p>
        <div className='my-8 h-px w-full bg-white/20' />
        <h2 className='max-w-5xl text-[clamp(2.75rem,8vw,6rem)] font-black uppercase leading-[0.88] tracking-tight text-white'>
          Learn
          <br />
          By
          <br />
          Doing.
        </h2>
      </div>
      <Timeline data={data} />
    </section>
  )
}

export default ExperienceSection
