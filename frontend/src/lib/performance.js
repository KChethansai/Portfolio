import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Device performance tier: 'low' | 'mid' | 'high'. Computed once.
let cachedTier = null
function computeTier() {
  if (cachedTier) return cachedTier
  const narrow = window.matchMedia('(max-width: 768px)').matches
  const cores = navigator.hardwareConcurrency ?? 4
  const mem = navigator.deviceMemory ?? 4
  if (narrow || cores <= 4 || mem <= 4) cachedTier = 'low'
  else if (cores <= 8) cachedTier = 'mid'
  else cachedTier = 'high'
  return cachedTier
}

export function useDeviceCapability() {
  return useState(() => (typeof window === 'undefined' ? 'mid' : computeTier()))[0]
}
