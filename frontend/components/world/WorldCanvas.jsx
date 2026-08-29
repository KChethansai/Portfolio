import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Starfield from './Starfield'
import { world, starPointer } from './WorldState'
import Robot from './Robot'
import TechGalaxy from './TechGalaxy'
import { pointer, useSmoothPointer, dampPointer } from '@/lib/pointer'
import { useDeviceCapability, useReducedMotion } from '@/lib/performance'

// Throttled scroll listener — writes to mutable shared state, zero React renders.
function useWorldScroll() {
  useEffect(() => {
    let ticking = false
    // Cache section elements for getBoundingClientRect
    const sectionCache = {}
    const getSection = (id) => {
      if (!sectionCache[id]) sectionCache[id] = document.getElementById(id)
      return sectionCache[id]
    }
    const update = () => {
      ticking = false
      const doc = document.documentElement
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1)
      world.progress = Math.min(window.scrollY / max, 1)
      world.aspect = window.innerWidth / window.innerHeight
      for (const [key, id] of [
        ['skillsFocus', 'skills'],
        ['contactFocus', 'contact'],
      ]) {
        const el = getSection(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2 - window.innerHeight / 2
        world[key] = Math.max(0, 1 - Math.abs(center) / (window.innerHeight * 0.75 + rect.height / 2))
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}

export default function WorldCanvas({ onReady }) {
  const tier = useDeviceCapability()
  const reducedMotion = useReducedMotion()
  useSmoothPointer()
  useWorldScroll()

  // DPR: cap aggressively. Visual difference is negligible, perf difference is not.
  const dpr = useMemo(() => {
    if (tier === 'low') return [0.75, 0.75]
    if (tier === 'mid') return [1, 1]
    return [1, 1.25] // high tier: cap at 1.25 max
  }, [tier])

  const [eventSource] = useState(() => document.body)

  return (
    <div className='fixed inset-0 z-0' aria-hidden>
      <Canvas
        dpr={dpr}
        eventSource={eventSource}
        eventPrefix='client'
        camera={{ position: [0, 0.4, 7], fov: 42, near: 0.1, far: 60 }}
        gl={{
          antialias: tier !== 'low',
          powerPreference: 'high-performance',
          stencil: false,
          // Power-efficient: don't preserve drawing buffer
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.0
          gl.setClearColor('#050608', 1)
          onReady?.()
        }}
      >
        <fog attach='fog' args={['#050608', 12, 30]} />
        <ambientLight intensity={0.7} />
        <hemisphereLight args={['#b0c4de', '#0a0818', 0.4]} />
        <directionalLight position={[4, 5, 6]} intensity={1.0} color='#d0dce8' />
        <Suspense fallback={null}>
          <WorldRig reducedMotion={reducedMotion} />
          <Starfield />
          <Robot reducedMotion={reducedMotion} />
          <TechGalaxy reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function WorldRig({ reducedMotion }) {
  useFrame((state, dt) => {
    dampPointer(dt)
    starPointer.x = pointer.sx
    starPointer.y = pointer.sy
    starPointer.active = pointer.active ? 1 : 0

    if (reducedMotion) return
    const k = 1 - Math.exp(-dt * 2)
    state.camera.position.x += (pointer.sx * 0.25 - state.camera.position.x) * k
    state.camera.position.y += (0.4 + pointer.sy * 0.15 - state.camera.position.y) * k
    state.camera.lookAt(0, 0.15, 0)
  })
  return null
}
