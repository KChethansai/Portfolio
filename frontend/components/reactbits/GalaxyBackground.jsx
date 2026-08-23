import { lazy, Suspense, useEffect, useState } from 'react'

// React Bits — Galaxy (dynamic + reduced-motion gated)
const Galaxy = lazy(() => import('../reactbits/Galaxy.jsx'))

function GalaxyFallback() {
  return (
    <div
      aria-hidden
      className='h-full w-full'
      style={{
        background:
          'radial-gradient(ellipse at 60% 40%, rgba(34,211,238,0.12), transparent 45%), radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.14), transparent 50%), #05050a',
      }}
    />
  )
}

export function GalaxyBackground({ className = '', density = 0.8, ...props }) {
  const [enabled, setEnabled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrow = window.matchMedia('(max-width: 768px)').matches
    setIsMobile(narrow)
    setEnabled(!reduce && !narrow)
  }, [])

  if (!enabled) {
    return (
      <div className={className}>
        <GalaxyFallback />
      </div>
    )
  }

  return (
    <div className={className}>
      <Suspense fallback={<GalaxyFallback />}>
        <Galaxy
          density={isMobile ? 0.4 : density}
          glowIntensity={0.25}
          saturation={0.35}
          hueShift={200}
          twinkleIntensity={0.2}
          mouseRepulsion
          mouseInteraction
          transparent
          {...props}
        />
      </Suspense>
    </div>
  )
}

export default GalaxyBackground
