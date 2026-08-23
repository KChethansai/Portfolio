import React, { useEffect, useState } from 'react'

const CosmicParallaxBg = ({ head, text, loop = true, className = '', showContent = true }) => {
  const [smallStars, setSmallStars] = useState('')
  const [mediumStars, setMediumStars] = useState('')
  const [bigStars, setBigStars] = useState('')

  const textParts = text.split(',').map((part) => part.trim())

  const generateStarBoxShadow = (count) => {
    const shadows = []
    for (let index = 0; index < count; index += 1) {
      const x = Math.floor(Math.random() * 2000)
      const y = Math.floor(Math.random() * 2000)
      shadows.push(x + 'px ' + y + 'px #FFF')
    }
    return shadows.join(', ')
  }

  useEffect(() => {
    setSmallStars(generateStarBoxShadow(700))
    setMediumStars(generateStarBoxShadow(200))
    setBigStars(generateStarBoxShadow(100))
    document.documentElement.style.setProperty('--animation-iteration', loop ? 'infinite' : '1')
  }, [loop])

  return (
    <div className={'cosmic-parallax-container ' + className}>
      <div style={{ boxShadow: smallStars }} className='cosmic-stars' />
      <div style={{ boxShadow: mediumStars }} className='cosmic-stars-medium' />
      <div style={{ boxShadow: bigStars }} className='cosmic-stars-large' />
{showContent && (
        <>
          <div className='cosmic-title'>{head.toUpperCase()}</div>
          <div className='cosmic-subtitle'>
            {textParts.map((part, index) => (
              <React.Fragment key={part + index}>
                <span className={'cosmic-subtitle-part-' + (index + 1)}>{part.toUpperCase()}</span>
                {index < textParts.length - 1 && ' '}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export { CosmicParallaxBg }
export default CosmicParallaxBg



