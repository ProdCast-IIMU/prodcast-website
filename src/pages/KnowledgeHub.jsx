import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function KnowledgeHub() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const selectedCategory = searchParams.get('category') || ''

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Fetch index.json dynamically
  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetch('/knowledge/index.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load articles index')
        }
        return res.json()
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Malformed index structure')
        }
        if (active) {
          setArticles(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (active) {
          setError(err.message || 'Failed to load index')
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const handleSearchChange = (e) => {
    const val = e.target.value
    const nextParams = Object.fromEntries(searchParams.entries())
    if (val) {
      nextParams.search = val
    } else {
      delete nextParams.search
    }
    setSearchParams(nextParams)
  }

  const handleCategoryClick = (category) => {
    const nextParams = Object.fromEntries(searchParams.entries())
    if (selectedCategory === category) {
      delete nextParams.category
    } else {
      nextParams.category = category
    }
    setSearchParams(nextParams)
  }

  // Get unique categories from articles database dynamically
  const categories = Array.from(
    new Set(articles.map(article => article.category).filter(Boolean))
  )

  // Filter articles based on selectedCategory AND searchQuery (case-insensitive)
  const filteredArticles = articles.filter(article => {
    const query = searchQuery.toLowerCase().trim()
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    
    const titleText = article.title ? article.title.toLowerCase() : ''
    const summaryText = article.summary ? article.summary.toLowerCase() : ''
    const excerptText = article.excerpt ? article.excerpt.toLowerCase() : ''
    const matchesSearch = !query || 
      titleText.includes(query) || 
      summaryText.includes(query) || 
      excerptText.includes(query)

    return matchesCategory && matchesSearch
  })

  // Loading state (shimmer/pulse skeleton card grid)
  if (loading) {
    return (
      <div data-testid="loading" className="min-h-screen pt-32 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-[1400px] mx-auto">
          <div className="animate-pulse mb-20">
            <div className="h-4 bg-slate-200 w-32 mb-4 rounded"></div>
            <div className="h-16 bg-slate-200 w-96 rounded mb-6"></div>
            <div className="h-4 bg-slate-200 w-128 rounded max-w-lg"></div>
          </div>
          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="animate-pulse border border-border p-8 rounded-lg flex flex-col justify-between h-80 bg-white">
                <div>
                  <div className="flex justify-between mb-8">
                    <div className="h-4 bg-slate-200 w-20 rounded"></div>
                    <div className="h-4 bg-slate-200 w-16 rounded"></div>
                  </div>
                  <div className="h-6 bg-slate-200 w-3/4 rounded mb-4"></div>
                  <div className="h-4 bg-slate-200 w-full rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 w-5/6 rounded"></div>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <div className="h-4 bg-slate-200 w-12 rounded"></div>
                  <div className="h-4 bg-slate-200 w-24 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error state UI
  if (error) {
    return (
      <div className="min-h-screen pt-32 px-6 md:px-16 lg:px-24 bg-background flex items-center justify-center text-center">
        <div className="max-w-md mx-auto py-20 bg-white border border-border rounded-2xl px-6">
          <h2 className="text-2xl font-black text-foreground mb-4">Error Loading Knowledge Base</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <p className="label-mono mb-4 text-primary">LEARNING CENTER</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground">
            Knowledge Hub.
          </h1>
          <p className="mt-6 text-lg max-w-2xl text-muted-foreground font-light">
            Frameworks, cheat sheets, and deep dives into the mechanics of product management.
          </p>
        </div>

        {/* Controls: Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border pb-8">
          {/* Search Box */}
          <div className="w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const isActive = selectedCategory === category
              const categoryClass = `tag-filter-${category.toLowerCase().replace(/\s+/g, '-')}`
              return (
                <button
                  key={category}
                  data-testid={`category-filter-${category.replace(/\s+/g, '-')}`}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full border text-xs font-mono transition-all uppercase tracking-wider ${categoryClass} ${
                    isActive
                      ? 'bg-black text-white border-black font-semibold'
                      : 'bg-white text-muted-foreground border-border hover:border-black hover:text-black'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Section with Slate background grid container */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-border rounded-2xl">
            <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                data-testid="article-card"
                className="article-card bento-card p-8 flex flex-col justify-between h-full bg-white border border-border rounded-xl group transition-all hover:border-primary"
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    {/* Date */}
                    <span className="date publish-date label-mono text-muted-foreground text-xs">
                      {article.date || 'No Date'}
                    </span>
                    {/* Category Tag Badge */}
                    <span
                      data-testid="category-badge"
                      className="category tag font-mono text-[0.65rem] font-bold tracking-[0.15em] uppercase px-2 py-1 bg-slate-100 text-slate-600 rounded"
                    >
                      {article.category}
                    </span>
                  </div>

                  <div>
                    {/* Title */}
                    <h3 className="title text-2xl font-black tracking-tight text-slate-900 mb-3 group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </h3>
                    {/* Summary */}
                    <p className="text-sm text-slate-700 leading-relaxed font-light">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center pt-4 border-t border-slate-100">
                  {/* Read Time */}
                  <span className="read-time text-xs font-mono text-muted-foreground">
                    {article.readTime || 'N/A'}
                  </span>
                  {/* Article Link */}
                  <Link
                    to={`/knowledge/${article.id}`}
                    data-testid="article-card-link"
                    className="article-card-link text-xs font-mono font-bold uppercase tracking-wider text-primary group-hover:underline"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
