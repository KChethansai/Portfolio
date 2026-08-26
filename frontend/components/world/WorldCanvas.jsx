import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Starfield from './Starfield'
import { world, starPointer } from './WorldState'
import Robot from './Robot'
import TechGalaxy from './TechGalaxy'
import { pointer, useSmoothPointer, dampPointer } from '@/lib/pointer'
import { useDeviceCapability, useReducedMotion } from '@/lib/performance'

function useWorldScroll() {
  useEffect(() => {
    let ticking = false
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
        const el = document.getElementById(id)
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

  const dpr = useMemo(() => [1, tier === 'low' ? 1 : 1.5], [tier])
  const quality = tier === 'low' ? 0.55 : tier === 'mid' ? 0.8 : 1
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
        }}
        onCreated={({ gl, scene, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 0.9
          gl.setClearColor('#050608', 1)
          window.__scene = scene
          window.__camera = camera
          onReady?.()
        }}
      >
        <fog attach='fog' args={['#05060a', 10, 28]} />
        <ambientLight intensity={0.6} />
        <hemisphereLight args={['#b0c4de', '#0a0818', 0.5]} />
        <directionalLight position={[4, 5, 6]} intensity={0.9} color='#c8d8e8' />
        <directionalLight position={[-5, -2, -4]} intensity={0.3} color='#6b5ce0' />
        <Suspense fallback={null}>
          <WorldRig reducedMotion={reducedMotion} />
          <Starfield quality={quality} />
          <Robot reducedMotion={reducedMotion} quality={quality} />
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
    state.camera.position.x += (pointer.sx * 0.3 - state.camera.position.x) * k
    state.camera.position.y += (0.4 + pointer.sy * 0.18 - state.camera.position.y) * k
    state.camera.lookAt(0, 0.15, 0)
  })
  return null
}
