import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/* Thin North-Star gradient line at the very top that fills with scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #4DBAFF, #00E5C8)',
        boxShadow: '0 0 8px rgba(77,186,255,0.5)',
      }}
    />
  )
}
