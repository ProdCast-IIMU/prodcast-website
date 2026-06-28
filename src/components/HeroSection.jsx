import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

function useStarSize() {
  const [size, setSize] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 240 : 380))
  useEffect(() => {
    const update = () => setSize(window.innerWidth < 768 ? 240 : 380)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

/* ── Constellation star field ── */
const STARS = [
  { x:'7%',  y:'11%', s:1.8, d:0    },
  { x:'18%', y:'70%', s:1.2, d:0.6  },
  { x:'25%', y:'28%', s:0.9, d:1.3  },
  { x:'38%', y:'84%', s:1.5, d:0.2  },
  { x:'70%', y:'14%', s:2.2, d:0.4  },
  { x:'82%', y:'52%', s:1.4, d:1.0  },
  { x:'91%', y:'22%', s:0.9, d:1.7  },
  { x:'88%', y:'80%', s:1.2, d:0.8  },
  { x:'48%', y:'90%', s:1.0, d:2.0  },
  { x:'4%',  y:'50%', s:1.6, d:1.4  },
  { x:'57%', y:'7%',  s:1.0, d:0.9  },
  { x:'63%', y:'76%', s:0.8, d:1.6  },
  { x:'32%', y:'50%', s:0.7, d:2.3  },
  { x:'77%', y:'92%', s:1.1, d:0.3  },
]

/* ─────────────────────────────────────────────────────────
   Hero North Star — crisp SVG recreation of the brand star.
   Long vertical + horizontal cardinal rays, short diagonals,
   white-hot core fading to sky-blue tips. A glassy sheen
   keeps it luminous. NO rotation — only a subtle breathing
   float + a softly pulsing core glow.
   ───────────────────────────────────────────────────────── */
function HeroStar({ size = 380 }) {
  // Cardinal (long) 4-point star — top/bottom/left/right needles
  const cardinal = '200,14 212,188 386,200 212,212 200,386 188,212 14,200 188,188'
  // Diagonal (short) 4-point star
  const diagonal = '268,132 211,200 268,268 200,211 132,268 189,200 132,132 200,189'

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Ambient glow halo (pulses gently) */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 1.25, height: size * 1.25,
          background:
            'radial-gradient(circle, rgba(77,186,255,0.22) 0%, rgba(0,229,200,0.06) 45%, transparent 68%)',
          filter: 'blur(36px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Star — subtle breathing scale + gentle vertical float */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.035, 1], y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          filter:
            'drop-shadow(0 0 18px rgba(77,186,255,0.55)) drop-shadow(0 0 55px rgba(77,186,255,0.3))',
        }}
      >
        <svg
          width={size} height={size}
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* White-hot centre → sky-blue tips */}
            <radialGradient id="hs-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="14%"  stopColor="#FFFFFF" />
              <stop offset="34%"  stopColor="#E6F4FF" />
              <stop offset="62%"  stopColor="#A9DBFF" />
              <stop offset="100%" stopColor="#4DBAFF" />
            </radialGradient>
            {/* Soft core glow */}
            <radialGradient id="hs-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="45%"  stopColor="#DFF1FF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#4DBAFF" stopOpacity="0" />
            </radialGradient>
            {/* Glass sheen highlight (top-left) */}
            <linearGradient id="hs-sheen" x1="120" y1="100" x2="220" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Short diagonal rays (slightly translucent, behind) */}
          <polygon points={diagonal} fill="url(#hs-fill)" opacity="0.78" />
          {/* Long cardinal rays */}
          <polygon points={cardinal} fill="url(#hs-fill)" />
          {/* Glass sheen on the upper-left arms */}
          <polygon points={cardinal} fill="url(#hs-sheen)" style={{ mixBlendMode: 'screen' }} />

          {/* Pulsing core glow */}
          <motion.circle
            cx="200" cy="200"
            fill="url(#hs-core)"
            animate={{ r: [54, 66, 54], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Hot centre dot */}
          <circle cx="200" cy="200" r="8" fill="#FFFFFF" />
          <circle cx="200" cy="200" r="3.5" fill="#EAF6FF" />
        </svg>
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  const ref = useRef(null)
  const starSize = useStarSize()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const yText  = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const yStar  = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const fade   = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  // Subtle cursor parallax for the North Star
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const tiltY = useSpring(mvX, { stiffness: 90, damping: 18 })
  const tiltX = useSpring(mvY, { stiffness: 90, damping: 18 })
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mvX.set(((e.clientX - r.left) / r.width - 0.5) * 14)   // → rotateY
    mvY.set(((e.clientY - r.top) / r.height - 0.5) * -14)  // → rotateX
  }
  const resetTilt = () => { mvX.set(0); mvY.set(0) }

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060C18 0%, #081223 55%, #0A1628 100%)' }}
    >
      {/* ── Hero radial glow ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 62% 30%, rgba(77,186,255,0.12) 0%, transparent 65%)' }}
      />

      {/* ── Twinkling star field ── */}
      {STARS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: s.x, top: s.y, width: s.s, height: s.s, background: '#4DBAFF' }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.5 + i * 0.3, delay: s.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Main layout ── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pt-28 pb-24"
        style={{ opacity: fade }}
      >
        {/* ── Left: Text content ── */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl"
          style={{ y: yText }}
        >
          {/* Club badge */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(77,186,255,0.28)', background: 'rgba(77,186,255,0.06)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal" style={{ boxShadow: '0 0 6px rgba(0,229,200,0.8)' }} />
            <span style={{ fontFamily:'JetBrains Mono', fontSize:'0.64rem', letterSpacing:'0.2em', color:'rgba(77,186,255,0.85)', textTransform:'uppercase' }}>
              Product Management Club · IIM Udaipur
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="font-black leading-[1.04] text-ice"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 6rem)', letterSpacing: '-0.04em' }}
            initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Navigate{' '}
            <span className="text-gradient">Ambiguity.</span>
            <br />
            Create{' '}
            <span className="text-gradient">Impact.</span>
          </motion.h1>

          {/* Charter-aligned sub */}
          <motion.p
            className="mt-6 text-base md:text-lg max-w-lg leading-relaxed font-light"
            style={{ color: 'rgba(240,248,255,0.5)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.9 }}
          >
            Igniting passion for Product Management at IIMU. We bring together
            curious builders, strategic thinkers, and future PMs through
            events, alumni mentorship, and practical learning.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
          >
            <a href="#events" className="btn-primary">
              Explore Events
            </a>
            <a href="#about" className="btn-ghost">
              Our Mission
            </a>
          </motion.div>

        </motion.div>

        {/* ── Right: animated North Star (cursor parallax) ── */}
        <motion.div
          className="flex-shrink-0 relative flex items-center justify-center"
          style={{ y: yStar, perspective: 900 }}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
            <HeroStar size={starSize} />
          </motion.div>

          {/* Guided by tagline under star */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            <span style={{ fontFamily:'JetBrains Mono', fontSize:'0.58rem', letterSpacing:'0.28em', color:'rgba(122,200,255,0.65)', textTransform:'uppercase' }}>
              Guided by Insight
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span style={{ fontFamily:'JetBrains Mono', fontSize:'0.58rem', letterSpacing:'0.2em', color:'rgba(240,248,255,0.45)', textTransform:'uppercase' }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(77,186,255,0.6), transparent)' }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Seamless fade into About (#0A1628) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A1628)' }}
      />
    </section>
  )
}
