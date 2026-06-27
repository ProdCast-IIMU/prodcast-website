import React from 'react'
import { motion } from 'framer-motion'

/**
 * Subtle background motif — the brand triangle: three forces
 * (User · Business · Technology) meeting at a central North Star.
 * Faint, line-drawn, with gentle continuous motion:
 *   • whole figure breathes + drifts (no full spin)
 *   • the three nodes pulse in sequence
 *   • the orbit dashes slowly rotate
 *   • edges draw in once when scrolled into view
 */
export default function TriangleMotif({ size = 520, className = '', style = {} }) {
  // Vertices
  const A = { x: 200, y: 46,  tint: '#4DBAFF', label: 'USER' }       // apex
  const B = { x: 356, y: 320, tint: '#00E5C8', label: 'BUSINESS' }   // bottom-right
  const C = { x: 44,  y: 320, tint: '#9B8CFF', label: 'TECHNOLOGY' } // bottom-left
  const O = { x: 200, y: 229 }                                       // centroid

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.4, delay: i * 0.25, ease: 'easeInOut' }, opacity: { duration: 0.4, delay: i * 0.25 } },
    }),
  }

  const nodes = [A, B, C]

  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size * (360 / 400), ...style }}
      animate={{ y: [0, -10, 0], scale: [1, 1.015, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {/* Dashed orbit, slowly rotating */}
        <motion.ellipse
          cx={O.x} cy={O.y} rx="118" ry="62"
          stroke="rgba(77,186,255,0.14)" strokeWidth="1" strokeDasharray="4 7"
          style={{ transformOrigin: `${O.x}px ${O.y}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />

        {/* Triangle edges — draw in on view */}
        <motion.path
          d={`M${A.x},${A.y} L${B.x},${B.y} L${C.x},${C.y} Z`}
          stroke="rgba(77,186,255,0.22)" strokeWidth="1.2" strokeLinejoin="round"
          variants={draw} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
        />
        {/* Connectors to centre */}
        {nodes.map((n, i) => (
          <motion.line
            key={i}
            x1={n.x} y1={n.y} x2={O.x} y2={O.y}
            stroke="rgba(77,186,255,0.14)" strokeWidth="1" strokeDasharray="3 5"
            variants={draw} custom={i + 1} initial="hidden" whileInView="show" viewport={{ once: true }}
          />
        ))}

        {/* Pulsing nodes (sequenced) */}
        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={n.x} cy={n.y} r="16" fill={n.tint}
              animate={{ opacity: [0.05, 0.16, 0.05], scale: [1, 1.4, 1] }}
              transition={{ duration: 3.2, delay: i * 1.0, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            <motion.circle
              cx={n.x} cy={n.y} r="4" fill={n.tint}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3.2, delay: i * 1.0, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        ))}

        {/* Central North Star dot */}
        <motion.circle
          cx={O.x} cy={O.y} r="10" fill="rgba(77,186,255,0.18)"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.25, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${O.x}px ${O.y}px` }}
        />
        <circle cx={O.x} cy={O.y} r="3" fill="#F0F8FF" />
      </svg>
    </motion.div>
  )
}
