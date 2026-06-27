import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function KnowledgeDetail() {
  const { id } = useParams()
  const [metadata, setMetadata] = useState(null)
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    async function fetchData() {
      try {
        // Step 1: Fetch index.json to retrieve the metadata for this article
        const indexRes = await fetch('/knowledge/index.json')
        let meta = null
        if (indexRes.ok) {
          const indexData = await indexRes.json()
          if (Array.isArray(indexData)) {
            meta = indexData.find(item => item.id === id)
          }
        }

        // Step 2: Fetch the corresponding markdown file content
        const mdRes = await fetch(`/knowledge/${id}.md`)
        if (!mdRes.ok) {
          throw new Error('Markdown content file not found (404)')
        }
        const text = await mdRes.text()

        if (active) {
          setMetadata(meta)
          setMarkdown(text)
          setLoading(false)
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'An error occurred while fetching the article')
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => {
      active = false
    }
  }, [id])

  // Loading skeleton state
  if (loading) {
    return (
      <div data-testid="loading" className="knowledge-detail-container min-h-screen pt-32 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-4 bg-slate-200 w-24 mb-12 rounded"></div>
          <div className="h-10 bg-slate-200 w-3/4 mb-6 rounded"></div>
          <div className="h-4 bg-slate-200 w-48 mb-8 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 w-full rounded"></div>
            <div className="h-4 bg-slate-200 w-full rounded"></div>
            <div className="h-4 bg-slate-200 w-5/6 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Error / 404 state handling
  if (error) {
    return (
      <div className="knowledge-detail-container min-h-screen pt-32 px-6 md:px-16 lg:px-24 bg-background flex flex-col items-center justify-center text-center">
        <div className="max-w-md mx-auto py-20 bg-white border border-border rounded-2xl px-6">
          <h2 className="text-3xl font-black text-foreground mb-4">Article Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The requested knowledge article doesn't exist or could not be retrieved due to an error. (Error: {error})
          </p>
          <Link
            to="/knowledge"
            data-testid="back-to-hub"
            className="back-to-hub px-6 py-2.5 rounded-full border border-black bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
          >
            Back to Hub
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="knowledge-detail-container min-h-screen pt-32 pb-32 px-6 md:px-16 lg:px-24 bg-background text-foreground">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          to="/knowledge"
          data-testid="back-to-hub"
          className="back-to-hub inline-flex items-center gap-2 mb-12 label-mono text-muted-foreground hover:text-foreground transition-colors group text-xs font-mono font-semibold"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>

        {/* Metadata Block */}
        <div className="metadata-container article-metadata flex items-center gap-4 mb-8 text-xs font-mono text-muted-foreground">
          <span
            data-testid="category-badge"
            className="category tag font-bold tracking-[0.15em] uppercase px-2 py-1 bg-slate-100 text-slate-600 rounded animate-none"
          >
            {metadata?.category || 'Framework'}
          </span>
          <span className="date publish-date">{metadata?.date || 'APR 2026'}</span>
          {metadata?.readTime && (
            <>
              <span>•</span>
              <span className="read-time">{metadata.readTime}</span>
            </>
          )}
        </div>

        {/* Article content wrapped in prose for Tailwind Typography */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-slate lg:prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
        >
          <ReactMarkdown skipHtml={true}>{markdown}</ReactMarkdown>
        </motion.article>
      </div>
    </div>
  )
}
