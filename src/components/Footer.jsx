import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import { Reveal, GoldLine } from './ConceptSection'

const FOOTER_LINKS = {
  'VENUE': ['Grand Chapel', 'Banquet Hall', 'Fine Dining', 'Club Lounge'],
  'WEDDING': ['Our Plans', 'Bridal Fair', 'Gallery', 'Testimonials'],
  'INFORMATION': ['Access & Map', 'Contact Us', 'FAQ', 'Privacy Policy'],
}

const Footer = () => {
  return (
    <footer
      id="access"
      className="relative bg-luxury-black pt-24 md:pt-32 pb-12 border-t"
      style={{ borderColor: 'rgba(197,160,89,0.2)' }}
    >
      {/* Map placeholder / dark overlay image */}
      <div className="absolute top-0 inset-x-0 h-56 md:h-72 overflow-hidden -mt-px">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/img/marble-bg.jpg')",
            filter: 'grayscale(100%) brightness(0.12)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-black/60 to-luxury-black" />
        {/* Map label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-sans font-light text-luxury-white/30 text-xs tracking-widest mb-2">
              LOCATION
            </p>
            <p className="font-serif text-luxury-white/60 text-xl tracking-wide">
              Otemachi, Tokyo
            </p>
            <p className="font-sans font-light text-champagne/50 text-xs tracking-widest mt-1">
              東京都千代田区大手町
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-56 md:mt-72 max-w-screen-xl mx-auto px-6 md:px-16">
        {/* Logo + tagline */}
        <Reveal delay={0.1} className="text-center mb-16">
          <img
            src="/img/logo.png"
            alt="City Club of Tokyo"
            className="h-12 md:h-16 w-auto object-contain mx-auto mb-6"
            style={{ filter: 'brightness(0) invert(1) opacity(0.7)' }}
          />
          <p
            className="font-serif italic text-luxury-white/30"
            style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', letterSpacing: '0.1em' }}
          >
            Where Love Becomes a Legacy
          </p>
          <GoldLine className="w-16 mx-auto mt-6 opacity-40" />
        </Reveal>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-16">
          {Object.entries(FOOTER_LINKS).map(([category, links], ci) => (
            <Reveal key={category} delay={ci * 0.1 + 0.2}>
              <h4
                className="font-sans font-light text-champagne mb-5"
                style={{ fontSize: '0.55rem', letterSpacing: '0.28em' }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans font-light text-luxury-white/40 hover:text-luxury-white/80 transition-colors duration-400"
                      style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Gold divider */}
        <GoldLine className="opacity-20 mb-10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p
            className="font-sans font-light text-luxury-white/25 text-center md:text-left"
            style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
          >
            © 2024 City Club of Tokyo. All rights reserved. シティクラブオブトウキョウ
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="text-luxury-white/30 hover:text-champagne transition-colors duration-400"
                whileHover={{ scale: 1.15 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          <a
            href="#"
            className="font-sans font-light text-luxury-white/25 hover:text-champagne transition-colors duration-400"
            style={{ fontSize: '0.55rem', letterSpacing: '0.15em' }}
          >
            BRIDAL FAIR RESERVATION →
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
