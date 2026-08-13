import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages, type GalleryImage } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';

const categories = ['All', 'Clinic', 'Treatment Room', 'Equipment', 'Team', 'Patient Care'] as const;

export function Gallery() {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'All' ? galleryImages : galleryImages.filter((g) => g.category === active);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => {
    setLightbox((prev) => (prev === null ? null : (prev + 1) % filtered.length));
  }, [filtered.length]);
  const prev = useCallback(() => {
    setLightbox((prev) => (prev === null ? null : (prev - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, closeLightbox, next, prev]);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
            Clinic Gallery
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Step inside Lumière Dental.
          </h2>
          <p className="mt-4 text-slate-500">
            A modern, hygienic and welcoming space designed for your comfort at every visit.
          </p>
        </Reveal>

        {/* Filter pills */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  active === c
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.button
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(i)}
                className={`group relative overflow-hidden rounded-2xl bg-slate-100 ${
                  i % 5 === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium">{img.category}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white" aria-label="Close">
              <X className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 sm:left-4 p-2 text-white/80 hover:text-white" aria-label="Previous">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <motion.img
              key={filtered[lightbox].src}
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain"
            />
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 sm:right-4 p-2 text-white/80 hover:text-white" aria-label="Next">
              <ChevronRight className="w-8 h-8" />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center px-4">
              {filtered[lightbox].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
