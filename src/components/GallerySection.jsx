import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Reveal, SectionLabel } from './ConceptSection'

const IMAGES = [
  { src: '/img/chapel.jpg',  alt: 'Grand Chapel',   span: 'md:col-span-2 md:row-span-2' },
  { src: '/img/party.jpg',   alt: 'Banquet Hall',   span: '' },
  { src: '/img/plate.jpg',   alt: 'Fine Cuisine',   span: '' },
  { src: '/img/yata.jpg',    alt: 'Club Lounge',    span: 'md:col-span-2' },
  { src: '/img/marble-bg.jpg', alt: 'Architecture', span: '' },
]

const GallerySection = () => {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" className="relative bg-luxury-black py-24 md:py-36 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16">
        <div className="mb-14 md:mb-20">
          <SectionLabel en="GALLERY" ja="ギャラリー" delay={0.1} />
          <Reveal delay={0.2}>
            <h2
              className="font-serif text-luxury-white"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '0.1em' }}
            >
              Moments of Elegance
            </h2>
          </Reveal>
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[220px] gap-2 md:gap-3">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className={`img-hover-zoom cursor-pointer overflow-hidden ${img.span}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              onClick={() => setLightbox(img)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              {/* Hover reveal label */}
              <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/40 transition-all duration-500 flex items-end p-5 opacity-0 group-hover:opacity-100">
                <span className="font-sans font-light text-luxury-white text-xs tracking-widest">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-luxury-black/95 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-luxury-white/60 hover:text-luxury-white"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            <p
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans font-light text-luxury-white/40"
              style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}
            >
              {lightbox.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GallerySection
