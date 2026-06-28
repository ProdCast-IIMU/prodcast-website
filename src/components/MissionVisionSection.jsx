import React from 'react'
import { motion } from 'framer-motion'
import { Compass, Hammer, Network } from 'lucide-react'
import { textReveal as reveal } from '../lib/motion'

/* Three commitments — from the ProdCast charter mission */
const MISSION = [
  { icon: Compass, title: 'Provide', tint: '#4DBAFF', desc: 'Frameworks and industry insights that turn product theory into real judgment.' },
  { icon: Hammer,  title: 'Empower', tint: '#00E5C8', desc: 'A maker culture where students build solutions, not just manage them.' },
  { icon: Network, title: 'Connect', tint: '#9B8CFF', desc: 'Expert interactions that keep us close to Industry 4.0 trends.' },
]

export default function MissionVisionSection() {
  return (
    <section
      id="mission"
      className="relative py-28 md:py-36 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Blend from Events divider */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #060C18, transparent)' }} />
      {/* Accent glow */}
      <div className="absolute -top-10 right-0 w-[460px] h-[460px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,200,0.08) 0%, transparent 65%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-[1400px] mx-auto">
        <motion.p className="section-num mb-10" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
          03 / MISSION &amp; VISION
        </motion.p>

        {/* ── Vision ── */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
          <motion.div className="md:col-span-3" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="label-mono">Our Vision</p>
          </motion.div>
          <motion.h2
            className="md:col-span-9 font-black tracking-[-0.02em] text-ice leading-[1.12]"
            style={{ fontSize: 'clamp(1.7rem, 3.4vw, 3.1rem)' }}
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            To establish IIM Udaipur as a{' '}
            <span className="text-gradient">premier hub for product leadership</span>, fostering a
            community of innovative <span className="text-gradient">makers</span> who bridge the gap
            between business strategy and technology.
          </motion.h2>
        </div>

        <div className="glow-divider my-14 md:my-20" />

        {/* ── Mission ── */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="label-mono mb-3">Our Mission</p>
          <h3 className="font-bold text-ice tracking-tight max-w-2xl leading-snug" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)' }}>
            Three commitments guide everything we build.
          </h3>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {MISSION.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.title}
                className="bento-card p-8 group"
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ background: `${m.tint}1A`, border: `1px solid ${m.tint}40` }}>
                  <Icon size={22} style={{ color: m.tint }} />
                </div>
                <h4 className="text-2xl font-black tracking-tight text-ice mb-3">{m.title}</h4>
                <p className="text-base font-light leading-relaxed" style={{ color: 'rgba(240,248,255,0.6)' }}>{m.desc}</p>
                {/* bottom accent line */}
                <div className="mt-6 h-px w-10 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${m.tint}, transparent)` }} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
