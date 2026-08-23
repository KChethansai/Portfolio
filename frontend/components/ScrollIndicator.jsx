import React from 'react'
import { motion } from 'motion/react'

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='relative w-full bg-black text-white flex flex-col items-center justify-center  select-none'
    >
      <p className='text-xs md:text-sm tracking-[0.4em] font-medium text-white/80'>
        SCROLL
      </p>
      <motion.div
        aria-hidden
        className='mt-4 h-6 w-px bg-white/30 overflow-hidden'
      >
        <motion.span
          className='block h-full w-full bg-white'
          initial={{ y: '-100%' }}
          animate={{ y: ['-100%', '100%'] }}
          transition={{
            duration: 1.6,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ScrollIndicator
