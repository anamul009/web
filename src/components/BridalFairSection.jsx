import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Reveal, GoldLine, SectionLabel } from './ConceptSection'

const FAIRS = [
  { date: '2024.08.10', day: 'SAT', time: '11:00 / 14:00', slots: 'Remaining: 3', label: 'Summer Special' },
  { date: '2024.08.17', day: 'SAT', time: '11:00 / 14:00', slots: 'Remaining: 5', label: 'Venue Tour + Fair' },
  { date: '2024.08.24', day: 'SAT', time: '11:00 / 15:00', slots: 'Remaining: 2', label: 'Tasting Fair' },
  { date: '2024.09.07', day: 'SAT', time: '11:00 / 14:00', slots: 'Fully Booked',  label: 'Grand Fair' },
]

const BridalFairSection = () => {
  return (
    <section
      className="relative py-24 md:py-36"
      style={{
        background: 'linear-gradient(180deg, #0d0d0d 0%, #111111 100%)',
      }}
    >
      {/* Full-bleed marble image bg, very dark */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-luminosity"
        style={{ backgroundImage: "url('/img/marble-bg.jpg')" }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — headline */}
          <div>
            <SectionLabel en="BRIDAL FAIR" ja="ブライダルフェア" delay={0.1} />
            <Reveal delay={0.2}>
              <h2
                className="font-serif text-luxury-white mb-8"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  lineHeight: 1.15,
                }}
              >
                Experience the Magic
                <br />
                <em style={{ color: 'rgba(197,160,89,0.8)' }}>Before You Say Yes</em>
              </h2>
            </Reveal>

            <Reveal delay={0.35}>
              <p
                className="font-sans font-light text-luxury-white/45 leading-loose mb-10"
                style={{ fontSize: '0.78rem', letterSpacing: '0.05em' }}
              >
                会場の雰囲気を体感していただけるブライダルフェアを開催中。
                試食・試飲、チャペル見学、スタッフとの個別相談をご用意しています。
              </p>
            </Reveal>

            {/* Location badge */}
            <Reveal delay={0.4}>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={14} className="text-champagne" />
                <span
                  className="font-sans font-light text-luxury-white/50"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}
                >
                  東京都千代田区大手町 — Otemachi, Chiyoda, Tokyo
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <motion.a
                href="#"
                className="inline-flex items-center gap-4 bg-champagne text-luxury-black px-8 py-4 font-sans font-light"
                style={{ fontSize: '0.6rem', letterSpacing: '0.22em' }}
                whileHover={{
                  boxShadow: '0 0 28px rgba(197,160,89,0.4)',
                  scale: 1.02,
                }}
              >
                RESERVE YOUR VISIT
                <span className="w-5 h-px bg-luxury-black" />
              </motion.a>
            </Reveal>
          </div>

          {/* Right — fair schedule list */}
          <div>
            <Reveal delay={0.3}>
              <p
                className="font-sans font-light text-champagne mb-8"
                style={{ fontSize: '0.58rem', letterSpacing: '0.25em' }}
              >
                UPCOMING DATES
              </p>
            </Reveal>

            <div className="flex flex-col divide-y divide-luxury-white/8">
              {FAIRS.map((fair, i) => (
                <motion.div
                  key={i}
                  className="group flex items-center justify-between py-5 cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-5">
                    {/* Date block */}
                    <div className="text-center min-w-[52px]">
                      <p className="font-serif text-luxury-white text-lg leading-none">
                        {fair.date.split('.')[2]}
                      </p>
                      <p
                        className="font-sans font-light text-champagne/60 mt-1"
                        style={{ fontSize: '0.5rem', letterSpacing: '0.15em' }}
                      >
                        {fair.date.split('.').slice(0, 2).join('.')} {fair.day}
                      </p>
                    </div>

                    {/* Thin gold separator */}
                    <div className="w-px self-stretch bg-champagne/25 mx-2" />

                    {/* Info */}
                    <div>
                      <p
                        className="font-sans font-light text-luxury-white/80 mb-1"
                        style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}
                      >
                        {fair.label}
                      </p>
                      <div className="flex items-center gap-3">
                        <Clock size={10} className="text-champagne/50" />
                        <span
                          className="font-sans font-light text-luxury-white/40"
                          style={{ fontSize: '0.58rem', letterSpacing: '0.08em' }}
                        >
                          {fair.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Slots / arrow */}
                  <div className="text-right">
                    <span
                      className={`font-sans text-xs block mb-1 ${
                        fair.slots.includes('Fully')
                          ? 'text-luxury-white/25 line-through'
                          : 'text-champagne'
                      }`}
                      style={{ fontSize: '0.52rem', letterSpacing: '0.1em' }}
                    >
                      {fair.slots}
                    </span>
                    {!fair.slots.includes('Fully') && (
                      <span
                        className="font-sans font-light text-luxury-white/30 group-hover:text-champagne transition-colors duration-400"
                        style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}
                      >
                        BOOK →
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BridalFairSection
