import Marquee from './fx/Marquee'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { profile, skillGroups } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const pages = [
  { label: 'Intro', href: '#intro' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Badges', href: '#badges' },
]

function FooterLinks({ heading, links }) {
  return (
    <div className="w-fit">
      <h6 className="text-center font-sans text-xs font-semibold uppercase text-white">{heading}</h6>
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
              <span className="menu-text absolute left-0 top-full block text-default">{item.label}</span>
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
    <footer id="contact" className="footer-root relative w-full bg-default p-5 pb-20 md:pt-50 2xl:pb-5 xl:pt-70">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div
          className="relative w-full overflow-hidden rounded-lg bg-black
          aspect-[1688/3480] md:aspect-[1688/2466] lg:aspect-[1688/1620] xl:aspect-[1688/1400] 2xl:aspect-[1688/896]
          [--mask-url:url(/svgs/image-bg.svg)]
          [-webkit-mask-image:var(--mask-url)]
          [mask-image:var(--mask-url)]
          [-webkit-mask-size:cover]
          [mask-size:cover]
          [-webkit-mask-repeat:no-repeat]
          [mask-repeat:no-repeat]
          [-webkit-mask-position:center]
          [mask-position:center]
        "
        >
          <div className="absolute top-4 w-full md:top-16 lg:bottom-16 lg:top-auto">
            <Marquee rowClassName="flex items-center gap-12 md:gap-16 2xl:gap-20 pr-20">
              {words.map((w) => (
                <span
                  key={w}
                  className="whitespace-nowrap font-bungee text-2xl uppercase text-default md:text-4xl"
                >
                  {w}
                </span>
              ))}
            </Marquee>
          </div>

          <div className="absolute inset-x-0 top-[30%] flex flex-col items-center px-6 text-center md:top-[35%]">
            <p className="font-bungee text-sm uppercase tracking-widest text-default">Got a project?</p>
            <h2 className="mt-4 font-sans text-4xl font-bold leading-none tracking-tighter text-white md:text-7xl lg:text-8xl">
              Let&apos;s build.
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 rounded-full bg-default px-8 py-3.5 text-sm font-semibold text-black transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default"
            >
              {profile.email}
            </a>
          </div>

          <div className="absolute top-[15%] left-10 w-fit md:left-[5%] md:top-[60%] md:-translate-y-[60%] xl:left-[7%] 2xl:left-[10%]">
            <FooterLinks heading="Pages" links={pages} />
          </div>
          <div className="absolute top-[15%] right-10 w-fit md:right-[5%] md:top-[60%] md:-translate-y-[60%] xl:right-[7%] 2xl:right-[10%]">
            <FooterLinks heading="Follow on" links={follow} />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-bungee text-2xl uppercase text-white/10 md:text-4xl">
            {profile.name}
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 w-full -translate-x-1/2 md:bottom-5 md:left-5 md:w-fit md:translate-x-0">
        <p className="text-center font-sans text-sm text-black">
          <strong>© 2026 {profile.name}</strong>. All rights reserved
        </p>
      </div>
    </footer>
  )
}
