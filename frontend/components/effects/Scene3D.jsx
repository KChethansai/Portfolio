import { useEffect, useRef } from 'react'
import { useDeviceCapability, useReducedMotion } from '@/lib/performance'
import { pointerX, pointerY } from '@/lib/pointer'

function StaticFallback() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 78% 18%, rgba(210, 255, 0, 0.08), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255, 255, 255, 0.06), transparent 70%)',
        }}
      />
    </div>
  )
}

function CanvasScene({ targetRef }) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    let disposed = false
    let rafId = 0
    let renderer = null
    let envRT = null
    let scene = null
    let camera = null
    let mesh = null
    let observer = null
    const wrapper = wrapperRef.current
    if (!wrapper) return undefined

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
    let px = 0
    let py = 0
    // Scroll rect sampled every 8th frame — getBoundingClientRect() forces
    // sync layout, so never call it at 60fps.
    let tick = 0
    let cachedTop = null

    const applyScale = () => {
      if (!mesh) return
      mesh.scale.setScalar(Math.min(1, window.innerWidth / 1100) * 0.9)
    }

    const onResize = () => {
      if (!renderer || !camera) return
      const w = wrapper.clientWidth || window.innerWidth
      const h = wrapper.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      applyScale()
    }

    const frame = () => {
      rafId = 0
      if (disposed || !renderer || !scene || !camera || !mesh) return
      const t = performance.now()

      mesh.rotation.y += 0.0016
      mesh.rotation.x = Math.sin(t * 0.0004) * 0.15

      let progress = 0
      const target = targetRef?.current
      if (target) {
        if (tick++ % 8 === 0 || cachedTop === null) cachedTop = target.getBoundingClientRect().top
        progress = clamp(-cachedTop / window.innerHeight, -0.2, 1)
      }
      mesh.position.y = 0.15 + progress * 1.2
      mesh.rotation.z = progress * 0.3

      px += (pointerX.get() - px) * 0.04
      py += (pointerY.get() - py) * 0.04
      camera.position.x = px * 0.35
      camera.position.y = -py * 0.25
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(frame)
    }

    const start = () => {
      if (disposed || rafId !== 0) return
      rafId = requestAnimationFrame(frame)
    }
    const stop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    let cancelled = false
    ;(async () => {
      const THREE = await import('three')
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
      if (disposed || cancelled || !wrapperRef.current) return

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      const w = wrapper.clientWidth || window.innerWidth
      const h = wrapper.clientHeight || window.innerHeight
      renderer.setSize(w, h, false)
      renderer.domElement.className = 'absolute inset-0 h-full w-full'
      wrapper.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      scene.background = null

      camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
      camera.position.set(0, 0, 4)

      const pmrem = new THREE.PMREMGenerator(renderer)
      envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
      scene.environment = envRT.texture
      pmrem.dispose()

      const key = new THREE.DirectionalLight(0xffffff, 2.0)
      key.position.set(3, 4, 5)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0xd2ff00, 1.4)
      rim.position.set(-4, 2, -3)
      scene.add(rim)
      scene.add(new THREE.AmbientLight(0xffffff, 0.25))

      const geometry = new THREE.TorusKnotGeometry(1, 0.32, 180, 32)
      const material = new THREE.MeshStandardMaterial({
        color: 0x8f9299,
        metalness: 1.0,
        roughness: 0.28,
      })
      mesh = new THREE.Mesh(geometry, material)
      mesh.position.y = 0.15
      scene.add(mesh)
      applyScale()

      window.addEventListener('resize', onResize)
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) start()
          else stop()
        },
        { threshold: 0 },
      )
      observer.observe(wrapper)
      start()
    })()

    return () => {
      cancelled = true
      disposed = true
      stop()
      if (observer) observer.disconnect()
      window.removeEventListener('resize', onResize)
      if (scene) {
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
            mats.forEach((m) => m.dispose())
          }
        })
      }
      if (envRT) envRT.dispose()
      if (renderer) {
        renderer.dispose()
        renderer.domElement.remove()
      }
      scene = null
      camera = null
      mesh = null
      renderer = null
      envRT = null
      observer = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={wrapperRef} aria-hidden className="pointer-events-none absolute inset-0">
    </div>
  )
}

export default function Scene3D({ targetRef }) {
  const reduced = useReducedMotion()
  const tier = useDeviceCapability()
  if (reduced || tier === 'low') return <StaticFallback />
  return <CanvasScene targetRef={targetRef} />
}
