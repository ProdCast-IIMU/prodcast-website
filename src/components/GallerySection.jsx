import React, { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'

import imgFlagship from '../assets/ev_flagship.jpg'
import imgTeardown from '../assets/ev_teardown.jpg'
import imgLabs     from '../assets/ev_labs.jpg'
import imgLearning from '../assets/ev_learning.jpg'
import imgSketch   from '../assets/ev_sketchify.jpg'
import imgTrap     from '../assets/ev_trap.jpg'
// Prod360 — real event photos
import imgProd360Poster  from '../assets/ev1_prod360_a.jpg'
import imgProd360Speaker from '../assets/ev1_prod360_b.jpg'
import imgProd360Room    from '../assets/ev1_prod360_c.jpg'

/* ── Category palette (filter + accents) ── */
export const CATEGORY = {
  Flagship:    '#00E5C8',
  Competition: '#4DBAFF',
  Workshop:    '#9B8CFF',
  Learning:    '#3DDC97',
  Resources:   '#6BA8FF',
}

export const EVENTS_DB = [
  {
    id: 'ev1', title: 'Prod360', subtitle: 'Internship Insider',
    type: 'CAREER PREP', category: 'Flagship', date: 'AUG', image: imgProd360Room,
    gallery: [imgProd360Poster, imgProd360Speaker, imgProd360Room],
    stat: '40+ attendees',
    desc: 'An important event conducted during the SIP process to help students understand the interview structure and preparation strategies.',
    longDesc: 'Timed during the Summer Internship Placement season, Prod360 gave students a practical playbook for cracking PM and consulting interviews, covering resume optimization, interview playbooks, and senior guidance. The Internship Insider edition, The Senior Signal, featured seniors from ServiceNow, IndiaMart, GE Aerospace, and GE HealthCare sharing their playbooks.',
    topics: ['Resume optimization', 'Interview playbooks', 'Senior guidance'],
    facts: [
      { label: 'Month', value: 'August' },
      { label: 'Attendance', value: '40+ attendees' },
      { label: 'Format', value: 'Senior panel + Q&A' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    id: 'ev2', title: 'InsideIIM', subtitle: 'PM Interviews Course',
    type: 'COURSE', category: 'Learning', date: 'SEP', image: imgLearning,
    stat: 'Mentor: Sohum Sen',
    desc: 'A comprehensive series of interactive Zoom sessions designed to equip students with core PM skills.',
    longDesc: 'Run as a structured course, InsideIIM walked students through PM frameworks, applications, and interview techniques, building real clarity on how to answer structured questions effectively.',
    topics: ['PM frameworks', 'Applications', 'Interview techniques'],
    facts: [
      { label: 'Month', value: 'September' },
      { label: 'Mentor', value: 'Sohum Sen (Ex-Microsoft, IIM Calcutta Alumnus)' },
      { label: 'Format', value: 'Interactive Zoom sessions' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    id: 'ev3', title: 'ProdUxpert', subtitle: 'GenAI & Vibe Coding',
    type: 'WORKSHOP', category: 'Workshop', date: 'NOV', image: imgTeardown,
    stat: '15+ students online',
    desc: 'An interactive online session introducing Software 3.0, where students learned to combine prompt engineering with agentic automation.',
    longDesc: 'ProdUxpert explored the frontier of GenAI and vibe coding, exploring how product builders can pair prompt engineering with agentic automation to move from idea to working software faster than ever.',
    topics: ['Software 3.0', 'Prompt engineering', 'Agentic automation'],
    facts: [
      { label: 'Month', value: 'November' },
      { label: 'Speaker', value: 'Pavan Kumar Galiveeti (Sr. PM, Thomson Reuters)' },
      { label: 'Attendance', value: '15+ students online' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    id: 'ev4', title: 'ProdLabs', subtitle: 'Innovation Challenge',
    type: 'COMPETITION', category: 'Competition', date: 'DEC', image: imgLabs,
    stat: '10+ teams',
    desc: 'ProdLabs challenged students to identify problems related to IIMU and build viable prototypes and solutions.',
    longDesc: 'A hands-on innovation challenge where over ten teams scoped real IIMU problems and built working prototypes, a true test of problem-solving and rapid prototyping under time pressure.',
    topics: ['Problem identification', 'Prototyping', 'Solutioning'],
    facts: [
      { label: 'Month', value: 'December' },
      { label: 'Participation', value: '10+ teams (1 to 2 members each)' },
      { label: 'Format', value: 'Approx. 2.5 hour build challenge' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    id: 'ev5', title: 'Sketchify', subtitle: 'Draw & Decode',
    type: 'COMPETITION', category: 'Competition', date: 'FEB', image: imgSketch,
    stat: '20 participants',
    desc: 'A test of brand recall and creative chaos: students decoded brands through live sketching and analyst logic.',
    longDesc: 'Sketchify turned brand strategy into a game where teams sketched and guessed the parent company behind products, blending creative recall with sharp analyst logic in a fast, fun format.',
    topics: ['Brand recall', 'Live sketching', 'Analyst logic'],
    facts: [
      { label: 'Month', value: 'February' },
      { label: 'Participation', value: '20 participants' },
      { label: 'Format', value: 'Draw and guess the parent company' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    id: 'ev6', title: 'Trap or Treasure', subtitle: 'Bid & Survive',
    type: 'COMPETITION', category: 'Competition', date: 'MAR', image: imgTrap,
    stat: '15 participants',
    desc: 'An interactive team challenge testing product judgment, strategy, and quick thinking in a gamified environment.',
    longDesc: 'Teams bid for product features and navigated market crisis situations, a gamified test of judgment and strategy where the right call separated treasure from trap.',
    topics: ['Feature bidding', 'Market crisis', 'Product judgment'],
    facts: [
      { label: 'Month', value: 'March' },
      { label: 'Participation', value: '15 participants' },
      { label: 'Format', value: 'Bid for features, solve market crises' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    id: 'ev7', title: 'ProdShot', subtitle: 'Weekly Knowledge Bites',
    type: 'INITIATIVE', category: 'Resources', date: 'ONGOING', image: imgFlagship,
    stat: 'Weekly on Instagram',
    desc: 'ProdShot is our dedicated social media initiative to demystify complex Product Management concepts.',
    longDesc: 'A continuous learning initiative beyond the classroom, with weekly Instagram posts and infographics that break down core PM concepts into bite-sized, shareable knowledge.',
    topics: ['A/B Testing', 'North Star Metrics', 'Opportunity Scoring', 'NPS'],
    topicsLabel: 'Topics covered',
    facts: [
      { label: 'Format', value: 'Weekly Instagram posts & infographics' },
      { label: 'Status', value: 'Ongoing' },
    ],
  },
  {
    id: 'ev8', title: 'Product Teardowns', subtitle: 'Deep-dive Analyses',
    type: 'ANALYSIS', category: 'Workshop', date: 'MONTHLY', image: imgTeardown,
    stat: 'Duolingo · Gemini · Zepto',
    desc: 'Deep-dive analyses into successful products to understand their strategy, UX, and monetization.',
    longDesc: 'A recurring teardown series dissecting standout products: Duolingo (gamification & retention), Gemini (multimodal AI strategy), and Zepto (the 10-minute delivery model).',
    topics: ['Duolingo: Gamification', 'Gemini: Multimodal AI', 'Zepto: 10 min Delivery'],
    topicsLabel: 'Products analysed',
    facts: [
      { label: 'Format', value: 'Monthly deep-dive analyses' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    id: 'ev9', title: 'The PM Companion', subtitle: 'A Guide by ProdCast',
    type: 'RESOURCE', category: 'Resources', date: 'SEP', image: imgLearning,
    stat: 'Casebook & guide',
    desc: 'A comprehensive casebook and interview guide shared with students to assist with Summer Internship Placement preparation.',
    longDesc: 'The PM Companion is a structured ProdCast resource for navigating PM interviews, a casebook covering frameworks, root cause analysis, product pricing, guesstimates, and metrics.',
    topics: ['Frameworks', 'Root Cause Analysis', 'Product Pricing', 'Guesstimates', 'Metrics'],
    topicsLabel: 'Inside the guide',
    facts: [
      { label: 'Month', value: 'September' },
      { label: 'Format', value: 'Casebook & interview guide' },
      { label: 'Status', value: 'Released' },
    ],
  },
]

const FILTERS = ['All', 'Flagship', 'Competition', 'Workshop', 'Learning', 'Resources']

function EventCard({ evt, index, navigate }) {
  const tint = CATEGORY[evt.category] || '#4DBAFF'
  return (
    <motion.div
      layout
      layoutId={`card-container-${evt.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/event/${evt.id}`)}
      className="group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        width: 'clamp(280px, 30vw, 360px)',
        height: 'min(62vh, 460px)',
        border: '1px solid rgba(77,186,255,0.12)',
      }}
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img src={evt.image} alt={evt.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,12,24,0.2) 0%, rgba(6,12,24,0.78) 60%, rgba(6,12,24,0.97) 100%)' }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse 80% 55% at 50% 100%, ${tint}26 0%, transparent 65%)` }} />
      </div>

      <div className="relative h-full p-6 md:p-7 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="px-2.5 py-1 rounded-full text-[0.55rem] font-mono tracking-[0.18em]" style={{ background: `${tint}1F`, border: `1px solid ${tint}55`, color: tint }}>
            {evt.category.toUpperCase()}
          </span>
          <span className="font-mono text-[0.62rem] tracking-widest" style={{ color: 'rgba(240,248,255,0.5)' }}>{evt.date}</span>
        </div>

        <div className="mt-auto">
          {evt.stat && (
            <div className="flex items-center gap-1.5 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles size={11} style={{ color: tint }} />
              <span className="font-mono text-[0.56rem] tracking-widest uppercase" style={{ color: tint }}>{evt.stat}</span>
            </div>
          )}
          {evt.subtitle && (
            <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase mb-1.5" style={{ color: 'rgba(240,248,255,0.45)' }}>{evt.subtitle}</p>
          )}
          <h3 className="font-black tracking-tight text-ice mb-2 group-hover:-translate-y-0.5 transition-transform duration-300" style={{ fontSize: 'clamp(1.6rem,2.2vw,2.1rem)' }}>
            {evt.title}
          </h3>
          <div className="h-px w-10 mb-3 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${tint}, transparent)` }} />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.6rem] tracking-[0.16em] uppercase" style={{ color: 'rgba(240,248,255,0.55)' }}>{evt.type}</span>
            <span className="flex items-center gap-1 text-[0.6rem] font-mono font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all" style={{ color: tint }}>
              OPEN <ArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function GallerySection() {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const [filter, setFilter]     = useState('All')
  const [distance, setDistance] = useState(0)
  const [sectionH, setSectionH] = useState('100vh')

  const events = filter === 'All' ? EVENTS_DB : EVENTS_DB.filter(e => e.category === filter)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  const measure = useCallback(() => {
    if (!trackRef.current) return
    const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 48)
    setDistance(d)
    setSectionH(`${d + window.innerHeight}px`)
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 350)
    return () => { window.removeEventListener('resize', measure); clearTimeout(t) }
  }, [measure])

  // Re-measure after the filtered set re-renders
  useLayoutEffect(() => { measure() }, [filter, measure])

  const handleFilter = (f) => {
    if (f === filter) return
    setFilter(f)
    // Snap back to the section start so horizontal scroll restarts cleanly
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = sectionRef.current
      if (!el) return
      if (window.__lenis) window.__lenis.scrollTo(el, { immediate: true, offset: 0 })
      else window.scrollTo({ top: el.offsetTop, behavior: 'auto' })
      setTimeout(measure, 60)
    }))
  }

  return (
    <section id="events" ref={sectionRef} className="relative" style={{ height: sectionH, background: '#060C18' }}>
      {/* Top blend from About divider */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom, #0A1628, transparent)' }} />

      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 65% 55%, rgba(77,186,255,0.08) 0%, transparent 65%)' }} />

        {/* Heading */}
        <div className="relative z-20 pt-24 md:pt-28 px-6 md:px-16">
          <p className="section-num mb-3">02 / WHAT WE SHIPPED</p>
          <h2 className="font-black tracking-[-0.03em] text-ice leading-[1.05]" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.6rem)' }}>
            Last year, <span className="text-gradient">compounded.</span>
          </h2>
        </div>

        {/* Horizontal track (middle band) */}
        <div className="relative z-10 flex-1 flex items-center min-h-0">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-5 md:gap-6 px-6 md:px-16 pr-24 will-change-transform">
            <AnimatePresence mode="popLayout">
              {events.map((evt, i) => (
                <EventCard key={evt.id} evt={evt} index={i} navigate={navigate} />
              ))}
            </AnimatePresence>

            {/* End card */}
            <div className="flex-shrink-0 w-[240px] flex flex-col items-center justify-center text-center px-6" style={{ height: 'min(62vh, 460px)' }}>
              <p className="font-black text-ice text-2xl mb-2">More on the way.</p>
              <p className="font-light text-sm mb-5" style={{ color: 'rgba(240,248,255,0.5)' }}>This year&apos;s lineup is loading.</p>
              <a href="#roadmap" className="btn-ghost text-xs">See the Roadmap</a>
            </div>
          </motion.div>
        </div>

        {/* Filter chips , centered, bottom */}
        <div className="relative z-20 pb-7 md:pb-9 flex justify-center px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
            {FILTERS.map(f => {
              const active = filter === f
              const tint = CATEGORY[f] || '#4DBAFF'
              return (
                <button
                  key={f}
                  onClick={() => handleFilter(f)}
                  className="px-3.5 md:px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200"
                  style={{
                    background: active ? (f === 'All' ? 'rgba(77,186,255,0.15)' : `${tint}22`) : 'rgba(13,30,53,0.5)',
                    border: `1px solid ${active ? (f === 'All' ? 'rgba(77,186,255,0.6)' : tint) : 'rgba(77,186,255,0.16)'}`,
                    color: active ? (f === 'All' ? '#4DBAFF' : tint) : 'rgba(240,248,255,0.5)',
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
