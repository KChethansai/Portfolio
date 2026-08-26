import { Mail, FileText, ArrowUp, ArrowUpRight } from 'lucide-react'
import { Reveal, Magnetic } from './motion/primitives'
import { profile } from '@/lib/data'

function GithubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
      <path fillRule='evenodd' clipRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
    </svg>
  )
}

function LinkedinIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
    </svg>
  )
}

const linkClass =
  'group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/50'

export default function SiteFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const links = [
    { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
    { label: 'GitHub', href: profile.github, icon: GithubIcon },
    { label: 'LinkedIn', href: profile.linkedin, icon: LinkedinIcon },
    { label: 'Resume', href: profile.resume, icon: FileText },
  ]

  return (
    <footer className='relative overflow-hidden px-6 pb-16 pt-28 md:pt-36'>
      <div className='relative z-10 mx-auto max-w-[1400px]'>
        <Reveal>
          <p className='section-label text-center'>End of transmission</p>
          <h2 className='mt-6 text-center text-[clamp(2.4rem,7vw,6rem)] font-black leading-[0.92] tracking-[-0.03em] text-white [text-wrap:balance]'>
            Let's build
            <br />
            <span className='accent-text'>something.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className='mt-10 flex justify-center'>
            <Magnetic strength={0.3}>
              <a
                href={`mailto:${profile.email}`}
                className='rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
              >
                Start a conversation
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className='mt-20 flex flex-col items-start justify-between gap-8 border-t border-white/[0.06] pt-10 lg:flex-row lg:items-center'>
            <div className='max-w-md'>
              <div className='inline-flex items-center gap-2 text-[11px] font-medium text-emerald-400/70'>
                <span className='relative flex h-1.5 w-1.5'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50' />
                  <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500' />
                </span>
                Available for opportunities
              </div>
              <h3 className='mt-3 text-base font-semibold tracking-tight text-white'>{profile.name}</h3>
              <p className='mt-1 text-[13px] leading-relaxed text-[var(--color-ink-muted)]'>{profile.tagline}</p>
            </div>

            <div className='flex flex-wrap items-center gap-6'>
              {links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
                  rel='noopener noreferrer'
                  className={linkClass}
                >
                  <Icon className='h-4 w-4 opacity-60' />
                  <span>{label}</span>
                  <ArrowUpRight className='h-3 w-3 opacity-30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-60' />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div className='mt-10 flex flex-col items-center justify-between gap-4 text-[12px] text-[var(--color-ink-faint)] sm:flex-row'>
          <p>© 2026 {profile.name}</p>
          <button
            onClick={scrollToTop}
            className='group inline-flex items-center gap-1.5 text-[12px] text-[var(--color-ink-muted)] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/50'
          >
            <span>Back to top</span>
            <ArrowUp className='h-3 w-3 transition-transform group-hover:-translate-y-0.5' />
          </button>
        </div>
      </div>
    </footer>
  )
}
