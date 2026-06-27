import React, { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import starImg from '../assets/star-full.png'

const EVENTS = [
  { id: 'ev1', title: 'Prod360',          type: 'FLAGSHIP CONCLAVE', date: 'SEPTEMBER 2024' },
  { id: 'ev2', title: 'ProdShot',         type: 'PHOTO / STORYTELLING', date: 'OCTOBER 2024' },
  { id: 'ev3', title: 'ProdUxpert',       type: 'DESIGN & UX',    date: 'NOVEMBER 2024' },
  { id: 'ev4', title: 'Product Teardown', type: 'WORKSHOP',  date: 'DECEMBER 2024' },
  { id: 'ev5', title: 'ProdLabs',         type: 'BUILD SPRINT',     date: 'JANUARY 2025' },
  { id: 'ev6', title: 'Sketchify',        type: 'WIREFRAMING',    date: 'FEBRUARY 2025' },
  { id: 'ev7', title: 'Trap or Treasure', type: 'PRODUCT STRATEGY',  date: 'MARCH 2025' },
  { id: 'ev8', title: 'InsideIIM',        type: 'CULTURE & BRAND',   date: 'APRIL 2025' },
  { id: 'ev9', title: 'Certificate Course', type: 'ACADEMIC TRACK', date: 'MAY 2025' },
]

const R = 550 // Orbit radius
const TAU = Math.PI * 2
const ANGLE_PER_CARD = TAU / EVENTS.length 

function OrbitalCard({ evt, i, scrollYProgress, total, navigate }) {
  // Pivot maps scroll 0->1 to 0->total
  const pivotRaw = useTransform(scrollYProgress, [0, 1], [0, total])
  const pivot = useSpring(pivotRaw, { stiffness: 80, damping: 20 })

  // Angle difference between this card's fixed slot and the rotating pivot
  const angleRad = useTransform(pivot, p => (i - p) * ANGLE_PER_CARD)

  // 3D positioning on the horizontal plane
  const xVal = useTransform(angleRad, a => R * Math.sin(a))
  const zVal = useTransform(angleRad, a => R * Math.cos(a))
  
  // Cards slightly rotate away from the camera when they are on the sides to enhance the sphere effect
  const rotYVal = useTransform(angleRad, a => a * (180 / Math.PI))

  // Dim and blur cards that are behind the star (negative Z)
  const opacity = useTransform(zVal, [-R, 0, R], [0.1, 0.4, 1])
  const filterVal = useTransform(zVal, [-R, 0, R], [
    'blur(12px) brightness(0.3)',
    'blur(4px) brightness(0.7)',
    'blur(0px) brightness(1)'
  ])
  const scale = useTransform(zVal, [-R, R], [0.7, 1])

  return (
    <motion.div
      layoutId={`card-container-${evt.id}`}
      className="absolute cursor-pointer group"
      style={{
        width: 440,
        height: 280,
        x: xVal,
        z: zVal,
        rotateY: rotYVal, // Faces outward along the cylinder/sphere
        opacity,
        scale,
        filter: filterVal,
        translateX: '-50%',
        translateY: '-50%',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        background: 'rgba(5, 10, 20, 0.5)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        borderRadius: '12px',
        boxShadow: 'inset 0 0 40px rgba(56, 189, 248, 0.05), 0 8px 32px rgba(0,0,0,0.5)',
      }}
      whileHover={{ 
        border: '1px solid rgba(56, 189, 248, 0.6)',
        boxShadow: 'inset 0 0 60px rgba(56, 189, 248, 0.1), 0 0 30px rgba(56,189,248,0.2)'
      }}
      onClick={() => navigate(`/event/${evt.id}`)}
    >
      <div className="p-8 h-full flex flex-col justify-between">
        
        {/* Top row */}
        <div className="flex justify-between items-start text-xs font-mono font-medium tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span>/ 0{i + 1}</span>
          <motion.span layoutId={`card-date-${evt.id}`}>{evt.date}</motion.span>
        </div>

        {/* Middle content */}
        <div className="mt-6">
          <motion.h3
            layoutId={`card-title-${evt.id}`}
            className="text-[2.5rem] font-black tracking-tight text-white mb-1"
          >
            {evt.title}
          </motion.h3>
          <div className="h-[2px] w-3/4 bg-gradient-to-r from-[#38BDF8] to-transparent mb-3" />
          <motion.span 
            layoutId={`card-tag-${evt.id}`} 
            className="text-[0.7rem] font-mono tracking-[0.2em] uppercase"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {evt.type}
          </motion.span>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-end mt-auto">
          <span className="text-[0.7rem] font-mono font-bold tracking-[0.15em] text-[#38BDF8] opacity-70 group-hover:opacity-100 transition-opacity">
            CLICK TO VIEW →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function SpiralGallerySection() {
  const containerRef = useRef(null)
  const navigate = useNavigate()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={containerRef}
      id="events"
      className="relative w-full"
      style={{ height: `${EVENTS.length * 60}vh`, background: '#03050D' }}
      data-testid="planetary-gallery"
    >
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {/* Title layer - Fixed Top Left */}
        <div className="absolute top-32 left-8 md:left-16 z-30 pointer-events-none">
          <p className="font-mono text-[0.7rem] tracking-[0.2em] text-[#38BDF8] mb-4">
            02 / WHAT WE SHIPPED
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Last year, <span className="text-[#38BDF8]">compounded.</span>
          </h2>
        </div>

        {/* Central Star (The Sun) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" style={{ transform: 'translateZ(-100px)' }}>
          {/* Core massive glow */}
          <div className="absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.15)_0%,rgba(56,189,248,0.05)_40%,transparent_70%)] blur-xl" />
          
          {/* Star PNG */}
          <motion.img 
            src={starImg} 
            alt="Central Star" 
            className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] object-contain drop-shadow-[0_0_60px_rgba(56,189,248,0.6)]"
            animate={{ scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* 3D Orbiting World */}
        <div
          className="relative z-20 flex items-center justify-center"
          style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        >
          {EVENTS.map((evt, i) => (
            <OrbitalCard
              key={evt.id}
              evt={evt}
              i={i}
              scrollYProgress={scrollYProgress}
              total={EVENTS.length}
              navigate={navigate}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
