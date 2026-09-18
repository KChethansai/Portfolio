import { lazy, Suspense, useState } from 'react'
import { useReducedMotion } from '@/lib/performance'

const Header = lazy(() => import('./shell/Header'))
const Menu = lazy(() => import('./shell/Menu'))
const HeroSection = lazy(() => import('./HeroSection'))
const StatsSection = lazy(() => import('./StatsSection'))
const ExperienceSection = lazy(() => import('./ExperienceSection'))
const ProjectsTable = lazy(() => import('./ProjectsTable'))
const SkillsMarquee = lazy(() => import('./SkillsMarquee'))
const CertGrid = lazy(() => import('./CertGrid'))
const SiteFooter = lazy(() => import('./SiteFooter'))

export default function Home() {
  const [open, setOpen] = useState(false)
  useReducedMotion()

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <Suspense fallback={null}>
        <Header open={open} onToggle={() => setOpen((v) => !v)} />
      </Suspense>
      <Suspense fallback={null}>
        <Menu open={open} onClose={() => setOpen(false)} />
      </Suspense>

      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={null}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={null}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectsTable />
      </Suspense>
      <Suspense fallback={null}>
        <SkillsMarquee />
      </Suspense>
      <Suspense fallback={null}>
        <CertGrid />
      </Suspense>
      <Suspense fallback={null}>
        <SiteFooter />
      </Suspense>
    </div>
  )
}
