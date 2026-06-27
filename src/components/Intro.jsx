import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import starPng from '../assets/logo_star.png'

/**
 * ActiveTheory-style intro: the North Star is the loader.
 * Star ignites → wordmark draws in → whole curtain wipes up to reveal the site.
 * Runs once per session.
 */
export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('show') // 'show' → 'exit' → gone

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => setPhase('exit'), 2100)
    const t2 = setTimeout(() => {
      document.body.style.overflow = ''
      onDone?.()
    }, 3050)
    return () => { clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = '' }
  }, [onDone])

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#060C18' }}
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          animate={
            phase === 'exit'
              ? { clipPath: 'inset(0 0 100% 0)' }
              : { clipPath: 'inset(0 0 0 0)' }
          }
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => phase === 'exit' && setPhase('gone')}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 600, height: 600,
              background: 'radial-gradient(circle, rgba(77,186,255,0.18) 0%, transparent 65%)',
              filter: 'blur(40px)',
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />

          {/* Igniting star */}
          <motion.div
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: 'drop-shadow(0 0 40px rgba(77,186,255,0.6))' }}
          >
            <img src={starPng} alt="ProdCast North Star" className="w-[150px] h-[150px] object-contain" />
          </motion.div>

          {/* Wordmark */}
          <motion.div
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
          >
            <span className="font-black tracking-[-0.04em] text-2xl text-ice">PRODCAST</span>
            <span
              className="mt-1"
              style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(77,186,255,0.6)' }}
            >
              NAVIGATE AMBIGUITY · CREATE IMPACT
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
