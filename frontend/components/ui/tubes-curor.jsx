import { useEffect, useRef } from 'react'

const MODULE_URL = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'

function randomColors(count) {
  return new Array(count).fill(0).map(() => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'))
}

export default function TubesCursor({ showContent = true }) {
  const canvasRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    const initTimer = window.setTimeout(() => {
      import(/* @vite-ignore */ MODULE_URL)
        .then(({ default: createTubesCursor }) => {
          if (cancelled || !canvasRef.current) return
          appRef.current = createTubesCursor(canvasRef.current, {
            tubes: {
              colors: ['#5e72e4', '#8965e0', '#f5365c'],
              lights: { intensity: 200, colors: ['#21d4fd', '#b721ff', '#f4d03f', '#11cdef'] },
            },
          })
        })
        .catch((error) => console.error('Failed to load TubesCursor module:', error))
    }, 100)

    const changeColors = () => {
      const tubes = appRef.current?.tubes
      if (!tubes) return
      tubes.setColors(randomColors(3))
      tubes.setLightsColors(randomColors(4))
    }
    window.addEventListener('click', changeColors)

    return () => {
      cancelled = true
      window.clearTimeout(initTimer)
      window.removeEventListener('click', changeColors)
      if (typeof appRef.current?.dispose === 'function') appRef.current.dispose()
    }
  }, [])

  return (
    <div aria-hidden="true" className={'fixed inset-0 z-0 overflow-hidden bg-black ' + (showContent ? 'cursor-pointer' : 'pointer-events-none')}>
      <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" />
      {showContent && (
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2.5 font-['Montserrat',_sans-serif]">
          <h1 className="m-0 select-none p-0 text-[80px] font-bold uppercase leading-none text-white [text-shadow:0_0_20px_rgba(0,0,0,1)]">Tubes</h1>
          <h2 className="m-0 select-none p-0 text-[60px] font-medium uppercase leading-none text-white [text-shadow:0_0_20px_rgba(0,0,0,1)]">Cursor</h2>
          <p className="select-none text-xl leading-none text-white [text-shadow:0_0_20px_rgba(0,0,0,1)]">Click to change colors</p>
        </div>
      )}
    </div>
  )
}
