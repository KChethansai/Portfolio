import React, { forwardRef, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

function Globe({ rotationSpeed = 0.005, radius = 1 }) {
  const groupRef = useRef(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += rotationSpeed
    groupRef.current.rotation.x += rotationSpeed * 0.3
    groupRef.current.rotation.z += rotationSpeed * 0.1
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial color='#9cc8ff' transparent opacity={0.28} wireframe />
      </mesh>
      <mesh scale={1.02}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial color='#4d9cff' transparent opacity={0.08} wireframe />
      </mesh>
    </group>
  )
}

export const DotGlobeHero = forwardRef(function DotGlobeHero(
  { rotationSpeed = 0.005, globeRadius = 1, className = '', children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={'relative h-screen w-full overflow-hidden bg-[#02050c] ' + className} {...props}>
      <div className='relative z-10 flex h-full flex-col items-center justify-center'>
        {children}
      </div>
      <div className='pointer-events-none absolute inset-0 z-0'>
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 3.2]} fov={55} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Globe rotationSpeed={rotationSpeed} radius={globeRadius} />
        </Canvas>
      </div>
      <div className='pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,5,12,.2)_48%,rgba(2,5,12,.9)_100%)]' />
    </div>
  )
})

DotGlobeHero.displayName = 'DotGlobeHero'
