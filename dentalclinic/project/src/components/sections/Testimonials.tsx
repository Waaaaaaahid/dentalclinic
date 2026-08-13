import { motion } from 'framer-motion';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { testimonials } from '@/data/site';
import { clinic } from '@/config/clinic';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

export function Testimonials() {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-gradient-to-b from-teal-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
            Patient Reviews
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Loved by thousands of happy patients.
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">4.9</span>
            <span className="text-sm text-slate-400">· 850+ reviews</span>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all relative"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-teal-100" />
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.treatment}</p>
                </div>
              </div>
              <div className="flex mt-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">"{t.review}"</p>
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href={clinic.CLINIC_GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-teal-400 hover:text-teal-600 hover:shadow-lg transition-all"
            >
              Read More Reviews
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
