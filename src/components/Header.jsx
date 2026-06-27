import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import starPng from '../assets/logo_star.png'

const NAV_LINKS = [
  { label: 'ABOUT',     href: '/#about' },
  { label: 'EVENTS',    href: '/#events' },
  { label: 'KNOWLEDGE', href: '/knowledge', internal: true },
  { label: 'ROADMAP',   href: '/#roadmap' },
  { label: 'TEAM',      href: '/#team' },
]

export default function Header() {
  const location    = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isKnowledge = location.pathname.startsWith('/knowledge')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-3.5 flex items-center justify-between transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(6,12,24,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(77,186,255,0.1)' : '1px solid transparent',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            className="flex-shrink-0"
            style={{ filter: 'drop-shadow(0 0 6px rgba(77,186,255,0.5))' }}
            whileHover={{ scale: 1.12, rotate: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 16 }}
          >
            <img src={starPng} alt="ProdCast North Star" className="w-9 h-9 object-contain" />
          </motion.div>
          <div className="hidden md:flex flex-col leading-none">
            <span className="font-black tracking-[-0.04em] text-[1.1rem] text-ice leading-none">
              PRODCAST
            </span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize:'0.52rem', letterSpacing:'0.22em', color:'rgba(77,186,255,0.6)', marginTop:'2px' }}>
              IIM UDAIPUR
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => {
            const active = link.internal && isKnowledge
            return link.internal ? (
              <Link
                key={link.label}
                to={link.href}
                className="label-mono transition-colors duration-200"
                style={{ color: active ? '#4DBAFF' : 'rgba(240,248,255,0.45)' }}
                onMouseEnter={e => e.target.style.color = '#4DBAFF'}
                onMouseLeave={e => e.target.style.color = active ? '#4DBAFF' : 'rgba(240,248,255,0.45)'}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="label-mono transition-colors duration-200"
                style={{ color: 'rgba(240,248,255,0.45)' }}
                onMouseEnter={e => e.target.style.color = '#4DBAFF'}
                onMouseLeave={e => e.target.style.color = 'rgba(240,248,255,0.45)'}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* ── Right: CTA + Hamburger ── */}
        <div className="flex items-center gap-4">
          <a href="mailto:prodcast@iimu.ac.in" className="hidden md:block btn-primary !py-2 !px-5 text-xs">
            Connect With Us
          </a>
          <button
            className="md:hidden transition-colors duration-200"
            style={{ color: 'rgba(240,248,255,0.7)' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-12"
            style={{ background: 'rgba(6,12,24,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
          >
            {/* divider line */}
            <div className="glow-divider mb-10" />

            <nav className="flex flex-col gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: 'easeOut' }}
                >
                  {link.internal ? (
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-4xl font-black tracking-tight text-ice/80 hover:text-gradient transition-all"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-4xl font-black tracking-tight text-ice/80 hover:text-sky transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto">
              <div className="glow-divider mb-8" />
              <a href="mailto:prodcast@iimu.ac.in" className="btn-primary w-full text-sm">
                Connect With Us
              </a>
              <p className="mt-4 text-center" style={{ fontFamily:'JetBrains Mono', fontSize:'0.6rem', letterSpacing:'0.2em', color:'rgba(77,186,255,0.4)' }}>
                NAVIGATE AMBIGUITY · CREATE IMPACT
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
