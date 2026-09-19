// Single shared pointer source for the whole page. One window listener
// (ref-counted, rAF-throttled), consumed as springs by Hero, Scene3D,
// magnetic buttons and cursor followers. Values are viewport ratios in
// [-1, 1]; consumers derive their own depth via useSpring/useTransform.
import { motionValue } from 'motion/react'

export const pointerX = motionValue(0)
export const pointerY = motionValue(0)

let attached = 0

export function attachPointer() {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  attached += 1
  if (attached > 1) {
    return () => {
      attached -= 1
    }
  }
  let raf = 0
  const onMove = (e) => {
    if (raf) return
    const { innerWidth, innerHeight } = window
    const x = e.clientX
    const y = e.clientY
    raf = requestAnimationFrame(() => {
      raf = 0
      pointerX.set((x / innerWidth) * 2 - 1)
      pointerY.set((y / innerHeight) * 2 - 1)
    })
  }
  const onLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }
  window.addEventListener('mousemove', onMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', onLeave)
  return () => {
    attached -= 1
    if (attached <= 0) {
      attached = 0
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }
}
