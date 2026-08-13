import { motion } from 'framer-motion';
import { CalendarCheck, Search, ClipboardList, Stethoscope, Smile } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const steps = [
  { icon: CalendarCheck, title: 'Book Appointment', desc: 'Reserve your slot in seconds via WhatsApp or phone — choose a time that suits you.' },
  { icon: Search, title: 'Consultation', desc: 'Meet our dentist for a thorough, no-pressure oral health assessment.' },
  { icon: ClipboardList, title: 'Diagnosis', desc: 'We use digital scans and X-rays to pinpoint the exact issue and plan your care.' },
  { icon: Stethoscope, title: 'Personalized Treatment', desc: 'A tailored treatment plan is executed with precision and gentle care.' },
  { icon: Smile, title: 'Healthy Smile', desc: 'Walk out with a confident, healthy smile and a clear plan to maintain it.' },
];

export function Process() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Your journey to a healthier smile, in five simple steps.
          </h2>
        </Reveal>

        <div className="mt-14 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full opacity-10" />
                    <div className="relative w-16 h-16 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/10">
                      <s.icon className="w-7 h-7 text-teal-600" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-800">{s.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
