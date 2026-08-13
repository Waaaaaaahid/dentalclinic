import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Sofa, Sparkles, UserRound, BadgeIndianRupee, Wrench, HeartHandshake } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

const features = [
  { icon: ShieldCheck, title: 'Experienced Dentist', desc: '15+ years and thousands of successful treatments behind every diagnosis.' },
  { icon: Cpu, title: 'Advanced Technology', desc: 'Digital X-rays, intra-oral scanners and 3D imaging for precision care.' },
  { icon: Sofa, title: 'Comfortable Environment', desc: 'A calm, spa-like clinic designed to ease anxiety from the moment you walk in.' },
  { icon: Sparkles, title: 'Strict Hygiene Standards', desc: 'Hospital-grade sterilisation and single-use instruments for every patient.' },
  { icon: UserRound, title: 'Personalized Treatment', desc: 'No two smiles are the same. Neither are our treatment plans.' },
  { icon: BadgeIndianRupee, title: 'Transparent Pricing', desc: 'Clear, upfront quotes with no hidden charges — ever.' },
  { icon: Wrench, title: 'Modern Equipment', desc: 'Internationally certified dental chairs and tools for painless procedures.' },
  { icon: HeartHandshake, title: 'Patient-Centered Care', desc: 'We listen first, then treat — at a pace that is comfortable for you.' },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
            Why Choose Us
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            The Lumière difference, in every detail.
          </h2>
          <p className="mt-4 text-slate-500">
            We have built our practice around what matters most: your comfort, your trust and your smile.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:shadow-teal-900/5 hover:border-teal-200 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-800">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
