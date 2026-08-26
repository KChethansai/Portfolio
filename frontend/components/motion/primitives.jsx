import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { ease, duration, revealViewport } from '@/lib/motion'

// Scroll-reveal wrapper — restrained, editorial.
export function Reveal({ children, delay = 0, y = 20, className = '', as = 'div' }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: duration.normal, ease: ease.out, delay }}
      className={className}
    >
      {children}
    </Tag>
  )
}

// Section heading — editorial number + kicker + title.
export function SectionHeading({ index, kicker, title }) {
  return (
    <div className='mb-10 md:mb-14'>
      <Reveal>
        <p className='section-label flex items-center gap-3'>
          <span className='text-[var(--color-accent)]'>{index}</span>
          <span className='h-px w-6 bg-white/10' aria-hidden />
          {kicker}
        </p>
      </Reveal>
      {title ? (
        <Reveal delay={0.06}>
          <h2 className='mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.08] text-white'>
            {title}
          </h2>
        </Reveal>
      ) : null}
    </div>
  )
}

// Magnetic hover — subtle lean toward cursor.
export function Magnetic({ children, strength = 0.2, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
