import React from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ConceptSection from './components/ConceptSection'
import SpaceSection from './components/SpaceSection'
import PlanSection from './components/PlanSection'
import GallerySection from './components/GallerySection'
import BridalFairSection from './components/BridalFairSection'
import Footer from './components/Footer'

/* ── Back-to-top button ── */
const BackToTop = () => (
  <motion.button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="fixed bottom-8 right-8 z-40 w-10 h-10 border border-champagne/40 flex items-center justify-center text-champagne/60 hover:text-champagne hover:border-champagne transition-all duration-500"
    whileHover={{ scale: 1.1 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3 }}
    aria-label="Back to top"
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  </motion.button>
)

const App = () => {
  return (
    <div className="bg-luxury-black min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ConceptSection />
        <SpaceSection />
        <PlanSection />
        <GallerySection />
        <BridalFairSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
