import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { world, starPointer } from './WorldState'

// Robot — atmospheric visual anchor, not the hero.
// Dark polished machine lit by the environment, not glowing at the user.
export default function Robot({ reducedMotion = false }) {
  const root = useRef(null)
  const bob = useRef(null)
  const head = useRef(null)
  const ring = useRef(null)
  const armL = useRef(null)
  const armR = useRef(null)
  const core = useRef(null)

  const cur = useMemo(
    () => ({ x: 2.0, y: 0, s: 1, lookX: 0, lookY: 0, glow: 1 }),
    []
  )

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime
    const p = world.progress
    const g = root.current
    if (!g) return

    const heroWeight = 1 - smoothstep(p, 0.04, 0.22)
    const returnWeight = smoothstep(p, 0.82, 0.97)
    const present = Math.max(heroWeight, returnWeight)

    const narrow = world.aspect < 0.9
    const heroY = narrow ? 2.0 : -0.15
    const heroS = narrow ? 0.52 : 1
    const retY = -2.6
    const retS = 0.72
    const targetX = narrow ? 0 : 2.05 * heroWeight
    const targetY = heroY * heroWeight + retY * returnWeight + (1 - present) * -4.5
    const targetScale = heroS * heroWeight + retS * returnWeight
    const targetGlow = 0.25 + 0.5 * present

    const k = 1 - Math.exp(-dt * 3.2)
    cur.x += (targetX - cur.x) * k
    cur.y += (targetY - cur.y) * k
    cur.s += (targetScale - cur.s) * k
    cur.glow += (targetGlow - cur.glow) * k

    g.position.set(cur.x, cur.y, 0)
    g.scale.setScalar(Math.max(cur.s, 0.0001))
    g.visible = cur.s > 0.02

    const t2 = reducedMotion ? 0 : t
    if (bob.current) {
      bob.current.position.y = Math.sin(t2 * 0.9) * 0.04
      bob.current.rotation.z = Math.sin(t2 * 0.6) * 0.015
    }
    if (ring.current) {
      ring.current.rotation.z = t2 * 0.18
      ring.current.rotation.x = Math.PI / 2.4 + Math.sin(t2 * 0.3) * 0.06
    }
    if (armL.current) armL.current.position.y = Math.sin(t2 * 1.1 + 1) * 0.035
    if (armR.current) armR.current.position.y = Math.sin(t2 * 1.1 + 2.4) * 0.035

    if (head.current) {
      const lx = !reducedMotion && starPointer.active ? starPointer.x : 0
      const ly = !reducedMotion && starPointer.active ? starPointer.y : 0
      cur.lookX += (lx - cur.lookX) * (1 - Math.exp(-dt * 3.5))
      cur.lookY += (ly - cur.lookY) * (1 - Math.exp(-dt * 3.5))
      head.current.rotation.y = cur.lookX * 0.35
      head.current.rotation.x = -cur.lookY * 0.22
    }

    if (core.current) {
      const m = core.current.material
      m.emissiveIntensity = cur.glow * (reducedMotion ? 1.2 : 1.0 + Math.sin(t * 1.8) * 0.3)
    }
  })

  // Darker, more restrained materials — lit by environment, not self-luminous.
  const bodyMat = (
    <meshStandardMaterial color="#2a3040" metalness={0.35} roughness={0.5} />
  )
  const darkMat = (
    <meshStandardMaterial color="#1a2030" metalness={0.4} roughness={0.45} />
  )

  return (
    <group ref={root}>
      <pointLight color="#22d3ee" intensity={1.2} distance={6} decay={2} position={[0, 0.4, 1.6]} />
      <group ref={bob}>
        {/* stabilizer ring — very subtle */}
        <mesh ref={ring} raycast={() => null}>
          <torusGeometry args={[1.18, 0.012, 8, 96]} />
          <meshStandardMaterial
            color="#0a1018"
            emissive="#22d3ee"
            emissiveIntensity={0.5}
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>

        {/* head */}
        <group ref={head} position={[0, 0.98, 0]}>
          <mesh>
            <capsuleGeometry args={[0.46, 0.34, 8, 24]} />
            {bodyMat}
          </mesh>
          {/* eyes — restrained glow */}
          <mesh position={[0.15, 0.06, 0.4]} rotation={[0, 0, 0.14]} raycast={() => null}>
            <capsuleGeometry args={[0.055, 0.14, 6, 12]} />
            <meshStandardMaterial
              color='#020a10'
              emissive='#22d3ee'
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[-0.15, 0.06, 0.4]} rotation={[0, 0, -0.14]} raycast={() => null}>
            <capsuleGeometry args={[0.055, 0.14, 6, 12]} />
            <meshStandardMaterial
              color='#020a10'
              emissive='#22d3ee'
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>
          {/* ears */}
          <mesh position={[0.47, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.1, 16]} />
            {darkMat}
          </mesh>
          <mesh position={[-0.47, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.1, 16]} />
            {darkMat}
          </mesh>
          {/* antenna */}
          <mesh position={[0, 0.62, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.26, 8]} />
            {darkMat}
          </mesh>
          <mesh position={[0, 0.78, 0]} raycast={() => null}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#1a3040" emissive="#22d3ee" emissiveIntensity={0.8} toneMapped={false} />
          </mesh>
        </group>

        {/* torso */}
        <mesh position={[0, 0.05, 0]}>
          <capsuleGeometry args={[0.4, 0.42, 8, 24]} />
          {bodyMat}
        </mesh>
        {/* chest core — dim pulse */}
        <mesh ref={core} position={[0, 0.14, 0.38]} rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
          <cylinderGeometry args={[0.11, 0.11, 0.05, 24]} />
          <meshStandardMaterial color="#010a10" emissive="#22d3ee" emissiveIntensity={1.0} toneMapped={false} />
        </mesh>

        {/* floating arms */}
        <mesh ref={armL} position={[0.72, 0.12, 0]} rotation={[0, 0, -0.16]}>
          <capsuleGeometry args={[0.11, 0.42, 6, 16]} />
          {darkMat}
        </mesh>
        <mesh ref={armR} position={[-0.72, 0.12, 0]} rotation={[0, 0, 0.16]}>
          <capsuleGeometry args={[0.11, 0.42, 6, 16]} />
          {darkMat}
        </mesh>

        {/* hover fins */}
        <mesh position={[0.24, -0.52, 0]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.09, 0.3, 6, 12]} />
          {darkMat}
        </mesh>
        <mesh position={[-0.24, -0.52, 0]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.09, 0.3, 6, 12]} />
          {darkMat}
        </mesh>
      </group>
    </group>
  )
}

function smoothstep(x, edge0, edge1) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}
