import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Signature section transition — a shooting star streaks across the
 * seam between two sections as the user scrolls through it, while a
 * glowing "meridian" line ignites and fades. Scroll-driven, so the
 * motion is tied directly to the user's scroll position.
 *
 * Props:
 *   color    — base background (match the surrounding sections' seam)
 *   flip     — reverse the comet direction (alternate per divider)
 */
export default function SectionDivider({ color = '#0A1628', flip = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Comet travels across as you scroll through the band
  const from = flip ? '112%' : '-12%'
  const to   = flip ? '-12%' : '112%'
  const cometX       = useTransform(scrollYProgress, [0.15, 0.85], [from, to])
  const cometOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.9], [0, 1, 1, 0])

  // Meridian line draws out then retracts
  const lineScale = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 1, 0])
  const lineOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 0.8, 0])

  // Central bloom of light as the comet crosses
  const bloom = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0])

  return (
    <div
      ref={ref}
      className="relative w-full h-36 overflow-hidden pointer-events-none"
      style={{ background: color }}
      aria-hidden="true"
    >
      {/* Glowing meridian line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px"
        style={{
          scaleX: lineScale,
          opacity: lineOpacity,
          background: 'linear-gradient(90deg, transparent 0%, rgba(77,186,255,0.7) 50%, transparent 100%)',
        }}
      />

      {/* Central light bloom */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 280, height: 90,
          opacity: bloom,
          background: 'radial-gradient(ellipse, rgba(77,186,255,0.28) 0%, rgba(0,229,200,0.08) 45%, transparent 72%)',
          filter: 'blur(22px)',
        }}
      />

      {/* The shooting star */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: cometX, opacity: cometOpacity }}
      >
        <div className="relative flex items-center" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
          {/* Tail */}
          <div
            className="h-px"
            style={{
              width: 120,
              background: 'linear-gradient(90deg, transparent 0%, rgba(77,186,255,0.5) 60%, rgba(255,255,255,0.9) 100%)',
            }}
          />
          {/* Head */}
          <div
            className="w-1.5 h-1.5 rounded-full bg-white -ml-0.5"
            style={{ boxShadow: '0 0 10px 2px rgba(77,186,255,0.9), 0 0 22px 6px rgba(77,186,255,0.4)' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
