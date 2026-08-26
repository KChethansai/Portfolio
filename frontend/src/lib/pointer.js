import { useEffect } from 'react'

// Single window-level pointer listener writing to a shared mutable object —
// never re-renders. Consumers read inside useFrame/rAF loops.
// Canonical space: x/y ∈ [-1, 1] (y up), sx/sy damped versions of the same.
export const pointer = { x: 0, y: 0, sx: 0, sy: 0, active: false }

export function useSmoothPointer() {
  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
      pointer.x = 0
      pointer.y = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])
}

// Call once per frame from the world ticker to advance damping.
export function dampPointer(dt, tau = 3) {
  const k = 1 - Math.exp(-dt * tau)
  pointer.sx += (pointer.x - pointer.sx) * k
  pointer.sy += (pointer.y - pointer.sy) * k
}
