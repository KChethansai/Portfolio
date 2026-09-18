import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/performance'

export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const counterRef = useRef(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone
  const firedRef = useRef(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!rootRef.current || !counterRef.current) return
    const d = (v) => (reduced ? 0.01 : v)
    const layers = gsap.utils.toArray(rootRef.current.querySelectorAll("[class^='pre-loader-layer']"))
    const counter = { value: 0 }
    gsap.set(layers, { xPercent: 0 })
    gsap.set(counterRef.current, { x: 0 })
    const tl = gsap.timeline({ delay: d(0.5) })
    tl.to(counter, {
      value: 100,
      duration: d(4),
      ease: 'none',
      onUpdate: () => {
        if (counterRef.current) counterRef.current.innerText = `${Math.floor(counter.value)}%`
      },
    })
    tl.addLabel('counterDone')
    const textDuration = d(0.9)
    tl.to(counterRef.current, { x: '110vw', duration: textDuration, ease: 'power4.inOut' }, 'counterDone')
    tl.addLabel('layersOut', `counterDone+=${textDuration}`)
    tl.call(
      () => {
        if (!firedRef.current) {
          firedRef.current = true
          doneRef.current?.()
        }
      },
      null,
      'layersOut',
    )
    tl.to(
      layers,
      { xPercent: -100, duration: d(0.9), ease: 'power4.inOut', stagger: d(0.25) },
      'layersOut',
    )
    tl.to(rootRef.current, { autoAlpha: 0, duration: d(0.6), pointerEvents: 'none' })
    return () => {
      tl.kill()
    }
  }, [reduced])

  return (
    <motion.div
      ref={rootRef}
      className="fixed inset-0 w-full h-dvh overflow-hidden z-[9999]"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
      aria-hidden="true"
    >
      <div className="relative w-full h-full flex flex-col">
        <div className="pre-loader-layer-1 flex-1 bg-black" />
        <div className="pre-loader-layer-2 flex-1 bg-black" />
        <div className="pre-loader-layer-3 flex-1 bg-black" />
        <div className="pre-loader-layer-4 flex-1 bg-black" />
        <div className="pre-loader-layer-5 flex-1 bg-black" />
        <span
          ref={counterRef}
          className="absolute bottom-2 right-6 font-bungee text-[5.5em] md:text-[9em] lg:text-[11em] 2xl:text-[16em] leading-none text-white font-extrabold z-10"
        >
          0%
        </span>
      </div>
    </motion.div>
  )
}
