import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Preloader from '../components/shell/Preloader'
import Home from '../components/Home'

// The loader is an intro, not a tax — one play per session. Refreshing
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
  const [exiting, setExiting] = useState(seen)

  useEffect(() => {
    if (!seen) markSeen()
  }, [seen])

  // Fires when the curtain lift starts — Home mounts underneath it.
  const onExitStart = useCallback(() => setExiting(true), [])

  return (
    <>
      <AnimatePresence>{!exiting && <Preloader onDone={onExitStart} />}</AnimatePresence>
      {exiting && <Home />}
    </>
  )
}
