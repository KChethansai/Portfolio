import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import { DotGlobeHero } from './ui/globe-hero'

const WORDS = ['Design', 'Prototype', 'Build', 'Deploy']

function Preloader() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((previous) => (previous >= 100 ? 100 : previous + 1))
    }, 17)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (count !== 100) return undefined
    const timer = setTimeout(() => navigate('/home'), 1000)
    return () => clearTimeout(timer)
  }, [count, navigate])

  const word = WORDS[Math.min(Math.floor(count / 25), WORDS.length - 1)]

  return (
    <motion.div
      className='fixed inset-0 z-10 overflow-hidden'
      initial={{ opacity: 1 }}
      animate={count === 100 ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <DotGlobeHero rotationSpeed={0.004} globeRadius={1.15}>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.1),transparent_48%)]' />

        <div className='absolute left-1/2 top-[7%] z-10 -translate-x-1/2'>
          <div className='relative inline-flex items-center gap-4 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white/85 shadow-2xl backdrop-blur-xl'>
            <span className='h-2.5 w-2.5 animate-pulse rounded-full bg-white/50' />
            <span>Chethan Sai Kakunuri</span>
            <span className='h-2.5 w-2.5 animate-pulse rounded-full bg-white/50' />
          </div>
        </div>

        <div className='absolute right-8 top-8 z-10 text-5xl font-semibold tracking-tight text-white/85 md:right-12 md:top-10 md:text-8xl'>
          {String(count).padStart(2, '0')}%
        </div>

        <div className='relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center'>
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55 }}
            className='mb-10'
          >
            <p className='text-6xl font-light tracking-tight text-white/75 md:text-8xl'>{word}</p>
            <p className='mt-1 text-[clamp(4rem,12vw,10rem)] font-black uppercase leading-[.82] tracking-[-.08em] text-white'>
              {word}
            </p>
          </motion.div>

          <div className='h-3 w-full max-w-4xl overflow-hidden rounded-full bg-white/15 shadow-[0_0_30px_rgba(255,255,255,.2)]'>
            <motion.div
              className='h-full rounded-full bg-white'
              animate={{ width: count + '%' }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
          <p className='mt-5 text-xs uppercase tracking-[0.35em] text-white/55'>Loading portfolio</p>
        </div>
      </DotGlobeHero>
    </motion.div>
  )
}

export default Preloader
