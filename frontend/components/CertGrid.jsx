import { useState } from 'react'
import { Grid } from './shell/vectors'
import { SectionHeading } from './fx/SectionTitle'
import { badges } from '@/lib/data'

function initials(label) {
  return label
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function CertGrid() {
  const [activeId, setActiveId] = useState(null)

  return (
    <section id="badges" className="w-full bg-black" onClick={() => setActiveId(null)}>
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeading accent="Proof" title="Badges" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 xl:grid-cols-3">
          {badges.map((badge) => {
            const isActive = activeId === badge.id
            return (
              <div
                key={badge.id}
                role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-label={`${badge.label} details`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveId(isActive ? null : badge.id)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      setActiveId(isActive ? null : badge.id)
                    } else if (e.key === 'Escape') {
                      setActiveId(null)
                    }
                  }}
                className="group relative cursor-pointer overflow-hidden rounded-lg border border-white/12 bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                    <div className="absolute inset-0" aria-hidden>
                      <Grid width="100%" height="100%" stroke="#2a2a2a" />
                    </div>
                    {badge.badge ? (
                      <img src={badge.badge} alt={badge.label} className="relative object-contain" loading="lazy" />
                    ) : (
                      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-musgo">
                        <span aria-hidden="true" className="font-bungee text-2xl text-default">{initials(badge.label)}</span>
                      </div>
                    )}
                    <div
                      className={`absolute inset-0 z-20 flex -translate-y-full flex-col items-center justify-center gap-3 bg-default p-6 text-center transition-transform duration-500 group-hover:translate-y-0 group-focus-within:translate-y-0 ${
                        isActive ? 'translate-y-0' : ''
                      }`}
                    >
                      <p className="font-sans text-lg font-bold uppercase tracking-tight text-black">{badge.label}</p>
                      {badge.url && (
                        <a
                          href={badge.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm font-semibold text-black underline underline-offset-4"
                        >
                          View credential ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-t border-white/10 px-4 py-3">
                    <p className="truncate font-sans text-sm font-bold text-white">{badge.label}</p>
                    <span className="shrink-0 font-sans text-xs text-default">{badge.sub}</span>
                  </div>
                </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
