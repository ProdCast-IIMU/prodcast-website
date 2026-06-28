import React, { useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import starPng from '../assets/logo_star.png'

export default function FloatingGuide() {
  const { scrollY, scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  // Slow rotation tied to scroll progress
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])

  // Drive visibility from the same scroll source as the rest of the site
  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 600
    setIsVisible((prev) => (prev === next ? prev : next))
  })

  const scrollToTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      className="fixed bottom-8 right-6 z-40 cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.35 }}
      onClick={scrollToTop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Back to top"
    >
      <div
        className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden group"
        style={{
          background: 'rgba(13,30,53,0.7)',
          border: '1px solid rgba(77,186,255,0.3)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 20px rgba(77,186,255,0.15)',
        }}
      >
        {/* hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'radial-gradient(circle, rgba(77,186,255,0.25), transparent 70%)' }} />
        <motion.img
          src={starPng}
          alt=""
          className="w-7 h-7 object-contain relative z-10"
          style={{ rotate, filter: 'drop-shadow(0 0 4px rgba(77,186,255,0.6))' }}
        />
      </div>
    </motion.button>
  )
}
