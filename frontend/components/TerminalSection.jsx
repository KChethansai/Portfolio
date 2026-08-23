import React from 'react'
// Magic UI — Terminal
import { AnimatedSpan, Terminal, TypingAnimation } from './magicui/terminal'

function TerminalSection() {
  return (
    <section id='terminal' className='relative scroll-mt-24 px-6 py-16 md:py-24'>
      <div className='mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between'>
        <div className='max-w-md'>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-white/50'>05 - Shell</p>
          <h2 className='mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl'>
            Chethan Sai Kakunuri
          </h2>
        </div>

        <Terminal className='w-full max-w-xl border-white/12 bg-black/50 text-white'>
          <TypingAnimation className='text-cyan-300'>$ whoami</TypingAnimation>
          <AnimatedSpan className='text-white/80'>Chethan Sai Kakunuri</AnimatedSpan>
          <TypingAnimation className='text-cyan-300'>$ cat role.txt</TypingAnimation>
          <AnimatedSpan className='text-white/80'>
            B.Tech CSE (Data Science) — Anurag University, Hyderabad
          </AnimatedSpan>
          <TypingAnimation className='text-cyan-300'>$ echo $CGPA</TypingAnimation>
          <AnimatedSpan className='text-white/80'>8.87</AnimatedSpan>
          <TypingAnimation className='text-cyan-300'>$ ls projects/</TypingAnimation>
          <AnimatedSpan className='text-white/80'>MarketForge  AI-Health-Prediction  Kanvora</AnimatedSpan>
          <TypingAnimation className='text-cyan-300'>$ ls experience/</TypingAnimation>
          <AnimatedSpan className='text-white/80'>
            Suntek-IT-Solutions  Google-Cloud-EduSkills-AICTE
          </AnimatedSpan>
        </Terminal>
      </div>
    </section>
  )
}

export default TerminalSection
