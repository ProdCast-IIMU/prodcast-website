// Shared entry animations — a subtle "focus-in": text rises slightly while a
// soft blur sharpens. Draws the eye gently without distracting.

export const textReveal = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

// Parent that staggers its children's reveals in sequence.
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
