import { motion } from 'framer-motion';
import { Award, Users, Stethoscope, Smile, Target, Heart } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { useCountUp } from '@/lib/useCountUp';
import { useBooking } from '@/lib/booking-context';
import { clinic } from '@/config/clinic';

const stats = [
  { icon: Award, value: 15, suffix: '+', label: 'Years of Experience' },
  { icon: Smile, value: 2500, suffix: '+', label: 'Happy Patients' },
  { icon: Stethoscope, value: 50, suffix: '+', label: 'Treatments' },
  { icon: Users, value: 8, suffix: '', label: 'Qualified Specialists' },
];

export function About() {
  const { openBooking } = useBooking();

  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <Reveal>
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/6473194/pexels-photo-6473194.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Modern dental clinic interior at Lumière Dental"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl shadow-xl p-5 max-w-[220px]">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Our Mission</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  To deliver gentle, honest and world-class dental care that every patient can trust.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
                About the Clinic
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
                Where advanced dentistry meets genuine, patient-first care.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-slate-500 leading-relaxed">
                Founded in {clinic.CLINIC_CITY}, {clinic.CLINIC_NAME} was born from a simple belief: dental care
                should be precise, comfortable and transparent. Today, we are a multi-speciality practice equipped
                with modern technology and led by clinicians who put your wellbeing above all else.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Patient-First Philosophy</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Every treatment plan is tailored to your comfort, needs and budget — never one-size-fits-all.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                    <Award className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Experience You Can Trust</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Over 15 years and 2,500+ patients treated with a 98% satisfaction rate.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <button
                onClick={() => openBooking()}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all"
              >
                Book a Consultation
              </button>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <RevealGroup className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, value, suffix, label }: { icon: typeof Award; value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="text-center p-5 rounded-2xl bg-gradient-to-br from-teal-50/60 to-cyan-50/40 border border-teal-100/50"
    >
      <Icon className="w-7 h-7 mx-auto text-teal-500" />
      <p className="mt-3 text-3xl font-bold text-slate-800">
        <span ref={ref}>{count.toLocaleString('en-IN')}</span>{suffix}
      </p>
      <p className="mt-1 text-xs text-slate-500 font-medium">{label}</p>
    </motion.div>
  );
}
