import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowUpRight, Clock } from 'lucide-react'
import { textReveal } from '../lib/motion'

const TINTS = ['#4DBAFF', '#00E5C8', '#9B8CFF', '#6BA8FF', '#3DDC97']

export default function KnowledgeHub() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery      = searchParams.get('search') || ''
  const selectedCategory = searchParams.get('category') || ''

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    fetch('/knowledge/index.json')
      .then(r => { if (!r.ok) throw new Error('Failed to load index'); return r.json() })
      .then(data => { if (!Array.isArray(data)) throw new Error('Malformed index'); if (active) { setArticles(data); setLoading(false) } })
      .catch(err => { if (active) { setError(err.message); setLoading(false) } })
    return () => { active = false }
  }, [])

  const handleSearch = (e) => {
    const val = e.target.value
    const p = Object.fromEntries(searchParams.entries())
    if (val) p.search = val; else delete p.search
    setSearchParams(p)
  }
  const handleCategory = (cat) => {
    const p = Object.fromEntries(searchParams.entries())
    if (selectedCategory === cat) delete p.category; else p.category = cat
    setSearchParams(p)
  }

  const categories = Array.from(new Set(articles.map(a => a.category).filter(Boolean)))

  const filtered = articles.filter(a => {
    const q = searchQuery.toLowerCase().trim()
    const matchCat = !selectedCategory || a.category === selectedCategory
    const matchQ = !q || [a.title, a.summary, a.excerpt].join(' ').toLowerCase().includes(q)
    return matchCat && matchQ
  })

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-6 md:px-16 lg:px-24" style={{ background: '#060C18' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <div className="h-3 w-28 rounded-full mb-5 animate-pulse" style={{ background: 'rgba(77,186,255,0.15)' }} />
            <div className="h-14 w-80 rounded-xl mb-4 animate-pulse" style={{ background: 'rgba(77,186,255,0.1)' }} />
            <div className="h-4 w-96 rounded-lg animate-pulse" style={{ background: 'rgba(77,186,255,0.08)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(n => (
              <div key={n} className="rounded-2xl p-7 h-64 animate-pulse" style={{ background: 'rgba(13,30,53,0.6)', border: '1px solid rgba(77,186,255,0.1)' }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-6" style={{ background: '#060C18' }}>
        <div className="text-center max-w-md">
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(77,186,255,0.6)' }}>Error</p>
          <h2 className="text-3xl font-black text-ice mb-4">Could not load articles</h2>
          <p className="mb-8 font-light" style={{ color: 'rgba(240,248,255,0.5)' }}>{error}</p>
          <Link to="/" className="btn-ghost">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 md:px-16 lg:px-24" style={{ background: '#060C18' }}>
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at top, rgba(77,186,255,0.08), transparent 65%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.div className="mb-14" variants={textReveal} initial="hidden" animate="show">
          <p className="section-num mb-5">KNOWLEDGE HUB</p>
          <h1 className="font-black tracking-[-0.04em] text-ice leading-[1.02]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
            Learn the <span className="text-gradient">craft.</span>
          </h1>
          <p className="mt-5 text-lg max-w-2xl font-light" style={{ color: 'rgba(240,248,255,0.5)' }}>
            Frameworks, teardowns, and deep dives into the mechanics of product management.
          </p>
        </motion.div>

        {/* Search + filters */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center gap-4 mb-12 pb-10 border-b"
          style={{ borderColor: 'rgba(77,186,255,0.1)' }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
        >
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(77,186,255,0.5)' }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-ice placeholder:text-ice/30 outline-none transition-colors"
              style={{
                background: 'rgba(13,30,53,0.7)',
                border: '1px solid rgba(77,186,255,0.2)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(77,186,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(77,186,255,0.2)'}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => {
              const active = selectedCategory === cat
              const tint = TINTS[i % TINTS.length]
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200"
                  style={{
                    background: active ? `${tint}22` : 'rgba(13,30,53,0.5)',
                    border: `1px solid ${active ? tint : 'rgba(77,186,255,0.16)'}`,
                    color: active ? tint : 'rgba(240,248,255,0.5)',
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-black text-ice mb-3">Nothing found.</p>
            <p className="font-light" style={{ color: 'rgba(240,248,255,0.4)' }}>Try a different search or category.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((article, i) => {
                const tint = TINTS[i % TINTS.length]
                return (
                  <motion.article
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.55, delay: (i % 6) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="bento-card p-7 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-2.5 py-1 rounded-full text-[0.55rem] font-mono tracking-[0.18em]"
                          style={{ background: `${tint}1A`, border: `1px solid ${tint}40`, color: tint }}>
                          {article.category?.toUpperCase()}
                        </span>
                        <span className="font-mono text-[0.58rem] tracking-widest" style={{ color: 'rgba(240,248,255,0.35)' }}>
                          {article.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight text-ice mb-3 leading-snug group-hover:-translate-y-0.5 transition-transform duration-300">
                        {article.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(240,248,255,0.55)' }}>
                        {article.summary}
                      </p>
                    </div>

                    <div className="mt-7 pt-5 flex items-center justify-between border-t"
                      style={{ borderColor: 'rgba(77,186,255,0.1)' }}>
                      {article.readTime && (
                        <div className="flex items-center gap-1.5" style={{ color: 'rgba(240,248,255,0.4)' }}>
                          <Clock size={11} />
                          <span className="font-mono text-[0.58rem] tracking-wider">{article.readTime}</span>
                        </div>
                      )}
                      <Link
                        to={`/knowledge/${article.id}`}
                        className="ml-auto flex items-center gap-1.5 text-[0.6rem] font-mono font-bold tracking-[0.18em] uppercase transition-colors"
                        style={{ color: tint }}
                      >
                        Read <ArrowUpRight size={12} />
                      </Link>
                    </div>

                    <div className="mt-3 h-px w-8 group-hover:w-full transition-all duration-500"
                      style={{ background: `linear-gradient(90deg, ${tint}, transparent)` }} />
                  </motion.article>
                )
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
