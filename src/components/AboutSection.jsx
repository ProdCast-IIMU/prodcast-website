import React from 'react'
import { motion } from 'framer-motion'
import { User, TrendingUp, Code2 } from 'lucide-react'
import TriangleMotif from './TriangleMotif'

/* ── The three forces that meet at the North Star ── */
const PILLARS = [
  { icon: User,       label: 'USER',       tint: '#4DBAFF', desc: 'Empathy for real needs and behaviour.' },
  { icon: TrendingUp, label: 'BUSINESS',   tint: '#00E5C8', desc: 'Value that compounds and sustains.' },
  { icon: Code2,      label: 'TECHNOLOGY', tint: '#9B8CFF', desc: 'What is buildable, today and next.' },
]

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Accent glow top-left */}
      <div className="absolute -top-20 -left-20 w-[480px] h-[480px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(77,186,255,0.1) 0%, transparent 65%)', filter: 'blur(40px)' }}
      />

      {/* Brand triangle motif — centered ambient texture behind content */}
      <div
        className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none"
        style={{ opacity: 0.32 }}
      >
        <TriangleMotif size={680} />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="section-num mb-6"
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          01 / ABOUT PRODCAST
        </motion.p>

        {/* Headline + copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <motion.h2
            className="font-black tracking-[-0.03em] leading-[1.05] text-ice"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            We don't just study product.{' '}
            <span className="text-gradient">We build product thinkers.</span>
          </motion.h2>

          <motion.div
            className="flex flex-col gap-6 text-base md:text-lg font-light leading-relaxed"
            style={{ color: 'rgba(240,248,255,0.6)' }}
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p>
              ProdCast is the Product Management Club of IIM Udaipur, a community
              built to ignite curiosity for how great products come to life.
            </p>
            <p>
              We bridge academic theory and industry reality through live teardowns,
              design sprints, case competitions, and alumni mentorship, turning
              curious students into confident, decisive PMs.
            </p>
            <a href="#events" className="btn-primary self-start mt-2">
              See What We Ship
            </a>
          </motion.div>
        </div>

        {/* Brand idea: the three forces → North Star */}
        <motion.div
          className="mt-24"
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <p className="label-mono mb-8 text-center md:text-left">
            Where User, Business &amp; Technology meet the North Star
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.label}
                  className="bento-card p-7 flex items-start gap-4"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${p.tint}1A`, border: `1px solid ${p.tint}40` }}
                  >
                    <Icon size={20} style={{ color: p.tint }} />
                  </div>
                  <div>
                    <h4 className="font-bold tracking-wide text-ice mb-1" style={{ letterSpacing: '0.04em' }}>
                      {p.label}
                    </h4>
                    <p className="text-sm font-light" style={{ color: 'rgba(240,248,255,0.5)' }}>
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
