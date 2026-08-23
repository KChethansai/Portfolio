import { useEffect, useMemo, useState } from 'react'
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
    imageScale: 2,
    activeCursor: 'default',
    tooltip: 'native',
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: '#0000',
    maxSpeed: 0.04,
    minSpeed: 0.02,
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

  if (reducedMotion) {
    return (
      <div className='flex h-full w-full flex-wrap items-center justify-center gap-3 p-6'>
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
    <Cloud {...cloudProps}>{renderedIcons}</Cloud>
  )
}

export default IconCloud
