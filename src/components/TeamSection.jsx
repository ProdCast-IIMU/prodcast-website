import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin } from './BrandIcons'
import { textReveal } from '../lib/motion'

import imgSaurabh   from '../assets/team_saurabh.jpg'
import imgAniket    from '../assets/team_aniket.jpg'
import imgHimanshu  from '../assets/team_himanshu.jpg'
import imgDelisha   from '../assets/team_delisha.jpg'
import imgVignesh   from '../assets/team_vignesh.jpg'
import imgAditi     from '../assets/team_aditi.jpg'
import imgAbhishek  from '../assets/team_abhishek.jpg'
import imgSarthak   from '../assets/team_sarthak.jpg'
import imgRuchika   from '../assets/team_ruchika.jpg'
import imgSomasurya from '../assets/team_somasurya.png'
import imgSuhani    from '../assets/team_suhani.jpg'

const TWO_YEAR = [
  {
    name: 'Saurabh Patil', role: 'President', cohort: '25–27', linkedin: 'https://www.linkedin.com/in/saurabh---patil', image: imgSaurabh,
    desc: 'Leads ProdCast\'s vision and strategy, steering the club to deliver real impact for IIMU\'s PM community.',
  },
  {
    name: 'Aniket Kumar', role: 'Vice President', cohort: '25–27', linkedin: '#', image: imgAniket,
    desc: 'Partners with the President on club strategy, overseeing cross-functional initiatives and team coordination.',
  },
  {
    name: 'Himanshu Bharara', role: 'Treasurer', cohort: '25–27', linkedin: '#', image: imgHimanshu,
    desc: 'Manages club finances and resource allocation, keeping every ProdCast initiative on track and well-funded.',
  },
  {
    name: 'Delisha Bansal', role: 'Events', cohort: '25–27', linkedin: '#', image: imgDelisha,
    desc: 'Plans and delivers ProdCast events end-to-end, from ideation to execution.',
  },
  {
    name: 'Vignesh Arun', role: 'Events', cohort: '25–27', linkedin: '#', image: imgVignesh,
    desc: 'Drives event logistics and ensures every session runs smoothly for participants.',
  },
  {
    name: 'Aditi Kakkar', role: 'Events', cohort: '25–27', linkedin: '#', image: imgAditi,
    desc: 'Crafts participant experiences across ProdCast workshops, competitions, and speaker sessions.',
  },
  {
    name: 'Abhishek Gupta', role: 'Events', cohort: '25–27', linkedin: '#', image: imgAbhishek,
    desc: 'Coordinates event operations, making sure every detail is in place before the lights go on.',
  },
  {
    name: 'Sarthak Taneja', role: 'Corporate Relations', cohort: '25–27', linkedin: '#', image: imgSarthak,
    desc: 'Builds and manages industry partnerships, bringing external expertise and opportunity into the club.',
  },
  {
    name: 'Ruchika Kshirsagar', role: 'Corporate Relations', cohort: '25–27', linkedin: '#', image: imgRuchika,
    desc: 'Connects ProdCast with the corporate world, driving speaker engagements and collaboration with product teams.',
  },
]

const ONE_YEAR = [
  {
    name: 'Somasurya Nanda', role: 'Events', cohort: '26–27', linkedin: '#', image: imgSomasurya,
    desc: 'Brings fresh energy to ProdCast events, supporting planning and execution across all activities.',
  },
  {
    name: 'Suhani Khandelwal', role: 'Social Media', cohort: '26–27', linkedin: '#', image: imgSuhani,
    desc: 'Manages ProdCast\'s social presence, curating content that amplifies the club\'s voice and reach on Instagram.',
  },
]

function MemberCard({ m, i, tint = '#4DBAFF' }) {
  return (
    <motion.div
      className="bento-card p-5 flex flex-col items-center text-center group overflow-hidden"
      initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (i % 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ border: `1px solid ${tint}44` }}>
        <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover object-top" />
      </div>
      <h4 className="font-bold text-ice text-sm leading-tight">{m.name}</h4>
      <p className="font-mono text-[0.58rem] tracking-[0.14em] uppercase mt-1.5" style={{ color: `${tint}BB` }}>
        {m.role}
      </p>
      <span className="mt-2 px-2 py-0.5 rounded-full font-mono text-[0.48rem] tracking-widest"
        style={{ background: `${tint}12`, color: `${tint}88`, border: `1px solid ${tint}22` }}>
        {m.cohort}
      </span>

      {/* Description — slides in on hover */}
      {m.desc && (
        <p
          className="mt-3 text-[0.65rem] leading-relaxed font-light max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300"
          style={{ color: 'rgba(240,248,255,0.55)' }}
        >
          {m.desc}
        </p>
      )}

      <a
        href={m.linkedin}
        target="_blank" rel="noreferrer"
        className="mt-4 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-50 group-hover:opacity-100"
        style={{ background: `${tint}10`, border: `1px solid ${tint}30` }}
        aria-label={`${m.name} on LinkedIn`}
      >
        <Linkedin size={13} style={{ color: tint }} />
      </a>
    </motion.div>
  )
}

export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative py-28 md:py-36 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #060C18, transparent)' }} />
      <div className="absolute -top-10 left-1/3 w-[460px] h-[460px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,200,0.07) 0%, transparent 65%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Heading */}
        <motion.div variants={textReveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="section-num mb-4">05 / THE TEAM</p>
          <h2 className="font-black tracking-[-0.03em] text-ice leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            The <span className="text-gradient">makers</span> behind ProdCast.
          </h2>
          <p className="mt-5 text-base md:text-lg max-w-xl font-light" style={{ color: 'rgba(240,248,255,0.55)' }}>
            A collective of curious builders, strategists and designers steering the club.
          </p>
        </motion.div>

        {/* Two Year MBA — 5 + 4 */}
        <div className="mt-14">
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-6" style={{ color: 'rgba(77,186,255,0.45)' }}>
            Two Year MBA · Batch 2025–27
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TWO_YEAR.map((m, i) => (
              <MemberCard key={m.name} m={m} i={i} tint="#4DBAFF" />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'rgba(0,229,200,0.12)' }} />
          <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(0,229,200,0.4)' }}>
            One Year MBA
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(0,229,200,0.12)' }} />
        </div>

        {/* One Year MBA — 2 centered */}
        <div>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-6 text-center" style={{ color: 'rgba(0,229,200,0.45)' }}>
            One Year MBA · Batch 2026–27
          </p>
          <div className="flex justify-center gap-4">
            {ONE_YEAR.map((m, i) => (
              <div key={m.name} className="w-full max-w-[200px]">
                <MemberCard m={m} i={i} tint="#00E5C8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
