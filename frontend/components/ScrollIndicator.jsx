import { motion } from 'motion/react'
import { ease } from '@/lib/motion'

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: ease.out }}
      className='relative w-full flex flex-col items-center justify-center select-none'
    >
      <p className='text-[10px] tracking-[0.35em] font-medium text-[var(--color-ink-muted)]'>
        SCROLL
      </p>
      <motion.div
        aria-hidden
        className='mt-3 h-5 w-px bg-white/15 overflow-hidden'
      >
        <motion.span
          className='block h-full w-full bg-white/40'
          initial={{ y: '-100%' }}
          animate={{ y: ['-100%', '100%'] }}
          transition={{
            duration: 1.8,
            ease: ease.inOut,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ScrollIndicator