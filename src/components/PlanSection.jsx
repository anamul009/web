import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Star, Gem } from 'lucide-react'
import { Reveal, GoldLine, SectionLabel } from './ConceptSection'

const PLANS = [
  {
    id: 'A',
    name: 'Lumière',
    nameJa: 'ルミエール',
    price: '¥ 3,800,000~',
    priceNote: '30名様より',
    tag: 'MOST POPULAR',
    features: [
      'Grand Chapel Ceremony',
      'Gourmet 5-Course Dinner',
      'Bridal Suite for 1 Night',
      'Professional Photography',
      'Floral Centrepieces',
    ],
    icon: Star,
    highlight: false,
  },
  {
    id: 'B',
    name: 'Prestige',
    nameJa: 'プレステージ',
    price: '¥ 5,500,000~',
    priceNote: '50名様より',
    tag: 'SIGNATURE',
    features: [
      'Grand Chapel + Garden Ceremony',
      'Michelin-Star 7-Course Banquet',
      'Honeymoon Suite — 2 Nights',
      'Video Cinematic Package',
      'Full Floral Styling',
      'Bridal Fitting Session',
    ],
    icon: Gem,
    highlight: true,
  },
  {
    id: 'C',
    name: 'Élégance',
    nameJa: 'エレガンス',
    price: '¥ 2,200,000~',
    priceNote: '20名様より',
    tag: 'INTIMATE',
    features: [
      'Private Chapel Ceremony',
      'Gourmet 3-Course Dinner',
      'Welcome Floral Bouquet',
      'Wedding Cake',
      'One-Night Stay',
    ],
    icon: Sparkles,
    highlight: false,
  },
]

/* ── Single plan card ── */
const PlanCard = ({ plan, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const Icon = plan.icon

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col border group cursor-pointer transition-all duration-700 ${
        plan.highlight
          ? 'border-champagne/60 bg-gradient-to-b from-champagne/8 to-transparent'
          : 'border-luxury-white/10 hover:border-champagne/30'
      }`}
      style={{ padding: plan.highlight ? '2.5rem 2rem' : '2rem 1.75rem' }}
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      whileHover={!plan.highlight ? { y: -6 } : {}}
    >
      {/* Tag */}
      <div className="flex items-center justify-between mb-6">
        <span
          className={`font-sans text-xs border px-3 py-1 ${
            plan.highlight
              ? 'border-champagne text-champagne'
              : 'border-luxury-white/20 text-luxury-white/40'
          }`}
          style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}
        >
          {plan.tag}
        </span>
        <Icon size={16} className={plan.highlight ? 'text-champagne' : 'text-luxury-white/30'} />
      </div>

      {/* Plan ID accent */}
      <span
        className="font-serif text-champagne/25 absolute top-6 right-6"
        style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1 }}
      >
        {plan.id}
      </span>

      {/* Name */}
      <h3
        className={`font-serif mb-1 ${plan.highlight ? 'text-luxury-white' : 'text-luxury-white/80'}`}
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300, letterSpacing: '0.1em' }}
      >
        {plan.name}
      </h3>
      <span
        className="font-sans font-light text-luxury-white/35 mb-8 block"
        style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}
      >
        {plan.nameJa}
      </span>

      {/* Divider */}
      <GoldLine className={`mb-8 ${plan.highlight ? 'opacity-60' : 'opacity-25'}`} />

      {/* Feature list */}
      <ul className="flex flex-col gap-3 flex-1 mb-8">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 font-sans font-light text-luxury-white/55"
            style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}
          >
            <span className="text-champagne mt-0.5 flex-shrink-0">—</span>
            {f}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mt-auto pt-6 border-t border-luxury-white/10">
        <p
          className={`font-serif mb-1 ${plan.highlight ? 'text-champagne' : 'text-luxury-white/70'}`}
          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 300 }}
        >
          {plan.price}
        </p>
        <p
          className="font-sans font-light text-luxury-white/30"
          style={{ fontSize: '0.58rem', letterSpacing: '0.1em' }}
        >
          {plan.priceNote}（税・サービス料込）
        </p>
      </div>

      {/* CTA */}
      <motion.button
        className={`mt-6 w-full py-3 font-sans font-light transition-all duration-500 ${
          plan.highlight
            ? 'bg-champagne text-luxury-black hover:bg-champagne-light'
            : 'border border-luxury-white/20 text-luxury-white/60 hover:border-champagne/50 hover:text-champagne'
        }`}
        style={{ fontSize: '0.58rem', letterSpacing: '0.22em' }}
        whileHover={{ scale: 1.01 }}
      >
        ENQUIRE NOW
      </motion.button>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PLAN SECTION
───────────────────────────────────────────────────────────── */
const PlanSection = () => {
  return (
    <section
      id="plan"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #111111 0%, #0d0d0d 100%)' }}
    >
      {/* Subtle gold radial glow background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '80vw',
          height: '80vw',
          maxWidth: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197,160,89,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <SectionLabel en="WEDDING PLANS" ja="ウェディングプラン" delay={0.1} />
          <Reveal delay={0.2}>
            <h2
              className="font-serif text-luxury-white"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 300,
                letterSpacing: '0.1em',
              }}
            >
              Choose Your Perfect
              <br />
              <em style={{ color: 'rgba(197,160,89,0.85)' }}>Beginning</em>
            </h2>
          </Reveal>
        </div>

        {/* Cards — staggered grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {/* Prestige in centre — slightly elevated */}
          {[PLANS[0], PLANS[1], PLANS[2]].map((plan, i) => (
            <div
              key={plan.id}
              className={plan.highlight ? 'md:-mt-6 md:-mb-6' : ''}
            >
              <PlanCard plan={plan} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <Reveal delay={0.4} className="mt-14 text-center">
          <p
            className="font-sans font-light text-luxury-white/30"
            style={{ fontSize: '0.62rem', letterSpacing: '0.1em' }}
          >
            All plans are fully customisable. Please contact our bridal team for a personal consultation.
            <br />
            ブライダルチームが最高のウェディングをお手伝いします。
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default PlanSection
