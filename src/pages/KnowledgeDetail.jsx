import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Star } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// ── Star rating stored in localStorage ───────────────────────────────────────
function StarRating({ articleId }) {
  const key = `pc_rating_${articleId}`
  const [saved, setSaved] = useState(() => {
    const v = parseInt(localStorage.getItem(key), 10)
    return isNaN(v) ? 0 : v
  })
  const [hover, setHover] = useState(0)

  const rate = (n) => {
    setSaved(n)
    localStorage.setItem(key, String(n))
  }

  const active = hover || saved
  const labels = ['', 'Not helpful', 'Needs work', 'Pretty good', 'Really useful', 'Must-read!']

  return (
    <div className="flex flex-col items-center gap-4 py-10 mt-12"
      style={{ borderTop: '1px solid rgba(77,186,255,0.1)', borderBottom: '1px solid rgba(77,186,255,0.1)' }}>
      <p style={{
        fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(240,248,255,0.4)'
      }}>
        Was this article helpful?
      </p>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            onClick={() => rate(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
            style={{ transition: 'transform 0.15s', transform: n <= active ? 'scale(1.18)' : 'scale(1)' }}
            aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
          >
            <Star
              size={26}
              fill={n <= active ? '#4DBAFF' : 'none'}
              style={{ color: n <= active ? '#4DBAFF' : 'rgba(77,186,255,0.22)', strokeWidth: 1.5 }}
            />
          </button>
        ))}
      </div>
      <p style={{
        fontFamily: 'JetBrains Mono', fontSize: '0.58rem',
        letterSpacing: '0.1em', color: '#4DBAFF',
        minHeight: '1em', opacity: active ? 1 : 0, transition: 'opacity 0.2s'
      }}>
        {labels[active]}
      </p>
      {saved > 0 && (
        <p style={{ fontSize: '0.72rem', color: 'rgba(240,248,255,0.3)', fontFamily: 'JetBrains Mono' }}>
          Rating saved · change anytime
        </p>
      )}
    </div>
  )
}

// ── Utterances comment thread (GitHub Issues) ─────────────────────────────────
// One-time setup: install utteranc.es GitHub App on ProdCast-IIMU/prodcast-website
// → https://github.com/apps/utterances
function Comments() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', 'ProdCast-IIMU/prodcast-website')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('label', 'knowledge-hub')
    script.setAttribute('theme', 'photon-dark')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true
    ref.current.appendChild(script)
  }, [])

  return (
    <div className="mt-14">
      <p style={{
        fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(240,248,255,0.4)', marginBottom: '0.75rem'
      }}>
        Suggest changes · Ask questions
      </p>
      <p style={{ fontSize: '0.8rem', color: 'rgba(240,248,255,0.33)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Spotted an error, have a better example, or want to add context? Comment below — GitHub login required.
      </p>
      <div ref={ref} />
    </div>
  )
}

// ── Custom markdown renderers ─────────────────────────────────────────────────
const mdComponents = {
  h1: ({ children }) => (
    <h1 style={{ color: '#F0F8FF', fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{
      color: '#F0F8FF', fontSize: '1.15rem', fontWeight: 700,
      marginTop: '2.5rem', marginBottom: '0.75rem',
      paddingTop: '2rem', borderTop: '1px solid rgba(77,186,255,0.1)',
    }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ color: '#4DBAFF', fontSize: '0.95rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p style={{ color: 'rgba(240,248,255,0.72)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.97rem' }}>
      {children}
    </p>
  ),
  li: ({ children }) => (
    <li style={{ color: 'rgba(240,248,255,0.72)', lineHeight: 1.8, marginBottom: '0.3rem', fontSize: '0.97rem' }}>
      {children}
    </li>
  ),
  ul: ({ children }) => (
    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'decimal' }}>{children}</ol>
  ),
  strong: ({ children }) => (
    <strong style={{ color: '#F0F8FF', fontWeight: 600 }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: 'rgba(240,248,255,0.6)', fontStyle: 'italic' }}>{children}</em>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{
      borderLeft: '3px solid #4DBAFF', borderRadius: '0 8px 8px 0',
      padding: '0.75rem 1rem', margin: '1.5rem 0',
      background: 'rgba(77,186,255,0.04)',
      color: 'rgba(240,248,255,0.65)', fontStyle: 'italic',
    }}>
      {children}
    </blockquote>
  ),
  code: ({ inline, children }) => inline ? (
    <code style={{
      background: 'rgba(0,229,200,0.1)', color: '#00E5C8',
      padding: '0.1em 0.4em', borderRadius: '4px',
      fontFamily: 'JetBrains Mono', fontSize: '0.85em'
    }}>
      {children}
    </code>
  ) : (
    <pre style={{
      background: 'rgba(4,12,30,0.9)', border: '1px solid rgba(77,186,255,0.15)',
      borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', marginBottom: '1.25rem'
    }}>
      <code style={{ fontFamily: 'JetBrains Mono', fontSize: '0.82rem', color: '#00E5C8', whiteSpace: 'pre' }}>
        {children}
      </code>
    </pre>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ color: '#4DBAFF', textDecoration: 'underline', textDecorationColor: 'rgba(77,186,255,0.4)' }}>
      {children}
    </a>
  ),
  hr: () => (
    <hr style={{ border: 'none', borderTop: '1px solid rgba(77,186,255,0.1)', margin: '2rem 0' }} />
  ),
  table: ({ children }) => (
    <div style={{ overflowX: 'auto', marginBottom: '1.5rem', borderRadius: '8px', border: '1px solid rgba(77,186,255,0.12)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: 'rgba(240,248,255,0.72)' }}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead style={{ background: 'rgba(77,186,255,0.08)' }}>{children}</thead>
  ),
  th: ({ children }) => (
    <th style={{
      padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 600,
      color: '#F0F8FF', borderBottom: '1px solid rgba(77,186,255,0.15)',
      fontFamily: 'JetBrains Mono', fontSize: '0.73rem', letterSpacing: '0.05em'
    }}>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td style={{ padding: '0.55rem 1rem', borderBottom: '1px solid rgba(77,186,255,0.07)' }}>
      {children}
    </td>
  ),
}

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

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents} skipHtml={true}>
            {markdown}
          </ReactMarkdown>
        </motion.article>

        {/* Rating + Comments */}
        <StarRating articleId={id} />
        <Comments />
      </div>
    </div>
  )
}
