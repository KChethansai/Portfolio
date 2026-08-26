import { Suspense, lazy, useCallback, useState } from 'react'
import Preloader from '../components/Preloader'
import Home from '../components/Home'

// Three.js + the whole world are a separate chunk — first paint never waits
// for WebGL code. The preloader gates on its real readiness instead.
const WorldCanvas = lazy(() => import('../components/world/WorldCanvas'))

// Single-page app. The world canvas mounts once and stays.
export default function App() {
  const [worldReady, setWorldReady] = useState(false)
  const [booted, setBooted] = useState(false)
  const onWorldReady = useCallback(() => setWorldReady(true), [])
  const onBootDone = useCallback(() => setBooted(true), [])

  return (
    <>
      <Suspense fallback={null}>
        <WorldCanvas onReady={onWorldReady} />
      </Suspense>
      {!booted && <Preloader ready={worldReady} onDone={onBootDone} />}
      <div className={booted ? '' : 'opacity-0'} aria-hidden={!booted}>
        <Home />
      </div>
    </>
  )
}
