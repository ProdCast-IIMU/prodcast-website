import React from 'react'
import { motion } from 'framer-motion'
import { Newspaper, Eye, GraduationCap, Trophy, Rocket, Mic, Gamepad2 } from 'lucide-react'
import { textReveal } from '../lib/motion'

/* 2026-27 activities plan — from the ProdCast induction deck */
const ROADMAP = [
  { icon: Newspaper,     title: 'ProNews',          tint: '#4DBAFF', span: 'md:col-span-2', desc: 'Current hot topics in the world of Product Management, delivered in bite-sized form.' },
  { icon: Eye,           title: 'ProdSight',        tint: '#00E5C8', span: '',              desc: 'Concept explainers and interview question breakdowns.' },
  { icon: GraduationCap, title: 'Workshops',        tint: '#9B8CFF', span: '',              desc: 'Hands-on workshops on new industry trends.' },
  { icon: Trophy,        title: 'Case Competition', tint: '#6BA8FF', span: 'md:col-span-2', desc: 'A flagship case competition built around new industry trends and real problems.' },
  { icon: Rocket,        title: 'Live Projects',    tint: '#00E5C8', span: '',              desc: 'Real projects for hands-on experience.' },
  { icon: Mic,           title: 'Guest Sessions',   tint: '#4DBAFF', span: '',              desc: 'Industry sessions to understand the PM world better.' },
  { icon: Gamepad2,      title: 'Engaging Events',  tint: '#9B8CFF', span: '',              desc: 'Gamified events to apply learning in a fun way.' },
]

export default function CurrentYearPlan() {
  return (
    <section
      id="roadmap"
      className="relative py-28 md:py-36 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#060C18' }}
    >
      {/* Blend from Mission divider */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0A1628, transparent)' }} />
      {/* Accent glow */}
      <div className="absolute top-1/3 -right-10 w-[440px] h-[440px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,200,0.07) 0%, transparent 65%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-[1280px] mx-auto">
        {/* Heading */}
        <motion.div variants={textReveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="section-num mb-4">04 / THE YEAR AHEAD</p>
          <h2 className="font-black tracking-[-0.03em] text-ice leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            Charting <span className="text-gradient">what comes next.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg max-w-xl font-light" style={{ color: 'rgba(240,248,255,0.55)' }}>
            For 2026 to 27 we are adding more ways for students to engage and keep learning, guided by the North Star.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[210px] gap-5">
          {ROADMAP.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                className={`bento-card p-7 flex flex-col justify-between group relative overflow-hidden ${item.span}`}
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Hover wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 90% 70% at 0% 0%, ${item.tint}14 0%, transparent 60%)` }} />

                <div className="relative z-10 flex items-start justify-between">
                  {/* Gently floating icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.tint}1A`, border: `1px solid ${item.tint}40` }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Icon size={22} style={{ color: item.tint }} />
                  </motion.div>
                  <span className="px-2.5 py-1 rounded-full text-[0.5rem] font-mono tracking-[0.18em]"
                    style={{ background: `${item.tint}14`, border: `1px solid ${item.tint}30`, color: item.tint }}>
                    PLANNED
                  </span>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="font-black tracking-tight text-ice mb-2 group-hover:-translate-y-0.5 transition-transform duration-300"
                    style={{ fontSize: item.span ? 'clamp(1.6rem,2.6vw,2.2rem)' : '1.4rem' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(240,248,255,0.55)' }}>
                    {item.desc}
                  </p>
                  <div className="mt-4 h-px w-8 group-hover:w-full transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, ${item.tint}, transparent)` }} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footnote — recurring flagships continue */}
        <motion.p
          className="mt-12 font-mono text-[0.62rem] tracking-wide leading-relaxed"
          style={{ color: 'rgba(240,248,255,0.35)' }}
          variants={textReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          Alongside our recurring flagships, Prod360, Product Teardown, ProShot and Product Companion, continuing through the year.
        </motion.p>
      </div>
    </section>
  )
}
