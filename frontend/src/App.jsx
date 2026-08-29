import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Preloader from '../components/Preloader'
import Home from '../components/Home'

// Three.js + the whole world are a separate chunk — first paint never waits
// for WebGL code. The preloader gates on its real readiness instead.
const WorldCanvas = lazy(() => import('../components/world/WorldCanvas'))

// The loader is an intro, not a tax — one play per tab session. Refreshing
// mid-boot still counts as seen, so it never replays on the same session.
function seenLoader() {
  if (typeof window === 'undefined') return false
  try {
    return window.sessionStorage.getItem('pl_seen') === '1'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem('pl_seen', '1')
  } catch {
    /* storage unavailable — loader just replays */
  }
}

export default function App() {
  const [seen] = useState(seenLoader)
  const [worldReady, setWorldReady] = useState(false)
  const [exiting, setExiting] = useState(seen)

  useEffect(() => {
    if (!seen) markSeen()
  }, [seen])

  const onWorldReady = useCallback(() => setWorldReady(true), [])
  const onExitStart = useCallback(() => setExiting(true), [])

  return (
    <>
      <Suspense fallback={null}>
        <WorldCanvas onReady={onWorldReady} />
      </Suspense>

      {/* Exit continuity: the preloader's curtain lift is the page's entrance.
          Home mounts only when the lift starts, so the hero rises underneath it. */}
      <AnimatePresence>{!exiting && <Preloader ready={worldReady} onExitStart={onExitStart} />}</AnimatePresence>
      {exiting && <Home />}
    </>
  )
}