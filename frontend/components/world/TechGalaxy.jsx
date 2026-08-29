import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { techOrbit, groupColors } from '@/lib/data'
import { world, starPointer } from './WorldState'

const RINGS = [
  { radius: 2.35, tilt: [0.42, 0, 0.1], speed: 0.08 },
  { radius: 3.05, tilt: [-0.3, 0, -0.16], speed: -0.055 },
  { radius: 3.7, tilt: [0.12, 0, 0.22], speed: 0.04 },
]

// Pre-build per-group shared materials to avoid per-node material creation
const groupMaterials = {}
for (const [group, color] of Object.entries(groupColors)) {
  groupMaterials[group] = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.2,
    transparent: true,
    fog: false,
    toneMapped: false,
    opacity: 0.6,
  })
}

const labelTextureCache = new Map()
function getLabelTexture(label) {
  if (labelTextureCache.has(label)) return labelTextureCache.get(label)
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  ctx.font = '500 26px "Inter", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(0,0,0,0.95)'
  ctx.shadowBlur = 8
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.fillText(label, 128, 34)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  labelTextureCache.set(label, texture)
  return texture
}

let haloTex = null
function haloTexture() {
  if (haloTex) return haloTex
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,0.35)')
  grad.addColorStop(0.4, 'rgba(255,255,255,0.08)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 64, 64)
  haloTex = new THREE.CanvasTexture(c)
  return haloTex
}

const haloMat = new THREE.SpriteMaterial({
  map: null, // set lazily
  transparent: true,
  opacity: 0.25,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
})
// Lazy init the map after haloTexture is available
setTimeout(() => { haloMat.map = haloTexture() }, 0)

export default function TechGalaxy({ reducedMotion = false }) {
  const group = useRef(null)
  const ringRefs = [useRef(null), useRef(null), useRef(null)]
  const nodeRefs = useRef({})
  const hoveredNode = useRef(null)
  const { camera, size } = useThree()
  const projV = useMemo(() => new THREE.Vector3(), [])

  const byRing = useMemo(() => {
    const buckets = [[], [], []]
    for (const tech of techOrbit) buckets[tech.ring].push(tech)
    return buckets
  }, [])

  const hoveredLabel = useRef(null)
  const setHover = (label, el, color) => {
    hoveredLabel.current = label
    hoveredNode.current = el
    if (label) {
      world.hoverColor = color
    } else {
      world.hoverLabel = null
    }
  }

  const cur = useMemo(() => ({ rx: 0, ry: 0, emphasis: 0 }), [])

  useFrame(({ clock }, dt) => {
    const g = group.current
    if (!g) return
    const t = clock.elapsedTime

    const narrowScale = world.aspect < 0.9 ? 0.35 : 1
    const targetScale = narrowScale * (1 + cur.emphasis * 0.1)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, 1 - Math.exp(-dt * 2)))
    g.position.y = THREE.MathUtils.lerp(g.position.y, cur.emphasis * 0.4, 1 - Math.exp(-dt * 2))

    const k = 1 - Math.exp(-dt * 2.5)
    cur.rx += (starPointer.y * -0.1 - cur.rx) * k
    cur.ry += (starPointer.x * 0.14 - cur.ry) * k
    g.rotation.x = cur.rx
    g.rotation.y = cur.ry

    const target = Math.max(
      0.4 * (1 - smoothstep(world.progress, 0.02, 0.12)),
      world.skillsFocus * 0.8,
      0.15 * world.contactFocus
    )
    cur.emphasis += (target - cur.emphasis) * (1 - Math.exp(-dt * 3))
    const e = cur.emphasis
    g.visible = e > 0.03

    // Ring rotation — only update visible rings
    for (let i = 0; i < 3; i++) {
      const r = ringRefs[i].current
      if (!r) continue
      if (!reducedMotion) {
        const spin = RINGS[i].speed * dt * (0.3 + e * 0.7)
        r.children.forEach((child) => {
          if (child.userData.angle !== undefined) {
            child.userData.angle += spin
            const radius = RINGS[i].radius
            child.position.set(
              Math.cos(child.userData.angle) * radius,
              0,
              Math.sin(child.userData.angle) * radius
            )
          }
        })
      }
      r.rotation.y = t * (reducedMotion ? 0 : RINGS[i].speed * 0.12)
    }

    // Node updates — batch by hover state
    for (const [label, n] of Object.entries(nodeRefs.current)) {
      if (!n) continue
      const isHovered = hoveredLabel.current === label
      const base = 0.7 + Math.sin(t * 1.2 + label.length) * 0.06
      const targetScale = (isHovered ? 1.5 : base * 0.6) * (0.4 + e * 0.5)
      n.scale.setScalar(THREE.MathUtils.lerp(n.scale.x, targetScale, k))
      // Update shared material opacity via per-node material clone on first hover,
      // otherwise batch update
      n.children[1].material.opacity = Math.min(0.8, 0.15 + e * 0.9)
      n.children[2].material.opacity = Math.min(0.3, e * 0.35) * (isHovered ? 2 : 1)
      n.children[3].material.opacity = Math.min(0.6, 0.1 + e * 0.7) * (isHovered ? 1.8 : 1)
    }

    if (hoveredNode.current) {
      projV.setFromMatrixPosition(hoveredNode.current.matrixWorld).project(camera)
      world.hoverLabel = hoveredLabel.current
      world.hoverX = ((projV.x + 1) / 2) * size.width
      world.hoverY = ((-projV.y + 1) / 2) * size.height - 46
    } else {
      world.hoverLabel = null
    }
  })

  return (
    <group ref={group}>
      {byRing.map((nodes, ri) => (
        <group key={ri} ref={ringRefs[ri]} rotation={RINGS[ri].tilt}>
          <mesh raycast={() => null} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[RINGS[ri].radius, 0.004, 4, 64]} />
            <meshBasicMaterial color='#67e8f9' transparent opacity={0.035} depthWrite={false} />
          </mesh>
          {nodes.map((tech) => (
            <TechNode
              key={tech.label}
              tech={tech}
              ring={RINGS[ri]}
              registerRef={(el) => {
                if (el) nodeRefs.current[tech.label] = el
              }}
              onOver={(el) => setHover(tech.label, el, groupColors[tech.group] ?? '#67e8f9')}
              onOut={() => setHover(null, null, '#67e8f9')}
            />
          ))}
        </group>
      ))}
    </group>
  )
}

function TechNode({ tech, ring, registerRef, onOver, onOut }) {
  const initial = useMemo(() => {
    const a = tech.angle
    return [Math.cos(a) * ring.radius, 0, Math.sin(a) * ring.radius]
  }, [tech.angle, ring.radius])

  const tex = useMemo(() => getLabelTexture(tech.label), [tech.label])
  const mat = groupMaterials[tech.group] || groupMaterials['Tools']

  return (
    <group
      ref={registerRef}
      position={initial}
      userData={{ angle: tech.angle }}
      onPointerOver={(e) => {
        e.stopPropagation()
        onOver(e.object.parent ?? e.object)
      }}
      onPointerOut={onOut}
    >
      <mesh>
        <sphereGeometry args={[0.22, 6, 6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh raycast={() => null}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <primitive object={mat} attach='material' />
      </mesh>
      <sprite scale={[0.28, 0.28, 1]} raycast={() => null}>
        <spriteMaterial
          map={haloTexture()}
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <sprite position={[0, 0.22, 0]} scale={[0.5, 0.125, 1]} raycast={() => null}>
        <spriteMaterial map={tex} transparent opacity={0.6} depthWrite={false} fog={false} />
      </sprite>
    </group>
  )
}

function smoothstep(x, edge0, edge1) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}
