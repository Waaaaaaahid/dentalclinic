import { motion } from 'framer-motion';
import { GraduationCap, Award, BadgeCheck, Calendar, Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { useBooking } from '@/lib/booking-context';

const certifications = [
  'BDS, MDS — Conservative Dentistry & Endodontics',
  'Fellowship in Implantology (ICOI, USA)',
  'Certified Invisalign Provider',
  'Member, Indian Dental Association',
];

const achievements = [
  '2,500+ successful root canal treatments',
  '1,000+ dental implants placed',
  'Speaker at 12+ national dental conferences',
  'Featured in leading dental journals',
];

export function Doctor() {
  const { openBooking } = useBooking();

  return (
    <section id="doctor" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <Reveal className="lg:col-span-2">
            <div className="relative mx-auto max-w-sm">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="https://images.pexels.com/photos/37458054/pexels-photo-37458054.jpeg?auto=compress&cs=tinysrgb&h=900&w=720"
                  alt="Dr. Arjun Kapoor, Lead Dentist at Lumière Dental Clinic"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-5 py-2.5 whitespace-nowrap">
                <p className="text-sm font-bold text-slate-800">Dr. Arjun Kapoor</p>
                <p className="text-[11px] text-teal-600 font-medium">Lead Dentist & Founder</p>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div className="lg:col-span-3">
            <Reveal>
              <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
                Meet Your Dentist
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
                Dr. Arjun Kapoor
              </h2>
              <p className="mt-1 text-teal-600 font-medium text-sm">BDS, MDS · Implantologist · 15+ Years Experience</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-5 relative pl-5 border-l-2 border-teal-200">
                <Quote className="absolute -left-3 -top-1 w-5 h-5 text-teal-300 bg-white rounded-full" />
                <p className="text-slate-500 leading-relaxed italic">
                  "I believe great dentistry is invisible — you forget you ever needed it, and simply enjoy
                  your smile. My team and I are committed to honest diagnoses, painless procedures and results
                  that last a lifetime."
                </p>
              </div>
            </Reveal>

            {/* Certifications & Achievements */}
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <Reveal delay={0.15}>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-teal-600" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Certifications</h4>
                </div>
                <ul className="space-y-2">
                  {certifications.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-slate-500">
                      <BadgeCheck className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-teal-600" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Achievements</h4>
                </div>
                <ul className="space-y-2">
                  {achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-slate-500">
                      <BadgeCheck className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <button
                onClick={() => openBooking()}
                className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book an Appointment
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
