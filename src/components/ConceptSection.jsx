import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

/* ── Reusable scroll-reveal wrapper ── */
const Reveal = ({ children, delay = 0, y = 50, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ── Hair-thin gold divider ── */
const GoldLine = ({ className = '' }) => (
  <div className={`h-px bg-champagne/40 ${className}`} />
)

/* ── Section label ── */
const SectionLabel = ({ en, ja, delay = 0 }) => (
  <Reveal delay={delay} y={20} className="flex flex-col gap-2 mb-8">
    <span
      className="font-sans font-light text-champagne"
      style={{ fontSize: '0.58rem', letterSpacing: '0.3em' }}
    >
      {en}
    </span>
    <span
      className="font-serif text-luxury-white/40"
      style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
    >
      {ja}
    </span>
    <GoldLine className="w-10 mt-1" />
  </Reveal>
)

/* ─────────────────────────────────────────────────────────────
   CONCEPT SECTION — broken-grid editorial layout
───────────────────────────────────────────────────────────── */
const ConceptSection = () => {
  return (
    <section
      id="concept"
      className="relative bg-luxury-black py-28 md:py-40 overflow-hidden"
    >
      {/* Background large ghost text */}
      <div
        className="absolute top-0 left-0 select-none pointer-events-none"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(6rem, 18vw, 18rem)',
          color: 'rgba(197,160,89,0.04)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          fontWeight: 300,
          userSelect: 'none',
        }}
      >
        CONCEPT
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-16">
        {/* ── TOP ROW: text left | large image right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">
          {/* Text block */}
          <div className="lg:pt-24 lg:pr-16">
            <SectionLabel en="CONCEPT" ja="コンセプト" delay={0.1} />

            <Reveal delay={0.2}>
              <h2
                className="font-serif text-luxury-white leading-tight mb-8"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                  fontWeight: 300,
                  letterSpacing: '0.06em',
                }}
              >
                A Stage Born
                <br />
                <em>for Royalty</em>
              </h2>
            </Reveal>

            <Reveal delay={0.35}>
              <p
                className="font-sans font-light text-luxury-white/55 leading-loose mb-6"
                style={{ fontSize: '0.78rem', letterSpacing: '0.05em' }}
              >
                東京の中心地、大手町に佇む格式あるウェディングヴェニュー。
                伝統と革新が交差するこの場所で、あなただけの特別な一日が始まります。
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <p
                className="font-sans font-light text-luxury-white/45 leading-loose mb-12"
                style={{ fontSize: '0.78rem', letterSpacing: '0.05em' }}
              >
                Nestled in the prestigious heart of Otemachi, City Club of Tokyo
                offers an unrivalled setting where classical elegance meets
                contemporary Japanese refinement. Every detail is curated
                to ensure your celebration transcends the ordinary.
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <a
                href="#space"
                className="inline-flex items-center gap-4 group font-sans font-light text-champagne"
                style={{ fontSize: '0.6rem', letterSpacing: '0.22em' }}
              >
                DISCOVER MORE
                <span className="block w-8 h-px bg-champagne group-hover:w-16 transition-all duration-700" />
              </a>
            </Reveal>
          </div>

          {/* Large image — offset upward (broken grid) */}
          <Reveal delay={0.2} y={30}>
            <div
              className="img-hover-zoom relative lg:-mt-16"
              style={{ aspectRatio: '3/4', maxHeight: '620px' }}
            >
              <img
                src="/img/chapel.jpg"
                alt="Chapel"
                className="w-full h-full object-cover"
              />
              {/* Gold overlay corner */}
              <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-champagne/50" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-champagne/50" />

              {/* Floating number accent */}
              <div
                className="absolute -left-6 top-1/3 font-serif text-champagne/20"
                style={{ fontSize: '6rem', fontWeight: 300, lineHeight: 1 }}
              >
                01
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── BOTTOM ROW: small image left offset | text right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center mt-16 md:mt-0">
          {/* Small image — shifted right to create overlap */}
          <Reveal delay={0.1} y={40}>
            <div className="relative lg:col-start-1 lg:-mt-12 lg:ml-24">
              <div className="img-hover-zoom" style={{ aspectRatio: '4/3' }}>
                <img
                  src="/img/party.jpg"
                  alt="Banquet"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Overlapping year stamp */}
              <motion.div
                className="absolute -bottom-5 -right-5 bg-champagne px-5 py-3 hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <span
                  className="font-serif text-luxury-black"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}
                >
                  EST. 1985
                </span>
              </motion.div>
            </div>
          </Reveal>

          {/* Pull-quote text */}
          <Reveal delay={0.3} className="lg:pl-20 mt-12 lg:mt-0">
            <blockquote
              className="font-serif italic text-luxury-white/70 mb-8"
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                letterSpacing: '0.06em',
                lineHeight: 1.6,
                borderLeft: '0.5px solid rgba(197,160,89,0.4)',
                paddingLeft: '1.5rem',
              }}
            >
              "Where every whisper of love<br />
              becomes an eternal story"
            </blockquote>
            <p
              className="font-sans font-light text-champagne/70"
              style={{ fontSize: '0.58rem', letterSpacing: '0.2em' }}
            >
              — CITY CLUB OF TOKYO
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export { Reveal, GoldLine, SectionLabel }
export default ConceptSection
