import { AnimatedSpan, Terminal, TypingAnimation } from './magicui/terminal'
import { Reveal } from './motion/primitives'

export default function TerminalSection() {
  return (
    <section id='terminal' className='relative scroll-mt-24 px-6 py-16 md:py-28'>
      <div className='mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12 md:items-center'>
        <Reveal className='md:col-span-5'>
          <p className='section-label flex items-center gap-3'>
            <span className='text-[var(--color-accent)]'>06</span>
            <span className='h-px w-6 bg-white/10' aria-hidden />
            Shell
          </p>
          <h2 className='mt-4 text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[1.0] text-white'>
            The person
            <br />
            behind the
            <br />
            <span className='font-mono text-[var(--color-accent)]'>prompt.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08} className='md:col-span-7'>
          <Terminal className='w-full border-white/[0.06] bg-black/40 font-mono text-white/90'>
            <TypingAnimation className='text-[var(--color-accent)]'>$ whoami</TypingAnimation>
            <AnimatedSpan className='text-white/75'>Chethan Sai Kakunuri</AnimatedSpan>
            <TypingAnimation className='text-[var(--color-accent)]'>$ cat role.txt</TypingAnimation>
            <AnimatedSpan className='text-white/75'>
              B.Tech CSE (Data Science) — Anurag University, Hyderabad
            </AnimatedSpan>
            <TypingAnimation className='text-[var(--color-accent)]'>$ echo $CGPA</TypingAnimation>
            <AnimatedSpan className='text-white/75'>8.87</AnimatedSpan>
            <TypingAnimation className='text-[var(--color-accent)]'>$ ls projects/</TypingAnimation>
            <AnimatedSpan className='text-white/75'>
              MarketForge  AI-Health-Prediction  Kanvora
            </AnimatedSpan>
            <TypingAnimation className='text-[var(--color-accent)]'>$ ls experience/</TypingAnimation>
            <AnimatedSpan className='text-white/75'>
              Suntek-IT-Solutions  Google-Cloud-EduSkills-AICTE
            </AnimatedSpan>
            <TypingAnimation className='text-violet-400'>$ status --availability</TypingAnimation>
            <AnimatedSpan className='text-emerald-400/80'>open to opportunities</AnimatedSpan>
          </Terminal>
        </Reveal>
      </div>
    </section>
  )
}
