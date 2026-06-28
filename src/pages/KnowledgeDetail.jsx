import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function KnowledgeDetail() {
  const { id } = useParams()
  const [metadata, setMetadata] = useState(null)
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    async function fetchData() {
      try {
        const indexRes = await fetch('/knowledge/index.json')
        let meta = null
        if (indexRes.ok) {
          const indexData = await indexRes.json()
          if (Array.isArray(indexData)) meta = indexData.find(item => item.id === id)
        }
        const mdRes = await fetch(`/knowledge/${id}.md`)
        if (!mdRes.ok) throw new Error('Article not found')
        const text = await mdRes.text()
        if (active) { setMetadata(meta); setMarkdown(text); setLoading(false) }
      } catch (err) {
        if (active) { setError(err.message); setLoading(false) }
      }
    }
    fetchData()
    return () => { active = false }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-6 md:px-16 lg:px-24" style={{ background: '#060C18' }}>
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-3 w-20 rounded-full mb-12 " style={{ background: 'rgba(77,186,255,0.15)' }} />
          <div className="h-10 w-2/3 rounded-xl mb-6" style={{ background: 'rgba(77,186,255,0.1)' }} />
          <div className="h-3 w-32 rounded mb-10" style={{ background: 'rgba(77,186,255,0.08)' }} />
          <div className="space-y-4">
            {[1,2,3,4].map(n => <div key={n} className="h-4 rounded" style={{ background: 'rgba(77,186,255,0.07)', width: `${70 + n * 7}%` }} />)}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-6 text-center" style={{ background: '#060C18' }}>
        <div className="max-w-md">
          <p className="section-num mb-4">404</p>
          <h2 className="text-3xl font-black text-ice mb-4">Article Not Found</h2>
          <p className="font-light mb-8" style={{ color: 'rgba(240,248,255,0.5)' }}>{error}</p>
          <Link to="/knowledge" className="btn-ghost">Back to Hub</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 md:px-16 lg:px-24" style={{ background: '#060C18' }}>
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at top, rgba(77,186,255,0.07), transparent 65%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-3xl mx-auto">
        <Link
          to="/knowledge"
          className="inline-flex items-center gap-2 mb-12 group"
          style={{ color: 'rgba(77,186,255,0.6)', fontFamily: 'JetBrains Mono', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {metadata?.category && (
            <span className="px-2.5 py-1 rounded-full text-[0.55rem] font-mono tracking-[0.18em]"
              style={{ background: 'rgba(77,186,255,0.12)', border: '1px solid rgba(77,186,255,0.3)', color: '#4DBAFF' }}>
              {metadata.category.toUpperCase()}
            </span>
          )}
          <span className="font-mono text-[0.58rem] tracking-widest" style={{ color: 'rgba(240,248,255,0.4)' }}>
            {metadata?.date || ''}
          </span>
          {metadata?.readTime && (
            <span className="font-mono text-[0.58rem] tracking-widest" style={{ color: 'rgba(240,248,255,0.4)' }}>
              · {metadata.readTime}
            </span>
          )}
        </div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="prose max-w-none"
          style={{
            '--tw-prose-body': 'rgba(240,248,255,0.7)',
            '--tw-prose-headings': '#F0F8FF',
            '--tw-prose-links': '#4DBAFF',
            '--tw-prose-bold': '#F0F8FF',
            '--tw-prose-code': '#00E5C8',
            '--tw-prose-quotes': 'rgba(240,248,255,0.6)',
            '--tw-prose-quote-borders': 'rgba(77,186,255,0.4)',
            color: 'rgba(240,248,255,0.7)',
          }}
        >
          <ReactMarkdown skipHtml={true}>{markdown}</ReactMarkdown>
        </motion.article>
      </div>
    </div>
  )
}
