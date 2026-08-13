import { motion } from 'framer-motion';
import { MessageCircle, IndianRupee, Check } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { useBooking } from '@/lib/booking-context';

const packages = [
  {
    name: 'Dental Consultation',
    price: '499',
    includes: ['Oral examination', 'X-ray (if needed)', 'Treatment plan', 'Expert advice'],
    highlight: false,
  },
  {
    name: 'Teeth Cleaning',
    price: '999',
    includes: ['Ultrasonic scaling', 'Polishing', 'Fluoride application', 'Oral hygiene guidance'],
    highlight: true,
  },
  {
    name: 'Teeth Whitening',
    price: '7,999',
    includes: ['In-clinic whitening', 'Up to 6 shades brighter', 'Single session', 'Enamel-safe gel'],
    highlight: false,
  },
];

export function Pricing() {
  const { openBooking } = useBooking();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
            Pricing & Offers
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Transparent pricing, no surprises.
          </h2>
          <p className="mt-4 text-slate-500">
            Starting prices for our most popular treatments. Final pricing is confirmed after your consultation.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((p) => (
            <motion.div
              key={p.name}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className={`relative rounded-2xl p-6 border transition-all ${
                p.highlight
                  ? 'bg-gradient-to-br from-teal-600 to-cyan-600 text-white border-transparent shadow-xl shadow-teal-600/20 md:-translate-y-2'
                  : 'bg-white text-slate-800 border-slate-100 hover:shadow-xl hover:shadow-teal-900/5'
              }`}
            >
              {p.highlight && (
                <span className="absolute top-4 right-4 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wide">
                  Popular
                </span>
              )}
              <h3 className={`text-base font-bold ${p.highlight ? 'text-white' : 'text-slate-800'}`}>{p.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className={`text-xs font-medium ${p.highlight ? 'text-white/70' : 'text-slate-400'}`}>Starting from</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <IndianRupee className={`w-5 h-5 ${p.highlight ? 'text-white' : 'text-teal-600'}`} />
                <span className="text-3xl font-bold">{p.price}</span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {p.includes.map((inc) => (
                  <li key={inc} className={`flex items-center gap-2 text-sm ${p.highlight ? 'text-white/90' : 'text-slate-500'}`}>
                    <Check className={`w-4 h-4 flex-shrink-0 ${p.highlight ? 'text-white' : 'text-teal-500'}`} />
                    {inc}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openBooking(p.name)}
                className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  p.highlight
                    ? 'bg-white text-teal-700 hover:bg-teal-50'
                    : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Book via WhatsApp
              </button>
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-xs text-slate-400">
            Prices are indicative starting points. Actual treatment cost may vary based on case complexity.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
