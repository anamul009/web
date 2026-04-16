import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'CONCEPT',   href: '#concept' },
  { label: 'SPACE',     href: '#space' },
  { label: 'CEREMONY',  href: '#ceremony' },
  { label: 'PLAN',      href: '#plan' },
  { label: 'GALLERY',   href: '#gallery' },
  { label: 'ACCESS',    href: '#access' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-700"
        style={{
          background: scrolled
            ? 'rgba(17,17,17,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '0.5px solid rgba(197,160,89,0.2)' : 'none',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img
              src="/img/logo.png"
              alt="City Club of Tokyo"
              className="h-8 md:h-10 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative group font-sans text-luxury-white/70 hover:text-luxury-white transition-colors duration-500"
                style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}
              >
                {link.label}
                {/* Underline animate */}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-champagne group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Bridal Fair CTA */}
            <motion.a
              href="#plan"
              className="hidden md:inline-flex items-center px-5 py-2 font-sans font-light text-luxury-black bg-champagne transition-all duration-500"
              style={{ fontSize: '0.58rem', letterSpacing: '0.18em' }}
              whileHover={{
                boxShadow: '0 0 22px rgba(197,160,89,0.45), 0 0 44px rgba(197,160,89,0.18)',
                scale: 1.02,
              }}
            >
              BRIDAL FAIR
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-luxury-white/80 hover:text-luxury-white transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-luxury-black flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hair-thin decorative line */}
            <div className="absolute top-1/4 inset-x-12 border-t border-champagne/15" />
            <div className="absolute bottom-1/4 inset-x-12 border-b border-champagne/15" />

            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-luxury-white/80 hover:text-champagne transition-colors duration-400"
                style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', letterSpacing: '0.15em' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#plan"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-10 py-3 bg-champagne text-luxury-black font-sans font-light"
              style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              BRIDAL FAIR
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
