import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import { Linkedin, Instagram } from './BrandIcons'
import starPng from '../assets/logo_star.png'

const NAV = [
  { label: 'About',     href: '/#about' },
  { label: 'Events',    href: '/#events' },
  { label: 'Roadmap',   href: '/#roadmap' },
  { label: 'Team',      href: '/#team' },
]

const SOCIAL = [
  { label: 'LinkedIn',  icon: Linkedin,  href: 'https://www.linkedin.com/company/prodcast-iimu/' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/prodcast_iimu' },
  { label: 'Email',     icon: Mail,      href: 'mailto:prodcast@iimu.ac.in' },
]

export default function Footer() {
  return (
    <footer className="relative pt-28 pb-8 px-6 md:px-16 lg:px-24 overflow-hidden" style={{ background: '#060C18' }}>
      {/* Blend from Team */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0A1628, transparent)' }} />
      {/* Glow */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(77,186,255,0.1) 0%, transparent 65%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Top: CTA + columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-20">
          {/* Left: brand + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={starPng} alt="" className="w-9 h-9 object-contain" style={{ filter: 'drop-shadow(0 0 6px rgba(77,186,255,0.5))' }} />
              <div className="leading-none">
                <p className="font-black tracking-[-0.03em] text-lg text-ice">PRODCAST</p>
                <p className="font-mono text-[0.55rem] tracking-[0.2em] text-sky/60 mt-0.5">IIM UDAIPUR</p>
              </div>
            </div>
            <h3 className="font-black tracking-tight text-ice leading-[1.1] mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
              Want to build with us?
            </h3>
            <a href="mailto:prodcast@iimu.ac.in" className="btn-primary inline-flex items-center gap-2">
              Connect With Us <ArrowUpRight size={16} />
            </a>
          </motion.div>

          {/* Right: link columns */}
          <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            <div>
              <p className="label-mono mb-4">Explore</p>
              <ul className="flex flex-col gap-3">
                {NAV.map(n => (
                  <li key={n.label}>
                    <a href={n.href} className="text-ice/60 hover:text-ice transition-colors text-sm">{n.label}</a>
                  </li>
                ))}
                <li>
                  <Link to="/knowledge" className="text-ice/60 hover:text-ice transition-colors text-sm">Knowledge</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="label-mono mb-4">Connect</p>
              <ul className="flex flex-col gap-3">
                {SOCIAL.map(s => {
                  const Icon = s.icon
                  return (
                    <li key={s.label}>
                      <a href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer"
                        className="flex items-center gap-2 text-ice/60 hover:text-ice transition-colors text-sm group">
                        <Icon size={15} className="text-sky/70 group-hover:text-sky transition-colors" />
                        {s.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Massive watermark */}
        <div className="relative w-full text-center select-none pointer-events-none">
          <h2 className="font-black leading-none" style={{ fontSize: 'clamp(3.5rem, 16vw, 16rem)', letterSpacing: '-0.06em', color: 'rgba(77,186,255,0.05)' }}>
            PRODCAST
          </h2>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 mt-4 border-t" style={{ borderColor: 'rgba(77,186,255,0.1)' }}>
          <p className="label-mono">&copy; 2026 PRODCAST · IIM UDAIPUR</p>
          <p className="label-mono">Navigate Ambiguity · Create Impact</p>
        </div>
      </div>
    </footer>
  )
}
