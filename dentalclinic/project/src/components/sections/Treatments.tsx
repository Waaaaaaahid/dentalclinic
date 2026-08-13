import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Check } from 'lucide-react';
import { treatments, type Treatment } from '@/data/treatments';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { useBooking } from '@/lib/booking-context';
import { TreatmentModal } from '@/components/TreatmentModal';

export function Treatments() {
  const [selected, setSelected] = useState<Treatment | null>(null);
  const { openBooking } = useBooking();

  return (
    <section id="treatments" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
            Our Treatments
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Comprehensive dental care, all under one roof.
          </h2>
          <p className="mt-4 text-slate-500">
            From routine cleanings to advanced implants, every treatment is delivered with precision technology and a gentle touch.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {treatments.map((t) => (
            <motion.div
              key={t.id}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:shadow-teal-900/5 hover:border-teal-200 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center group-hover:from-teal-100 group-hover:to-cyan-100 transition-colors">
                  <t.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-base font-bold text-slate-800">{t.name}</h3>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed flex-1">{t.short}</p>

              <ul className="mt-4 space-y-1.5">
                {t.benefits.slice(0, 3).map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-slate-500">
                    <Check className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSelected(t)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => openBooking(t.name)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg hover:shadow-lg hover:shadow-teal-600/25 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Book
                </button>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </div>

      <TreatmentModal treatment={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
