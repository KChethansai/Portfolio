import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { gsap, useGSAP } from '@/lib/gsap'
import { profile } from '@/lib/data'
import { useReducedMotion } from '@/lib/performance'
import { Hatch } from './vectors'

const LINKS = [
  { label: 'About', href: '#intro' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Badges', href: '#badges' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'Resume', href: profile.resume },
]

const isExternal = (href) => /^https?:\/\//.test(href)

export default function Menu({ open, onClose }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  // Escape closes + returns focus to the menu button. Parallax/hover
  // timelines are decorative — skipped under reduced motion (CSS transition
  // still opens/closes the panel).
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
        document.querySelector('[aria-controls="site-menu"]')?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useGSAP(
    () => {
      if (reduced) return
      const menu = rootRef.current
      if (!menu) return
      const leftGallery = menu.querySelector('.menu-left-gallery')
      const rightGallery = menu.querySelector('.menu-right-gallery')
      if (!menu || !leftGallery || !rightGallery) return
      const moveAmount = 100
      const clampRange = 1
      const duration = 1.2
      const ease = 'power2.out'
      const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
      const handleMouseMove = (e) => {
        const rect = menu.getBoundingClientRect()
        const mouseY = e.clientY - rect.top
        const normalizedY = ((mouseY / rect.height - 0.5) * 2)
        const clampedY = clamp(normalizedY, -clampRange, clampRange)
        gsap.to(leftGallery, { y: -clampedY * moveAmount, duration, ease, overwrite: 'auto' })
        gsap.to(rightGallery, { y: clampedY * moveAmount, duration, ease, overwrite: 'auto' })
      }
      const handleMouseLeave = () => {
        gsap.to([leftGallery, rightGallery], { y: 0, duration: 0.8, ease: 'power3.out' })
      }
      menu.addEventListener('mousemove', handleMouseMove)
      menu.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        menu.removeEventListener('mousemove', handleMouseMove)
        menu.removeEventListener('mouseleave', handleMouseLeave)
      }
    },
    { scope: rootRef },
  )

  useGSAP(
    () => {
      if (!open || reduced) return
      const menuBgs = gsap.utils.toArray('.menu-item .menu-bg', rootRef.current)
      const tl = gsap.timeline()
      menuBgs.forEach((bg, index) => {
        tl.fromTo(
          bg,
          { xPercent: -100 },
          { xPercent: 100, duration: 0.8, ease: 'power2.out', delay: index * 0.05 },
          0,
        )
      })
      tl.to(menuBgs, { xPercent: -100, duration: 0.8, ease: 'power2.in', delay: 0.5 })
    },
    { dependencies: [open], scope: rootRef },
  )

  useGSAP(
    () => {
      if (reduced) return
      const menuItems = gsap.utils.toArray('.menu-item .menu-link', rootRef.current)
      const cleanups = menuItems.map((link) => {
        const tl = gsap.timeline({ paused: true })
        tl.to(link, { yPercent: -100, duration: 0.35, ease: 'power2.out' })
        const play = () => tl.play()
        const reverse = () => tl.reverse()
        link.addEventListener('mouseenter', play)
        link.addEventListener('mouseleave', reverse)
        return () => {
          link.removeEventListener('mouseenter', play)
          link.removeEventListener('mouseleave', reverse)
          tl.kill()
        }
      })
      return () => cleanups.forEach((fn) => fn())
    },
    { scope: rootRef },
  )

  useGSAP(
    () => {
      if (!open || reduced) return
      const socialBgs = gsap.utils.toArray('.social-bg', rootRef.current)
      const tl = gsap.timeline()
      socialBgs.forEach((bg, index) => {
        tl.fromTo(
          bg,
          { xPercent: -100 },
          { xPercent: 100, duration: 0.8, ease: 'power2.out', delay: index * 0.1 },
          0,
        )
      })
      tl.to(socialBgs, { xPercent: -100, duration: 0.3, ease: 'power2.in', delay: 0.5 })
    },
    { dependencies: [open], scope: rootRef },
  )

  useGSAP(
    () => {
      if (reduced) return
      const socialItems = gsap.utils.toArray('.social-item', rootRef.current)
      const cleanups = socialItems.map((item) => {
        const link = item.querySelector('.social-link')
        if (!link) return () => {}
        const tl = gsap.timeline({ paused: true })
        tl.to(link, { yPercent: -100, duration: 0.35, ease: 'power2.out' })
        const play = () => tl.play()
        const reverse = () => tl.reverse()
        item.addEventListener('mouseenter', play)
        item.addEventListener('mouseleave', reverse)
        return () => {
          item.removeEventListener('mouseenter', play)
          item.removeEventListener('mouseleave', reverse)
          tl.kill()
        }
      })
      return () => cleanups.forEach((fn) => fn())
    },
    { scope: rootRef },
  )

  const handleNav = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    onClose?.()
  }

  return (
    <div
      ref={rootRef}
      id="site-menu"
      inert={!open}
      className={clsx(
        'menu fixed top-0 left-0 md:px-10 w-full h-dvh bg-musgo transition-transform duration-700 overflow-x-hidden overflow-y-auto z-[99]',
        open ? 'translate-y-0' : '-translate-y-full',
      )}
      aria-hidden={!open}
    >
      <div className="relative w-full h-full">
        <div className="hidden md:block absolute top-0 left-0 w-full h-full opacity-60">
          <Hatch stroke="#363b24" />
        </div>
        <div className="md:hidden absolute top-0 left-0 w-full h-full opacity-15">
          <Hatch stroke="#fff" />
        </div>
        <div className="absolute w-full h-full flex items-center z-50">
          <div className="hidden lg:flex gap-17 lg:gap-0 xl:gap-18 w-1/2" aria-hidden="true">
            <div className="menu-left-gallery flex flex-col gap-17 lg:gap-0 xl:gap-18 translate-y-40">
              <div className="overflow-hidden border border-white/25 px-10 py-12">
                <span className="block font-bungee text-7xl xl:text-8xl leading-none text-white">
                  BUILD
                </span>
              </div>
              <div className="overflow-hidden bg-default px-10 py-12">
                <span className="block font-bungee text-7xl xl:text-8xl leading-none text-black">
                  SHIP
                </span>
              </div>
            </div>
            <div className="menu-right-gallery flex flex-col gap-17 lg:gap-0 xl:gap-18 -translate-y-25">
              <div className="overflow-hidden border border-white/25 px-10 py-12">
                <span className="block font-bungee text-7xl xl:text-8xl leading-none text-white">
                  LEARN
                </span>
              </div>
              <div className="overflow-hidden bg-default px-10 py-24" />
            </div>
          </div>
          <div className="lg:pt-50 lg:pb-8 flex flex-col justify-center xl:justify-between items-center w-full lg:w-1/2 h-full">
            <nav aria-label="Menu">
              <ul className="flex flex-col justify-center items-center">
                {LINKS.map((item) => (
                  <li
                    key={item.href}
                    className="menu-item relative overflow-hidden font-sans text-5xl md:text-8xl lg:text-7xl xl:text-8xl font-bold leading-[.94] tracking-tighter uppercase"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      className="menu-link block relative text-white"
                    >
                      <span className="menu-text block text-white">{item.label}</span>
                      <span
                        className="menu-text block text-default absolute left-0 top-full"
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                      <span
                        className="menu-bg absolute left-0 top-0 w-full h-full bg-default -translate-x-full z-0"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-10">
              <ul className="flex items-center gap-5">
                {SOCIALS.map((social) => (
                  <li
                    key={social.label}
                    className="social-item relative overflow-hidden font-sans text-lg uppercase font-semibold tracking-tighter"
                  >
                    <a
                      href={social.href}
                      {...(isExternal(social.href)
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="social-link block relative text-white"
                    >
                      <span className="block text-sm md:text-base text-white">{social.label}</span>
                      <span
                        className="block text-sm md:text-base text-default absolute left-0 top-full"
                        aria-hidden="true"
                      >
                        {social.label}
                      </span>
                      <span
                        className="social-bg absolute left-0 top-0 w-full h-full bg-default -translate-x-full z-0"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
