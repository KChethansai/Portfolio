// Central motion language. Every animation in the site reads from here.
// Premium editorial curve — fast snap, slow settle. Distinctive, not default.
export const ease = {
  out: [0.16, 1, 0.3, 1], // snap out
  inOut: [0.16, 1, 0.3, 1],
}

export const duration = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.9,
  cinematic: 1.4,
}

export const spring = { stiffness: 120, damping: 20, mass: 0.6 }

// Standard viewport config for scroll reveals.
export const revealViewport = { once: true, margin: '-60px' }

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: { duration: duration.normal, ease: ease.out, delay },
})
