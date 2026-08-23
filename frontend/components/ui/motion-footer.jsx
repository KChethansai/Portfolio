import React, { forwardRef, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const styles = ".cinematic-footer-wrapper{font-family:'Plus Jakarta Sans',sans-serif;--background:#050505;--foreground:#fff}@keyframes footer-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes footer-breathe{0%{transform:translate(-50%,-50%) scale(1);opacity:.6}100%{transform:translate(-50%,-50%) scale(1.1);opacity:1}}@keyframes footer-heartbeat{0%,100%{transform:scale(1)}15%,45%{transform:scale(1.2)}30%{transform:scale(1)}}.footer-marquee{animation:footer-marquee 40s linear infinite}.footer-breathe{animation:footer-breathe 8s ease-in-out infinite alternate}.footer-heartbeat{animation:footer-heartbeat 2s infinite}.footer-grid{background-size:60px 60px;background-image:linear-gradient(to right,#fff1 1px,transparent 1px),linear-gradient(to bottom,#fff1 1px,transparent 1px);mask-image:linear-gradient(to bottom,transparent,black 30%,black 70%,transparent)}.footer-pill{background:linear-gradient(145deg,#fff1,#fff0);box-shadow:0 10px 30px -10px #0008,inset 0 1px 1px #fff2;border:1px solid #fff2;backdrop-filter:blur(16px);transition:all .4s}.footer-pill:hover{background:linear-gradient(145deg,#fff2,#fff1);border-color:#fff4;transform:translateY(-2px)}.footer-giant-text{font-size:26vw;line-height:.75;font-weight:900;letter-spacing:-.05em;color:transparent;-webkit-text-stroke:1px #fff1;background:linear-gradient(180deg,#fff2,transparent 60%);-webkit-background-clip:text;background-clip:text}.footer-text-glow{background:linear-gradient(180deg,#fff,#fff6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}"

const MagneticButton = forwardRef(function MagneticButton({ as: Component = 'button', className = '', children, ...props }, forwardedRef) {
  const localRef = useRef(null)
  useEffect(() => {
    const element = localRef.current
    if (!element) return
    const move = (event) => {
      const rect = element.getBoundingClientRect()
      gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * .4, y: (event.clientY - rect.top - rect.height / 2) * .4, scale: 1.05, duration: .4, ease: 'power2.out' })
    }
    const leave = () => gsap.to(element, { x: 0, y: 0, scale: 1, duration: 1.2, ease: 'elastic.out(1,.3)' })
    element.addEventListener('mousemove', move); element.addEventListener('mouseleave', leave)
    return () => { element.removeEventListener('mousemove', move); element.removeEventListener('mouseleave', leave); gsap.killTweensOf(element) }
  }, [])
  return <Component ref={(node) => { localRef.current = node; if (typeof forwardedRef === 'function') forwardedRef(node); else if (forwardedRef) forwardedRef.current = node }} className={'cursor-pointer ' + className} {...props}>{children}</Component>
})

function Marquee() {
  return <div className='flex items-center gap-12 px-6'><span>Intelligent Solutions</span><span className='text-orange-400'>&#10022;</span><span>Creative Development</span><span className='text-violet-400'>&#10022;</span><span>Data & Design</span><span className='text-orange-400'>&#10022;</span><span>Always Learning</span></div>
}

export function CinematicFooter() {
  const wrapperRef = useRef(null), giantRef = useRef(null), headingRef = useRef(null), linksRef = useRef(null)
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const ctx = gsap.context(() => {
      gsap.fromTo(giantRef.current, { y: '10vh', scale: .8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, scrollTrigger: { trigger: wrapper, start: 'top 80%', end: 'bottom bottom', scrub: 1 } })
      gsap.fromTo([headingRef.current, linksRef.current], { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: .15, scrollTrigger: { trigger: wrapper, start: 'top 40%', end: 'bottom bottom', scrub: 1 } })
    }, wrapper)
    return () => ctx.revert()
  }, [])
  return <>
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    <div ref={wrapperRef} className='relative h-screen w-full' style={{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }}>
      <footer className='cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#050505]/85 text-white'>
        <div className='footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(circle,rgba(249,115,22,.18),rgba(124,58,237,.16)_40%,transparent_70%)] blur-[80px]' />
        <div className='footer-grid pointer-events-none absolute inset-0 z-0' />
        <div ref={giantRef} className='footer-giant-text pointer-events-none absolute -bottom-[5vh] left-[45%] z-0 -translate-x-1/2 select-none whitespace-nowrap'>CHETHAN</div>
        <div className='absolute left-0 top-12 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-white/10 bg-black/60 py-4 backdrop-blur-md'><div className='footer-marquee flex w-max text-xs font-bold uppercase tracking-[.3em] text-white/60 md:text-sm'><Marquee /><Marquee /></div></div>
        <div className='relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6'>
          <h2 ref={headingRef} className='footer-text-glow mb-12 text-center text-5xl font-black tracking-tighter md:text-8xl'>Let's connect.</h2>
          <div ref={linksRef} className='flex w-full flex-wrap justify-center gap-4'><MagneticButton as='a' href='mailto:kakunurichethansai@gmail.com' className='footer-pill rounded-full px-10 py-5 text-sm font-bold md:text-base'>Get in touch &#8599;</MagneticButton><MagneticButton as='a' href='/resume.pdf' target='_blank' rel='noreferrer' className='footer-pill rounded-full px-10 py-5 text-sm font-bold md:text-base'>View resume</MagneticButton></div>
        </div>
        <div className='relative z-20 flex w-full items-center justify-between gap-6 px-6 pb-8 md:px-12'><div className='text-[10px] font-semibold uppercase tracking-widest text-white/50 md:text-xs'>&#169; 2026 Chethan Sai Kakunuri</div><MagneticButton as='button' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label='Back to top' className='footer-pill flex h-12 w-12 items-center justify-center rounded-full text-white/70'>&#8593;</MagneticButton></div>
      </footer>
    </div>
  </>
}
export default CinematicFooter




