import { useEffect, useMemo, useState, useRef } from 'react'
import {
  Cloud,
  fetchSimpleIcons,
  renderSimpleIcon,
} from 'react-icon-cloud'

// Magic UI — Icon Cloud (react-icon-cloud)
export const cloudProps = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingTop: 0,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 1,
    activeCursor: 'default',
    tooltip: 'native',
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: '#0000',
    maxSpeed: 0.025,
    minSpeed: 0.01,
  },
}

function renderCustomIcon(icon) {
  return renderSimpleIcon({
    icon,
    bgHex: '#05050a',
    fallbackHex: '#ffffff',
    minContrastRatio: 2,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  })
}

export function IconCloud({ iconSlugs }) {
  const [data, setData] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin: '200px' }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
  }, [iconSlugs])

  const renderedIcons = useMemo(() => {
    if (!data) return null
    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon))
  }, [data])

  if (reducedMotion || !isInView) {
    return (
      <div ref={containerRef} className='flex h-full w-full flex-wrap items-center justify-center gap-3 p-6'>
        {(iconSlugs || []).slice(0, 12).map((slug) => (
          <span
            key={slug}
            className='rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70'
          >
            {slug}
          </span>
        ))}
      </div>
    )
  }

  return (
    // react-icon-cloud Cloud children typing
    <div ref={containerRef} className="h-full w-full flex items-center justify-center">
      <Cloud {...cloudProps}>{renderedIcons}</Cloud>
    </div>
  )
}

export default IconCloud
