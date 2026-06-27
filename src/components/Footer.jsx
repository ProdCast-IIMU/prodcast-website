import React from 'react'

export default function Footer() {
  return (
    <footer className="pt-32 pb-8 px-6 md:px-16 lg:px-24 bg-white relative overflow-hidden flex flex-col justify-between">
      <div className="max-w-[1400px] mx-auto w-full relative z-10 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="label-mono text-black/40">
              INDIAN INSTITUTE OF MANAGEMENT UDAIPUR
            </p>
            <p className="label-mono mt-1 text-black">PRODUCT MANAGEMENT CLUB</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="label-mono text-black/40 hover:text-black transition-colors duration-200">LINKEDIN</a>
            <a href="#" className="label-mono text-black/40 hover:text-black transition-colors duration-200">INSTAGRAM</a>
            <a href="#" className="label-mono text-black/40 hover:text-black transition-colors duration-200">EMAIL</a>
          </div>
        </div>
      </div>

      {/* Massive watermark */}
      <div className="absolute bottom-16 left-0 right-0 w-full text-center select-none pointer-events-none z-0">
        <h2
          className="font-sans font-black leading-none text-black/5"
          style={{
            fontSize: 'clamp(4rem, 18vw, 20rem)',
            letterSpacing: '-0.06em',
          }}
        >
          PRODCAST
        </h2>
      </div>

      {/* Bottom bar overlaying watermark */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex justify-between items-center pt-6 border-t border-black/10">
        <p className="label-mono text-black/40">&copy; 2026 PRODCAST</p>
        <p className="label-mono text-black/40">GUIDED BY THE NORTH STAR</p>
      </div>
    </footer>
  )
}
