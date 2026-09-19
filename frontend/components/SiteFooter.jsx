import { profile } from '@/lib/data'

const pages = [
  { label: 'Intro', href: '#intro' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Badges', href: '#badges' },
]

function FooterLinks({ heading, links }) {
  return (
    <div className="w-fit">
      <h3 className="text-center font-sans text-xs font-semibold uppercase tracking-widest text-white/50">{heading}</h3>
      <ul className="mt-4 flex flex-col items-center justify-center gap-2">
        {links.map((item) => (
          <li
            key={item.label}
            className="font-sans text-2xl font-bold uppercase leading-none tracking-tighter md:text-4xl"
          >
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-white transition-colors duration-200 hover:text-default"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SiteFooter() {

  const follow = [
    { label: 'GitHub', href: profile.github },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Email', href: `mailto:${profile.email}` },
    { label: 'Resume', href: profile.resume },
  ]

  return (
    <footer id="contact" className="relative w-full bg-black px-4 pb-6 pt-24 md:px-5 md:pt-32">
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] px-6 py-20 md:py-28 [--mask-url:url(/svgs/image-bg.svg)] [-webkit-mask-image:var(--mask-url)] [mask-image:var(--mask-url)] [-webkit-mask-size:cover] [mask-size:cover] [-webkit-mask-position:center] [mask-position:center] [-webkit-mask-repeat:no-repeat] [mask-repeat:no-repeat]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 text-center md:gap-16">
          <div className="flex flex-col items-center">
            <p className="font-bungee text-sm uppercase tracking-widest text-default">Got a project?</p>
            <h2 className="mt-4 font-sans text-[clamp(2.5rem,7vw,6rem)] font-bold leading-none tracking-tighter text-white">
              Let&apos;s build.
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 rounded-full bg-default px-8 py-3.5 text-sm font-semibold text-black transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default"
            >
              {profile.email}
            </a>
          </div>

          <div className="grid w-full grid-cols-2 justify-items-center gap-10 md:flex md:justify-between">
            <FooterLinks heading="Pages" links={pages} />
            <FooterLinks heading="Follow on" links={follow} />
          </div>

          <p aria-hidden="true" className="truncate font-bungee text-[clamp(1.5rem,6vw,3rem)] uppercase text-white/10">{profile.name}</p>
        </div>
      </div>
      <p className="pt-6 text-center font-sans text-sm text-white/40">
        <strong>© 2026 {profile.name}</strong>. All rights reserved
      </p>
    </footer>
  )
}
