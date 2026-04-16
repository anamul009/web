import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Reveal, GoldLine, SectionLabel } from './ConceptSection'

const SPACES = [
  {
    id: '01',
    title: 'The Grand Chapel',
    titleJa: 'グランドチャペル',
    desc: '自然光が差し込む神聖なチャペルで、永遠の誓いを。A consecrated sanctuary bathed in natural light.',
    img: '/img/chapel.jpg',
    tag: 'CHAPEL',
    wide: true,
  },
  {
    id: '02',
    title: 'Banquet Hall',
    titleJa: 'バンケットホール',
    desc: '200名様まで収容可能な格調高いバンケットルーム。',
    img: '/img/party.jpg',
    tag: 'BANQUET',
    wide: false,
  },
  {
    id: '03',
    title: 'Fine Dining',
    titleJa: 'ファインダイニング',
    desc: 'ゲストの感動を彩る珠玉のフレンチキュイジーヌ。',
    img: '/img/plate.jpg',
    tag: 'CUISINE',
    wide: false,
  },
  {
    id: '04',
    title: 'The Club Lounge',
    titleJa: 'クラブラウンジ',
    desc: 'プライベートなひとときを過ごすための専用ラウンジ。',
    img: '/img/yata.jpg',
    tag: 'LOUNGE',
    wide: false,
  },
]

/* ── Single space card ── */
const SpaceCard = ({ space, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image with scale-up hover */}
      <div className="img-hover-zoom w-full" style={{ aspectRatio: space.wide ? '16/9' : '4/5' }}>
        <img
          src={space.img}
          alt={space.title}
          className="w-full h-full object-cover"
        />

        {/* Dark vignette bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/10 to-transparent" />
      </div>

      {/* Tag pill — top left */}
      <div
        className="absolute top-5 left-5 border border-champagne/50 px-3 py-1"
        style={{ fontSize: '0.48rem', letterSpacing: '0.25em', color: '#C5A059' }}
      >
        {space.tag}
      </div>

      {/* Number — top right */}
      <div
        className="absolute top-4 right-5 font-serif text-luxury-white/25"
        style={{ fontSize: '2.5rem', fontWeight: 300, lineHeight: 1 }}
      >
        {space.id}
      </div>

      {/* Content overlay bottom */}
      <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
        {/* Vertical JP text on hover */}
        <motion.span
          className="vertical-text text-champagne/60 font-sans absolute right-5 bottom-24 hidden md:block"
          style={{ fontSize: '0.45rem', letterSpacing: '0.25em' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {space.titleJa}
        </motion.span>

        <h3
          className="font-serif text-luxury-white mb-2"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', letterSpacing: '0.08em', fontWeight: 300 }}
        >
          {space.title}
        </h3>

        {/* Animated underline on hover */}
        <div className="w-0 h-px bg-champagne group-hover:w-10 transition-all duration-600 mb-3" />

        <p
          className="font-sans font-light text-luxury-white/50 leading-relaxed"
          style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}
        >
          {space.desc}
        </p>

        {/* Arrow link */}
        <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-champagne font-sans" style={{ fontSize: '0.52rem', letterSpacing: '0.2em' }}>
            VIEW DETAILS
          </span>
          <div className="w-6 h-px bg-champagne" />
        </div>
      </div>

      {/* Corner accents on hover */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-champagne/0 group-hover:border-champagne/60 transition-all duration-500" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-champagne/0 group-hover:border-champagne/60 transition-all duration-500" />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SPACE SECTION — asymmetric CSS Grid layout
───────────────────────────────────────────────────────────── */
const SpaceSection = () => {
  return (
    <section
      id="space"
      className="relative bg-luxury-black py-28 md:py-40 overflow-hidden"
    >
      {/* Ghost BG text */}
      <div
        className="absolute bottom-8 right-0 select-none pointer-events-none text-right leading-none"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(5rem, 16vw, 15rem)',
          color: 'rgba(197,160,89,0.035)',
          fontWeight: 300,
        }}
      >
        SPACE
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-16">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
          <div>
            <SectionLabel en="OUR SPACES" ja="会場" delay={0.1} />
            <Reveal delay={0.2}>
              <h2
                className="font-serif text-luxury-white leading-tight"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                }}
              >
                Curated Venues
                <br />
                <em style={{ color: 'rgba(249,249,247,0.5)' }}>for Every Moment</em>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="mt-8 md:mt-0">
            <a
              href="#"
              className="inline-flex items-center gap-4 font-sans font-light text-champagne group"
              style={{ fontSize: '0.6rem', letterSpacing: '0.22em' }}
            >
              ALL SPACES
              <span className="block w-8 h-px bg-champagne group-hover:w-16 transition-all duration-700" />
            </a>
          </Reveal>
        </div>

        {/* ── BROKEN GRID ──
            Desktop: [  WIDE (col 1-2)  ] [ TALL (col 3) ]
                     [ SQ (col 1) ][ SQ (col 2) ]
            Mobile: single column        */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          style={{ gridTemplateRows: 'auto auto' }}
        >
          {/* Wide card — chapel */}
          <div className="md:col-span-2 md:row-span-1">
            <SpaceCard space={SPACES[0]} index={0} />
          </div>

          {/* Tall card — party, offset downward via margin */}
          <div className="md:row-span-2 md:mt-16">
            <SpaceCard space={SPACES[1]} index={1} />
          </div>

          {/* Bottom two cards */}
          <div>
            <SpaceCard space={SPACES[2]} index={2} />
          </div>
          <div>
            <SpaceCard space={SPACES[3]} index={3} />
          </div>
        </div>

        {/* Horizontal gold rule */}
        <Reveal delay={0.2} className="mt-20 md:mt-28">
          <div className="flex items-center gap-6">
            <GoldLine className="flex-1" />
            <span
              className="font-sans font-light text-champagne/50"
              style={{ fontSize: '0.5rem', letterSpacing: '0.3em' }}
            >
              CITY CLUB OF TOKYO
            </span>
            <GoldLine className="flex-1" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default SpaceSection
