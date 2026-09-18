import { useState } from 'react'
import { Grid } from './shell/vectors'
import { SectionHeading, useTitleRise, useHighlightWipe } from './fx/SectionTitle'
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
  useTitleRise('.cert-title', '#badges')
  useHighlightWipe('.cert-highlight')

  return (
    <section id="badges" className="my-30 w-full overflow-hidden bg-black" onClick={() => setActiveId(null)}>
      <div className="relative px-5 py-10 lg:py-40">
        <div className="mb-10 lg:mb-16">
          <SectionHeading
            accent="Proof"
            title="Badges"
            titleClass="cert-title text-5xl md:text-7xl"
            highlightClass="cert-highlight"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {badges.map((badge) => {
            const isActive = activeId === badge.id
            return (
              <div
                key={badge.id}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveId(isActive ? null : badge.id)
                }}
                className="group relative cursor-pointer overflow-hidden xl:even:translate-y-40"
              >
                <div className="relative z-10 overflow-hidden">
                  <Grid width="100%" height="100%" stroke="#222" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {badge.badge ? (
                    <img src={badge.badge} alt={badge.label} className="object-contain" loading="lazy" />
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-musgo">
                      <span className="font-bungee text-3xl text-default">{initials(badge.label)}</span>
                    </div>
                  )}
                </div>
                <div
                  className={`absolute inset-0 transition-all duration-500 format rounded-lg overflow-hidden z-20 h-0 group-hover:h-full ${
                    isActive ? 'h-full' : ''
                  }`}
                >
                  {badge.certificate ? (
                    <img src={badge.certificate} alt={badge.label} className="object-contain" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-default p-6 text-center">
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
                  )}
                </div>
                <div className="absolute bottom-0 right-0 z-30 p-2">
                  <p className="font-sans text-sm font-bold text-white 2xl:text-base">
                    {badge.label}
                    <strong className="ml-1 text-default">{badge.sub}</strong>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
