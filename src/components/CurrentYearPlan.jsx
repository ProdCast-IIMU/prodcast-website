import React from 'react'

const UPCOMING = [
  { id: 'EV/01', name: 'Product Summit', type: 'FLAGSHIP — COMING SOON', span: 'md:col-span-2 md:row-span-2' },
  { id: 'EV/02', name: 'Design Sprints', type: 'WORKSHOP SERIES', span: 'md:col-span-1 md:row-span-1' },
  { id: 'EV/03', name: 'Startup Hack', type: 'HACK / SPRINT', span: 'md:col-span-1 md:row-span-1' },
  { id: 'EV/04', name: 'Case Masters', type: 'COMPETITION', span: 'md:col-span-1 md:row-span-1' },
  { id: 'EV/05', name: 'PM Mixers', type: 'COMMUNITY BUILD', span: 'md:col-span-2 md:row-span-1' },
]

export default function CurrentYearPlan() {
  return (
    <section id="roadmap" className="py-32 px-6 md:px-16 lg:px-24 bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20">
          <p className="label-mono mb-4 text-black/40">03 / WHAT'S NEXT</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black">
            The year ahead.
          </h2>
          <p className="mt-6 text-lg max-w-xl text-black/60 font-light">
            A fresh lineup is loading. Each module unlocks as we ship it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-6">
          {UPCOMING.map((item) => (
            <div
              key={item.id}
              className={`bento-card p-8 flex flex-col justify-between group relative overflow-hidden ${item.span || ''}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold px-2 py-1 bg-black/5 text-black rounded-md font-mono">
                  {item.id}
                </span>
                <span className="label-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  25–26
                </span>
              </div>

              <div className="mt-auto relative z-10">
                <h3 className="text-3xl font-black tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300 text-black">
                  {item.name}
                </h3>
                <p className="label-mono text-black/50">{item.type}</p>
              </div>

              {/* Decorative hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
