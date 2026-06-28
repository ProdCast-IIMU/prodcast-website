import React from 'react'
import { motion } from 'framer-motion'
import { Instagram } from './BrandIcons'
import { textReveal } from '../lib/motion'

const FEED_ID = 'DUWkXuPUGwp9Zp39Oi3d'

export default function InstagramSection() {
  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(77,186,255,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          variants={textReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div>
            <p className="section-num mb-3">06 / FOLLOW ALONG</p>
            <h2
              className="font-black tracking-[-0.03em] text-ice leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
            >
              We post the{' '}
              <span className="text-gradient">good stuff.</span>
            </h2>
          </div>

          <a
            href="https://instagram.com/prodcast_iimu"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 self-start md:self-auto btn-ghost !px-5 !py-2.5 text-sm"
          >
            <Instagram size={16} style={{ color: '#4DBAFF' }} />
            <span>@prodcast_iimu</span>
          </a>
        </motion.div>

        {/* Behold widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* @ts-ignore — web component */}
          <behold-widget feed-id={FEED_ID} />
        </motion.div>
      </div>
    </section>
  )
}
