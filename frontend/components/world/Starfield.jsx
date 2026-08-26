import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { starPointer } from './WorldState'

// Lightweight starfield using Three.js Points.
// ~200 points, one draw call, vertex-shader twinkle only.
// Replaces the previous full-screen fragment shader that caused GPU saturation.
const STAR_COUNT = 180

export default function Starfield() {
  const ref = useRef()
  const matRef = useRef()

  const [positions, sizes, phases] = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3)
    const sz = new Float32Array(STAR_COUNT)
    const ph = new Float32Array(STAR_COUNT)
    for (let i = 0; i < STAR_COUNT; i++) {
      // Spread stars across a wide backdrop behind the scene
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = -8 - Math.random() * 18
      sz[i] = 0.4 + Math.random() * 1.2
      ph[i] = Math.random() * Math.PI * 2
    }
    return [pos, sz, ph]
  }, [])

  const vertexShader = useMemo(
    () => `
    attribute float aSize;
    attribute float aPhase;
    uniform float uTime;
    uniform float uParallaxX;
    uniform float uParallaxY;
    varying float vBrightness;
    void main() {
      vec3 p = position;
      // Subtle parallax toward pointer
      p.x += uParallaxX * 1.5;
      p.y += uParallaxY * 1.0;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aSize * (200.0 / -mv.z);
      // Gentle twinkle — vertex shader only, no per-pixel cost
      float twinkle = sin(uTime * 0.6 + aPhase) * 0.3 + 0.7;
      vBrightness = twinkle;
    }
  `,
    []
  )

  const fragmentShader = useMemo(
    () => `
    varying float vBrightness;
    void main() {
      // Soft circular point
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      float alpha = smoothstep(0.5, 0.1, d) * vBrightness * 0.35;
      gl_FragColor = vec4(0.75, 0.82, 0.95, alpha);
    }
  `,
    []
  )

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime
      matRef.current.uniforms.uParallaxX.value = starPointer.x * 0.5
      matRef.current.uniforms.uParallaxY.value = starPointer.y * 0.3
    }
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uParallaxX: { value: 0 },
      uParallaxY: { value: 0 },
    }),
    []
  )

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach='attributes-aSize'
          count={STAR_COUNT}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach='attributes-aPhase'
          count={STAR_COUNT}
          array={phases}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        transparent
        toneMapped={false}
      />
    </points>
  )
}
