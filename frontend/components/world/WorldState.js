// Mutable world state shared between the canvas and the DOM — written by one
// scroll listener, read inside useFrame. Never triggers React renders.
export const world = {
  progress: 0, // 0..1 total page scroll
  aspect: 1,
  skillsFocus: 0, // 0..1 — how close #skills is to viewport center
  contactFocus: 0, // 0..1 — how close #contact is
  // Hover tooltip — written by TechGalaxy, read by HoverTooltip (DOM).
  hoverLabel: null,
  hoverColor: '#67e8f9',
  hoverX: 0,
  hoverY: 0,
}

// Pointer mirror in [-1,1] space, written each frame by the world rig.
export const starPointer = { x: 0, y: 0, active: 0 }
