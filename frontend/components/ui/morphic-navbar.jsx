// Kokonut UI — Morphic Navbar
import clsx from 'clsx'
import { useState } from 'react'

/**
 * Floating morphic pill nav — active item morphs into a rounded pill.
 * Adapted from Kokonut UI for Vite (no next/link).
 */
export function MorphicNavbar({
  items = {},
  defaultPath = '',
  className,
  onNavigate,
}) {
  const [activePath, setActivePath] = useState(defaultPath)

  const isActiveLink = (path) => {
    if (!path) return activePath === path
    return activePath === path
  }

  const handleClick = (event, path) => {
    event.preventDefault()
    setActivePath(path)
    onNavigate?.(path, event)
  }

  const entries = Object.entries(items)

  return (
    <nav className={clsx('mx-auto max-w-4xl', className)} aria-label='Primary'>
      <div className='flex items-center justify-center'>
        <div className='morphic-glass flex items-center justify-between overflow-hidden rounded-xl'>
          {entries.map(([path, { name }], index) => {
            const isActive = isActiveLink(path)
            const isFirst = index === 0
            const isLast = index === entries.length - 1
            const prevPath = index > 0 ? entries[index - 1][0] : null
            const nextPath =
              index < entries.length - 1 ? entries[index + 1][0] : null

            return (
              <a
                key={path}
                href={`#${path}`}
                onClick={(event) => handleClick(event, path)}
                className={clsx(
                  'flex items-center justify-center px-4 py-1.5 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60',
                  isActive
                    ? 'mx-1.5 rounded-xl bg-white/10 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(34,211,238,0.35)]'
                    : clsx(
                        'bg-transparent text-white/70 hover:text-white',
                        (isActiveLink(prevPath) || isFirst) && 'rounded-l-xl',
                        (isActiveLink(nextPath) || isLast) && 'rounded-r-xl'
                      )
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {name}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default MorphicNavbar
