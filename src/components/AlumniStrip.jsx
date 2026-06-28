import React from 'react'
import { motion } from 'framer-motion'
import { textReveal } from '../lib/motion'

const ALUMNI = [
  { name: 'ServiceNow',      role: 'PM Intern' },
  { name: 'IndiaMart',       role: 'PM Intern' },
  { name: 'GE Aerospace',    role: 'Strategy Intern' },
  { name: 'GE HealthCare',   role: 'PM Intern' },
  { name: 'Thomson Reuters',  role: 'Senior PM' },
  { name: 'Forevision',      role: 'PM Training' },
]

// Duplicate for seamless marquee
const ITEMS = [...ALUMNI, ...ALUMNI]

export default function AlumniStrip() {
  return (
    <div
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0A1628, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0A1628, transparent)' }} />

      {/* Label */}
      <motion.p
        className="text-center label-mono mb-10"
        variants={textReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
      >
        Our alumni work at
      </motion.p>

      {/* Marquee */}
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {ITEMS.map((a, i) => (
          <div
            key={i}
            className="inline-flex flex-col items-center justify-center px-10 border-r"
            style={{ borderColor: 'rgba(77,186,255,0.1)', minWidth: '180px' }}
          >
            <span className="font-black text-base text-ice tracking-tight">{a.name}</span>
            <span className="font-mono text-[0.56rem] tracking-[0.16em] uppercase mt-1" style={{ color: 'rgba(77,186,255,0.55)' }}>
              {a.role}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
