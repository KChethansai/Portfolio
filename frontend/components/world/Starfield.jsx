import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { starPointer } from './WorldState'

// Starfield — atmospheric backdrop, barely perceptible.
// Dark blue, muted, low density. Noticeable subconsciously before consciously.
const frag = /* glsl */ `
precision mediump float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uMouseActive;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;

varying vec2 vUv;

#define NUM_LAYER 2.0
#define STAR_COLOR_CUTOFF 0.2
#define PERIOD 3.0

vec3 Hash23(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(123.34, 456.21, 234.56));
  q += dot(q, q + 45.32);
  return fract((q.xxy + q.yzz) * q.zyx);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.035 * uGlowIntensity) / (d + 0.003);
  float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 600.0));
  m += rays * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.3, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + offset;
      vec3 rnd = Hash23(si);
      float seed = rnd.x;
      float size = rnd.y;
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.85, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, rnd.z) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, rnd.y) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);

      float hue = atan(base.g - base.r, base.b - base.r) * 0.1591549 + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed * 0.1), tris(seed * 38.0 + uTime * uSpeed * 0.0333)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;

      col += star * size * base;
    }
  }
  return col;
}

void main() {
  vec2 focalPx = vec2(0.5, 0.5) * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  uv += uMouse * 0.08 * uMouseActive;

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;
  uv = mat2(1.0, 0.0, 0.0, 1.0) * uv;

  vec3 col = vec3(0.0);
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(18.0 * uDensity, 0.4 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  gl_FragColor = vec4(col, 1.0);
}
`

const vert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export default function Starfield({ quality = 1 }) {
  const { size, gl } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector3(1, 1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseActive: { value: 0 },
      uStarSpeed: { value: 0 },
      uDensity: { value: 0.45 * quality },
      uHueShift: { value: 210 },
      uSpeed: { value: 0.8 },
      uGlowIntensity: { value: 0.15 },
      uSaturation: { value: 0.25 },
      uTwinkleIntensity: { value: 0.15 },
      uRotationSpeed: { value: 0.06 },
    }),
    [quality]
  )

  useFrame(({ clock }) => {
    const u = uniforms
    const t = clock.elapsedTime
    u.uTime.value = t
    u.uStarSpeed.value = (t * 0.4) / 10.0
    u.uMouse.value.set(starPointer.x * 0.5 + 0.5, starPointer.y * 0.5 + 0.5)
    u.uMouseActive.value = starPointer.active
    const dpr = gl.getPixelRatio()
    u.uResolution.value.set(size.width * dpr, size.height * dpr, (size.width / size.height) * dpr)
  })

  return (
    <mesh position={[0, 0, -14]} renderOrder={-10} frustumCulled={false}>
      <planeGeometry args={[90, 50]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}
