import { useEffect, useRef } from 'react'

const VIEWER_SRC = 'https://unpkg.com/@splinetool/viewer@2.0.5/build/spline-viewer.js'

// Interactive 3D scene player built on the official viewer web component,
// loaded from CDN. The viewer's attribution badge is hidden below.
export function SplineScene({ scene, className }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!customElements.get('spline-viewer') && !document.querySelector(`script[src="${VIEWER_SRC}"]`)) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = VIEWER_SRC
      document.head.appendChild(script)
    }

    // Hide the viewer badge — it lives inside the shadow root, which only
    // exists after the viewer script upgrades the element (can take a while
    // on slow connections), so poll until it appears, then inject a
    // stylesheet (survives re-renders) and watch for changes.
    const el = ref.current
    const hide = (root) =>
      root.querySelectorAll('a[href*="spline.design"], .logo, #logo').forEach((n) => {
        n.style.display = 'none'
      })
    let observer
    let poll
    let tries = 0
    poll = setInterval(() => {
      const shadow = el?.shadowRoot
      if (!shadow) {
        if (tries++ > 360) clearInterval(poll)
        return
      }
      const style = document.createElement('style')
      style.textContent =
        '#logo, .logo, a[href*="spline.design"] { display: none !important; }'
      shadow.appendChild(style)
      hide(shadow)
      observer = new MutationObserver(() => hide(shadow))
      observer.observe(shadow, { childList: true, subtree: true })
      clearInterval(poll)
    }, 500)
    return () => {
      clearInterval(poll)
      observer?.disconnect()
    }
  }, [])

  return (
    <div className={className}>
      <spline-viewer
        ref={ref}
        url={scene}
        loading-anim-type='none'
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
