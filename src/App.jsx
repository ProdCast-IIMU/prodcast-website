import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

import Intro from './components/Intro'
import Header from './components/Header'
import ScrollProgress from './components/ScrollProgress'
import SectionDivider from './components/SectionDivider'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import GallerySection from './components/GallerySection'
import MissionVisionSection from './components/MissionVisionSection'
import CurrentYearPlan from './components/CurrentYearPlan'
import TeamSection from './components/TeamSection'
import InstagramSection from './components/InstagramSection'
import Footer from './components/Footer'
import FloatingGuide from './components/FloatingGuide'
import EventDetail from './pages/EventDetail'
import KnowledgeHub from './pages/KnowledgeHub'
import KnowledgeDetail from './pages/KnowledgeDetail'
import NotFound from './pages/NotFound'

function Home() {
  return (
    <>
      <HeroSection />
      <SectionDivider color="#0A1628" />
      <AboutSection />
      <SectionDivider color="#0A1628" flip />
      <GallerySection />
      <SectionDivider color="#060C18" />
      <MissionVisionSection />
      <SectionDivider color="#0A1628" flip />
      <CurrentYearPlan />
      <SectionDivider color="#060C18" />
      <TeamSection />
      <SectionDivider color="#0A1628" flip />
      <InstagramSection />
      <Footer />
      <FloatingGuide />
    </>
  )
}

/**
 * Background-location routing:
 *  - Home stays mounted for "/" and "/event/:id" → scroll is preserved,
 *    so opening/closing an event is a smooth overlay, not a page swap.
 *  - Knowledge pages replace Home.
 *  - EventDetail renders as an overlay on top of Home.
 */
function MainArea() {
  const location = useLocation()
  const path = location.pathname
  const isKnowledge = path.startsWith('/knowledge')
  const eventMatch = path.match(/^\/event\/(.+)$/)
  const eventId = eventMatch ? decodeURIComponent(eventMatch[1]) : null

  return (
    <>
      {!isKnowledge && <Home />}

      {isKnowledge && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={path}>
            <Route path="/knowledge" element={<KnowledgeHub />} />
            <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      )}

      {!isKnowledge && !eventId && path !== '/' && (
        <NotFound />
      )}

      <AnimatePresence>
        {eventId && <EventDetail key={eventId} id={eventId} />}
      </AnimatePresence>
    </>
  )
}

function App() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem('pc_intro_seen') === '1'
  })

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Bridge: framer-motion's useScroll listens for native scroll events,
    // which Lenis doesn't always emit — dispatch one on every Lenis tick so
    // all scroll-linked animations (parallax, events track, progress bar) update.
    lenis.on('scroll', () => window.dispatchEvent(new Event('scroll')))

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Expose for programmatic scrolls (e.g. Events filter snap-back)
    window.__lenis = lenis

    return () => {
      lenis.destroy()
      if (window.__lenis === lenis) delete window.__lenis
    }
  }, [])

  return (
    <BrowserRouter>
      {!introDone && (
        <Intro onDone={() => {
          sessionStorage.setItem('pc_intro_seen', '1')
          setIntroDone(true)
        }} />
      )}
      <div className="bg-background min-h-screen">
        <ScrollProgress />
        <Header />
        <MainArea />
      </div>
    </BrowserRouter>
  )
}

export default App
