import Marquee from './fx/Marquee'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { profile, skillGroups } from '@/lib/data'

const pages = [
  { label: 'Intro', href: '#intro' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Badges', href: '#badges' },
]

function FooterLinks({ heading, links }) {
  return (
    <div className="w-fit">
      <h3 className="text-center font-sans text-xs font-semibold uppercase text-white">{heading}</h3>
      <ul className="mt-3 flex flex-col items-center justify-center">
        {links.map((item) => (
          <li
            key={item.label}
            className="menu-item relative overflow-hidden font-sans text-xl font-bold uppercase leading-[.94] tracking-tighter text-white md:text-2xl lg:text-4xl xl:text-6xl"
          >
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="menu-link relative block"
            >
              <span className="menu-text block text-white">{item.label}</span>
              <span className="menu-text absolute left-0 top-full block text-default" aria-hidden="true">{item.label}</span>
              <span className="menu-bg absolute left-0 top-0 z-0 h-full w-full -translate-x-full bg-default" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SiteFooter() {
  const words = skillGroups.flatMap((g) => g.items)

  useGSAP(() => {
    const footer = document.querySelector('.footer-root')
    if (!footer) return
    const menuBgs = gsap.utils.toArray('.footer-root .menu-item .menu-bg')
    gsap.set(menuBgs, { xPercent: -100 })
    const tl = gsap.timeline({ paused: true })
    menuBgs.forEach((bg, index) => {
      tl.to(bg, { xPercent: 100, duration: 0.8, ease: 'power2.out' }, index * 0.05)
    })
    tl.to(menuBgs, { xPercent: -100, duration: 0.8, ease: 'power2.in', delay: 0.4 })
    const st = ScrollTrigger.create({
      trigger: footer,
      start: 'top 80%',
      toggleActions: 'restart none restart none',
      animation: tl,
    })
    return () => {
      tl.kill()
      st.kill()
    }
  }, [])

  const follow = [
    { label: 'GitHub', href: profile.github },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Email', href: `mailto:${profile.email}` },
    { label: 'Resume', href: profile.resume },
  ]

  return (
    <footer id="contact" className="footer-root relative w-full bg-default px-4 pb-6 pt-4 md:px-5">
      <div className="relative overflow-hidden rounded-lg bg-black px-6 py-20 md:py-28 [--mask-url:url(/svgs/image-bg.svg)] [-webkit-mask-image:var(--mask-url)] [mask-image:var(--mask-url)] [-webkit-mask-size:cover] [mask-size:cover] [-webkit-mask-position:center] [mask-position:center] [-webkit-mask-repeat:no-repeat] [mask-repeat:no-repeat]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 text-center md:gap-14">
          <div className="w-full">
            <Marquee rowClassName="flex items-center gap-12 pr-12 md:gap-16 md:pr-16">
              {words.map((w) => (
                <span key={w} className="whitespace-nowrap font-bungee text-xl uppercase text-default md:text-3xl">
                  {w}
                </span>
              ))}
            </Marquee>
          </div>

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
      <p className="pt-4 text-center font-sans text-sm text-black">
        <strong>© 2026 {profile.name}</strong>. All rights reserved
      </p>
    </footer>
  )
}
