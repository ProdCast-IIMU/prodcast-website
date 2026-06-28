import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import starPng from '../assets/logo_star.png'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#060C18' }}
    >
      {/* Star */}
      <motion.img
        src={starPng}
        alt=""
        className="w-20 h-20 object-contain mb-8"
        style={{ filter: 'drop-shadow(0 0 24px rgba(77,186,255,0.5))' }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0, scale: 0.6 }}
      />

      <motion.p
        className="section-num mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        404
      </motion.p>

      <motion.h1
        className="font-black tracking-[-0.04em] text-ice mb-4"
        style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
        initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Lost in the void.
      </motion.h1>

      <motion.p
        className="max-w-sm font-light mb-10"
        style={{ color: 'rgba(240,248,255,0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        This page doesn't exist. The North Star will guide you back.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
      >
        <Link to="/" className="btn-primary">Back to Home</Link>
      </motion.div>
    </div>
  )
}
