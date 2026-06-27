import React from 'react'

export default function MissionVisionSection() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 bg-[#FAFAFA] border-t border-black/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        
        <div>
          <p className="label-mono mb-6 text-black/40">OUR MISSION</p>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-black">
            To forge product leaders who build with empathy, strategy, and relentless execution.
          </h3>
          <p className="mt-6 text-lg text-black/60 font-light leading-relaxed max-w-md">
            We believe that great products are born at the intersection of business viability, technical feasibility, and human desire.
          </p>
        </div>

        <div>
          <p className="label-mono mb-6 text-black/40">OUR VISION</p>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-black">
            To be the epicenter of product innovation across B-schools in Asia.
          </h3>
          <p className="mt-6 text-lg text-black/60 font-light leading-relaxed max-w-md">
            We are building a legacy where every member leaves equipped not just to manage products, but to define industries.
          </p>
        </div>

      </div>
    </section>
  )
}
