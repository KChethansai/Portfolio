import { useEffect, useMemo, useRef, useState } from 'react'

// Minimal typewriter — interval-driven, CSS-blinking cursor. No GSAP.
export default function TextType({
  text,
  typingSpeed = 70,
  pauseDuration = 2000,
  deletingSpeed = 32,
  loop = true,
  showCursor = true,
  cursorCharacter = '|',
  className = '',
}) {
  const phrases = useMemo(() => (Array.isArray(text) ? text : [text]), [text])
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // typing | pausing | deleting
  const index = useRef(0)

  useEffect(() => {
    if (phrases.length === 0) return
    const current = phrases[index.current % phrases.length]

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const id = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed)
        return () => clearTimeout(id)
      }
      const id = setTimeout(() => setPhase('deleting'), pauseDuration)
      return () => clearTimeout(id)
    }

    // deleting
    if (displayed.length > 0) {
      const id = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), deletingSpeed)
      return () => clearTimeout(id)
    }
    index.current = (index.current + 1) % phrases.length
    if (!loop && index.current === 0) return undefined
    setPhase('typing')
    return undefined
  }, [displayed, phase, phrases, typingSpeed, pauseDuration, deletingSpeed, loop])

  return (
    <span className={`inline-block whitespace-nowrap ${className}`} aria-label={phrases[0]}>
      <span aria-hidden>{displayed}</span>
      {showCursor && (
        <span aria-hidden className='ml-0.5 inline-block animate-[type-blink_1s_steps(1)_infinite]'>
          {cursorCharacter}
        </span>
      )}
    </span>
  )
}
