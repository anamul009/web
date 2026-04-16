import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   SVG PATTERN MASK — diamond grid that "windows" the video
───────────────────────────────────────────────────────────── */
const DiamondMaskDef = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <pattern
        id="diamondPattern"
        x="0" y="0"
        width="80" height="80"
        patternUnits="userSpaceOnUse"
      >
        {/* Large centre diamond */}
        <polygon points="40,4 76,40 40,76 4,40" fill="white" opacity="1" />
        {/* Corner quarter-diamonds */}
        <polygon points="0,0 16,0 0,16" fill="white" opacity="0.6" />
        <polygon points="80,0 80,16 64,0" fill="white" opacity="0.6" />
        <polygon points="0,80 0,64 16,80" fill="white" opacity="0.6" />
        <polygon points="80,80 64,80 80,64" fill="white" opacity="0.6" />
      </pattern>
      <mask id="videoDiamondMask">
        <rect width="100%" height="100%" fill="url(#diamondPattern)" />
      </mask>
    </defs>
  </svg>
)

/* ─────────────────────────────────────────────────────────────
   GRAND OPEN BADGE — spinning ring + centre text
───────────────────────────────────────────────────────────── */
const GrandOpenBadge = () => {
  const text = 'GRAND OPEN · CITY CLUB OF TOKYO · '
  const chars = text.split('')
  const radius = 44
  const circumference = 2 * Math.PI * radius

  return (
    <motion.div
      className="absolute bottom-12 right-8 md:bottom-16 md:right-14 z-30 w-28 h-28 md:w-32 md:h-32 cursor-pointer"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.9, ease: 'easeOut' }}
      whileHover={{ scale: 1.08 }}
    >
      {/* Outer spinning text ring */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path
            id="circlePath"
            d={`M 50 50 m -${radius} 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          fill="#C5A059"
          fontSize="7.2"
          letterSpacing="2.1"
          fontFamily="Montserrat, sans-serif"
          fontWeight="300"
        >
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </motion.svg>

      {/* Centre: thin gold circle + label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-champagne/60 flex flex-col items-center justify-center">
          <span
            className="text-champagne font-serif italic"
            style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
          >
            GRAND
          </span>
          <span
            className="text-luxury-white font-sans font-light"
            style={{ fontSize: '0.45rem', letterSpacing: '0.2em' }}
          >
            OPEN
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SCROLL INDICATOR — animated vertical line
───────────────────────────────────────────────────────────── */
const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.2, duration: 1 }}
  >
    <span
      className="text-luxury-white/50 font-sans font-light tracking-widest2"
      style={{ fontSize: '0.55rem', writingMode: 'horizontal-tb' }}
    >
      SCROLL
    </span>
    <div className="relative w-px overflow-hidden" style={{ height: '72px' }}>
      <div className="absolute inset-x-0 top-0 h-full bg-luxury-white/20" />
      <motion.div
        className="absolute inset-x-0 top-0 bg-champagne"
        style={{ height: '100%' }}
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </motion.div>
)

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
const HeroSection = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: pattern slowly drifts up as user scrolls
  const patternY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  // Overlay opacity increases on scroll for cinematic fade
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.1, 0.85])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-luxury-black"
      style={{ height: '100svh', minHeight: '700px' }}
    >
      {/* SVG Mask Definition (invisible) */}
      <DiamondMaskDef />

      {/* ── MATTE BLACK BACKGROUND ── */}
      <div className="absolute inset-0 bg-luxury-black z-0" />

      {/* ── PATTERN-MASKED VIDEO / IMAGE LAYER ── */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ y: patternY }}
      >
        {/* The video element — only visible through the SVG mask */}
        <div
          className="w-full h-full"
          style={{ mask: 'url(#videoDiamondMask)', WebkitMask: 'url(#videoDiamondMask)' }}
        >
          {/* Fallback full-panel image (chapel) behind video */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/img/chapel.jpg')" }}
          />

          {/* Cinematic video — swap src for real 4K asset */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/img/chapel.jpg"
            onLoadedData={() => setVideoLoaded(true)}
          >
            {/* Drop your video file into /public/video/ and update src */}
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Subtle gold gradient vignette over the pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(197,160,89,0.04) 0%, rgba(17,17,17,0.6) 100%)',
          }}
        />
      </motion.div>

      {/* ── SCROLL DIMMING OVERLAY ── */}
      <motion.div
        className="absolute inset-0 bg-luxury-black z-20 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* ── DECORATIVE HAIR-THIN GOLD LINES ── */}
      <div className="absolute inset-x-12 md:inset-x-24 top-[15%] bottom-[15%] z-25 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 border-t border-champagne/20" />
        <div className="absolute bottom-0 left-0 right-0 border-b border-champagne/20" />
        <div className="absolute top-0 bottom-0 left-0 border-l border-champagne/20" />
        <div className="absolute top-0 bottom-0 right-0 border-r border-champagne/20" />
        {/* Corner accent marks */}
        {[
          'top-0 left-0',
          'top-0 right-0',
          'bottom-0 left-0',
          'bottom-0 right-0',
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-4 h-4 border-champagne/60`}
            style={{
              borderTop:    pos.includes('top')    ? '1px solid #C5A059' : 'none',
              borderBottom: pos.includes('bottom') ? '1px solid #C5A059' : 'none',
              borderLeft:   pos.includes('left')   ? '1px solid #C5A059' : 'none',
              borderRight:  pos.includes('right')  ? '1px solid #C5A059' : 'none',
            }}
          />
        ))}
      </div>

      {/* ── CENTRED LOGO & HEADLINE ── */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="mb-10"
        >
          <img
            src="/img/logo.png"
            alt="City Club of Tokyo"
            className="h-16 md:h-20 w-auto object-contain mx-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>

        {/* Eyebrow line */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.6, delay: 0.7 }}
          className="text-champagne font-sans font-light mb-6"
          style={{ fontSize: '0.6rem' }}
        >
          CITY CLUB OF TOKYO
        </motion.p>

        {/* Main serif headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-luxury-white"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            fontWeight: 300,
            letterSpacing: '0.12em',
            lineHeight: 1.05,
          }}
        >
          Eternal Vows
        </motion.h1>

        {/* Italic sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="font-serif italic text-luxury-white/60 mt-4"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', letterSpacing: '0.06em' }}
        >
          in the Heart of Tokyo
        </motion.p>

        {/* Hair-thin divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1.5 }}
          className="mt-8 origin-left"
          style={{ width: '120px', height: '0.5px', background: '#C5A059' }}
        />

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          whileHover={{ backgroundColor: '#C5A059', color: '#111111', scale: 1.02 }}
          className="mt-10 px-10 py-3 border font-sans font-light text-luxury-white transition-all duration-700"
          style={{
            borderColor: 'rgba(197,160,89,0.5)',
            fontSize: '0.65rem',
            letterSpacing: '0.28em',
          }}
        >
          BRIDAL FAIR 2024
        </motion.button>
      </div>

      {/* ── VERTICAL SIDE TEXT (JP aesthetic) ── */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 z-30 hidden md:flex flex-col items-center gap-4">
        <div className="w-px bg-champagne/30" style={{ height: '60px' }} />
        <span
          className="vertical-text text-luxury-white/30 font-sans font-light"
          style={{ fontSize: '0.5rem', letterSpacing: '0.3em' }}
        >
          WEDDING & BANQUET
        </span>
        <div className="w-px bg-champagne/30" style={{ height: '60px' }} />
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-30 hidden md:flex flex-col items-center gap-4">
        <div className="w-px bg-champagne/30" style={{ height: '60px' }} />
        <span
          className="vertical-text text-luxury-white/30 font-sans font-light"
          style={{ fontSize: '0.5rem', letterSpacing: '0.3em' }}
        >
          シティクラブオブトウキョウ
        </span>
        <div className="w-px bg-champagne/30" style={{ height: '60px' }} />
      </div>

      {/* ── FLOATING GRAND OPEN BADGE ── */}
      <GrandOpenBadge />

      {/* ── SCROLL INDICATOR ── */}
      <ScrollIndicator />
    </section>
  )
}

export default HeroSection
