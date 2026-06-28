import React from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: '10+', label: 'Events Hosted' },
  { value: '200+', label: 'Attendees' },
  { value: '4', label: 'Workshops' },
  { value: '3', label: 'Competitions' },
  { value: '5', label: 'Guest Speakers' },
  { value: '1', label: 'PM Casebook' },
  { value: '40+', label: 'Prod360 Attendees' },
  { value: '∞', label: 'Weekly ProdShots' },
]

// Duplicate for seamless loop
const ITEMS = [...STATS, ...STATS]

export default function StatsTicker() {
  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{
        background: 'rgba(6,12,24,0.6)',
        borderColor: 'rgba(77,186,255,0.1)',
      }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0A1628, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0A1628, transparent)' }} />

      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {ITEMS.map((s, i) => (
          <div key={i} className="inline-flex items-center gap-3 px-8">
            <span
              className="font-black text-lg"
              style={{ color: i % 3 === 0 ? '#4DBAFF' : i % 3 === 1 ? '#00E5C8' : '#9B8CFF' }}
            >
              {s.value}
            </span>
            <span
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
              style={{ color: 'rgba(240,248,255,0.45)' }}
            >
              {s.label}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(77,186,255,0.3)' }} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
