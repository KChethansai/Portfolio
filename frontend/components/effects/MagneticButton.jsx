// Subtle magnetic anchor. Pulls toward the cursor at 0.15 strength while
// hovered, springs back on leave. Local listeners only (no global cost).
import { useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'motion/react'
import { useReducedMotion } from '@/lib/performance'

const STRENGTH = 0.15

export default function MagneticButton({ href, className = '', children, ...rest }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * STRENGTH)
    y.set((e.clientY - (rect.top + rect.height / 2)) * STRENGTH)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  )
}
