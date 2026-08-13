import { motion } from 'framer-motion';
import { Calendar, MessageCircle, ShieldCheck, Microscope, HeartHandshake, Sparkles, Star } from 'lucide-react';
import { useBooking } from '@/lib/booking-context';
import { openWhatsApp } from '@/lib/whatsapp';

const trustIndicators = [
  { icon: ShieldCheck, label: 'Experienced Dentist' },
  { icon: Microscope, label: 'Modern Equipment' },
  { icon: HeartHandshake, label: 'Patient-Centered Care' },
  { icon: Sparkles, label: 'Hygienic Clinic' },
];

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-teal-50/70 via-white to-white">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-200/60 rounded-full text-teal-700 text-xs font-semibold tracking-wide"
            >
              <Star className="w-3.5 h-3.5 fill-teal-500 text-teal-500" />
              Trusted Dental Care
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-[1.1] tracking-tight"
            >
              Your Smile Deserves{' '}
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Expert Care.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="mt-5 text-base lg:text-lg text-slate-500 leading-relaxed max-w-xl"
            >
              At Lumière Dental, we combine advanced technology with a gentle, patient-first approach —
              delivering precise, comfortable and lasting dental care for the whole family.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => openBooking()}
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
              <button
                onClick={() => openWhatsApp()}
                className="flex items-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-green-400 hover:text-green-600 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                WhatsApp Us
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {trustIndicators.map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-2 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-100 text-center">
                  <t.icon className="w-5 h-5 text-teal-500" />
                  <span className="text-[11px] font-medium text-slate-500 leading-tight">{t.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-teal-900/10 aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src="https://images.pexels.com/photos/6627857/pexels-photo-6627857.jpeg?auto=compress&cs=tinysrgb&h=900&w=720"
                alt="Dentist at Lumière Dental Clinic preparing for a patient consultation"
                className="w-full h-full object-cover"
                loading="eager"
                width={720}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-5 -left-3 sm:-left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[200px]"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 border-2 border-white" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">2,500+ happy patients</p>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -top-4 -right-2 sm:-right-4 bg-white rounded-2xl shadow-xl px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">15+ Years</p>
                  <p className="text-[10px] text-slate-400">of expertise</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
