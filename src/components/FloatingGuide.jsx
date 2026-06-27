import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import starLogo from '../assets/star-full.png'

export default function FloatingGuide() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  // Rotate based on scroll progress (0 to 360 degrees)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  useEffect(() => {
    const handleScroll = () => {
      // Show the star only after scrolling down a bit (e.g., past the hero)
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      className="fixed bottom-12 right-8 z-50 cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.4 }}
      onClick={scrollToTop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-16 h-16 rounded-full bg-background/50 backdrop-blur-md border border-primary/20 shadow-lg shadow-primary/10 flex items-center justify-center p-2 overflow-hidden group">
        {/* Subtle glow behind the star */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <motion.img 
          src={starLogo} 
          alt="Scroll to top" 
          className="w-full h-full object-contain brightness-0 opacity-80"
          style={{ rotate }}
        />
      </div>
    </motion.div>
  )
}
