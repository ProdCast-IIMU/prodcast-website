import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, ArrowLeft, Sparkles, Mic, Users, CalendarDays, CheckCircle2, Trophy, Medal } from 'lucide-react'
import { EVENTS_DB, CATEGORY } from '../components/GallerySection'

const FACT_ICON = { speaker: Mic, mentor: Mic, participation: Users, attendance: Users, month: CalendarDays, status: CheckCircle2, format: Sparkles }

export default function EventDetail({ id }) {
  const navigate = useNavigate()
  const evt = EVENTS_DB.find(e => e.id === id)

  // Lock background scroll while the overlay is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const close = () => navigate('/')

  if (!evt) {
    return (
      <motion.div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-deep text-ice gap-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <p className="text-2xl font-black">Event not found</p>
        <button onClick={close} className="btn-ghost">Back home</button>
      </motion.div>
    )
  }

  const tint = CATEGORY[evt.category] || '#4DBAFF'

  return (
    <motion.div
      data-lenis-prevent
      className="fixed inset-0 z-[70] overflow-y-auto bg-deep"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Close */}
      <button
        onClick={close}
        className="fixed top-6 right-6 z-[80] w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105"
        style={{ background: 'rgba(13,30,53,0.85)', border: '1px solid rgba(77,186,255,0.25)', backdropFilter: 'blur(8px)' }}
      >
        <X size={18} className="text-ice" />
      </button>

      {/* Hero image */}
      <div className="relative w-full h-[52vh] md:h-[62vh] overflow-hidden">
        <motion.img
          src={evt.image} alt={evt.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,12,24,0.3) 0%, rgba(6,12,24,0.6) 55%, #060C18 100%)' }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${tint}1A 0%, transparent 60%)` }} />

        <div className="absolute inset-x-0 bottom-0 px-6 md:px-24 pb-10">
          <div className="max-w-5xl mx-auto">
            <motion.div className="flex flex-wrap items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <span className="px-3 py-1 rounded-full text-[0.6rem] font-mono tracking-[0.18em]" style={{ background: `${tint}22`, border: `1px solid ${tint}66`, color: tint }}>
                {evt.category.toUpperCase()}
              </span>
              <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(240,248,255,0.55)' }}>{evt.type}</span>
              <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(240,248,255,0.4)' }}>· {evt.date}</span>
            </motion.div>

            <motion.h1 className="font-black tracking-[-0.03em] text-ice leading-[1]" style={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)' }}
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              {evt.title}
            </motion.h1>
            {evt.subtitle && (
              <motion.p className="mt-2 text-lg md:text-2xl font-light" style={{ color: tint }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
                {evt.subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 md:px-24 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-14">
          {/* Description */}
          <motion.div className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
            <p className="label-mono mb-4">About the event</p>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-ice/90 mb-6">{evt.desc}</p>
            {evt.longDesc && <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(240,248,255,0.6)' }}>{evt.longDesc}</p>}

            {evt.topics?.length > 0 && (
              <div className="mt-10">
                <p className="label-mono mb-4">{evt.topicsLabel || 'Highlights'}</p>
                <div className="flex flex-wrap gap-2.5">
                  {evt.topics.map(t => (
                    <span key={t} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm" style={{ background: 'rgba(13,30,53,0.7)', border: '1px solid rgba(77,186,255,0.15)', color: 'rgba(240,248,255,0.75)' }}>
                      <Sparkles size={13} style={{ color: tint }} /> {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Results + Details */}
          <motion.div className="flex flex-col gap-5 md:sticky md:top-24" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
            {/* Winners (shown when available) */}
            {evt.winner && (
              <div className="rounded-2xl p-6" style={{ background: `linear-gradient(160deg, ${tint}1A, rgba(13,30,53,0.7))`, border: `1px solid ${tint}55` }}>
                <div className="flex items-center gap-2 mb-5">
                  <Trophy size={16} style={{ color: tint }} />
                  <p className="label-mono" style={{ color: tint }}>Results</p>
                </div>
                <div className="flex items-center gap-3 pb-4 mb-4 border-b" style={{ borderColor: 'rgba(77,186,255,0.12)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${tint}22`, border: `1px solid ${tint}66` }}>
                    <Trophy size={16} style={{ color: tint }} />
                  </div>
                  <div>
                    <p className="text-[0.58rem] font-mono tracking-widest uppercase" style={{ color: 'rgba(240,248,255,0.4)' }}>Winner</p>
                    <p className="font-bold text-ice">{evt.winner}</p>
                  </div>
                </div>
                {evt.runnerUp && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(240,248,255,0.06)', border: '1px solid rgba(240,248,255,0.15)' }}>
                      <Medal size={16} style={{ color: 'rgba(240,248,255,0.7)' }} />
                    </div>
                    <div>
                      <p className="text-[0.58rem] font-mono tracking-widest uppercase" style={{ color: 'rgba(240,248,255,0.4)' }}>Runner up</p>
                      <p className="font-semibold text-ice/80">{evt.runnerUp}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Details facts card */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(13,30,53,0.7)', border: `1px solid ${tint}33` }}>
              <p className="label-mono mb-5" style={{ color: tint }}>Details</p>
              <div className="flex flex-col gap-4">
                {evt.facts?.map(f => {
                  const Icon = FACT_ICON[f.label.toLowerCase()] || Sparkles
                  return (
                    <div key={f.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${tint}1A`, border: `1px solid ${tint}40` }}>
                        <Icon size={14} style={{ color: tint }} />
                      </div>
                      <div>
                        <p className="text-[0.58rem] font-mono tracking-widest uppercase" style={{ color: 'rgba(240,248,255,0.4)' }}>{f.label}</p>
                        <p className="font-semibold text-ice/90 text-sm leading-snug">{f.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Event gallery */}
        {evt.gallery?.length > 0 && (
          <motion.div className="max-w-5xl mx-auto mt-16"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}>
            <p className="label-mono mb-5">Event gallery</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {evt.gallery.map((g, i) => (
                <div key={i} className="relative overflow-hidden rounded-xl aspect-[4/3] group" style={{ border: '1px solid rgba(77,186,255,0.15)' }}>
                  <img src={g} alt={`${evt.title} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(180deg, transparent, ${tint}1A)` }} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="max-w-5xl mx-auto mt-16">
          <button onClick={close} className="inline-flex items-center gap-2 btn-ghost">
            <ArrowLeft size={15} /> All Events
          </button>
        </div>
      </div>
    </motion.div>
  )
}
