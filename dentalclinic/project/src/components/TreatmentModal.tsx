import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Clock, HeartPulse, IndianRupee, Check, MessageCircle, Calendar } from 'lucide-react';
import type { Treatment } from '@/data/treatments';
import { useBooking } from '@/lib/booking-context';

interface Props {
  treatment: Treatment | null;
  onClose: () => void;
}

export function TreatmentModal({ treatment, onClose }: Props) {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.body.style.overflow = treatment ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [treatment, onClose]);

  return (
    <AnimatePresence>
      {treatment && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${treatment.name} details`}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600">
              <div className="flex items-center gap-3 text-white">
                <treatment.icon className="w-6 h-6" />
                <h2 className="text-lg font-bold">{treatment.name}</h2>
              </div>
              <button onClick={onClose} className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Overview</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{treatment.description}</p>
              </div>

              {/* Quick info grid */}
              <div className="grid grid-cols-3 gap-3">
                <InfoCard icon={Clock} label="Duration" value={treatment.duration} />
                <InfoCard icon={HeartPulse} label="Recovery" value={treatment.recovery} />
                <InfoCard icon={IndianRupee} label="Starting from" value={treatment.startingPrice} />
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Key Benefits</h3>
                <div className="grid grid-cols-2 gap-2">
                  {treatment.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm text-slate-600 bg-teal-50/50 rounded-lg px-3 py-2">
                      <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedure */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Procedure Overview</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{treatment.procedure}</p>
              </div>

              {/* FAQs */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">FAQs</h3>
                <div className="space-y-3">
                  {treatment.faqs.map((f) => (
                    <div key={f.q} className="bg-slate-50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-slate-700">{f.q}</p>
                      <p className="mt-1 text-sm text-slate-500">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => { onClose(); openBooking(treatment.name); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </button>
                <button
                  onClick={() => { onClose(); openBooking(treatment.name); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-50 text-green-700 font-semibold rounded-xl border border-green-200 hover:bg-green-100 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book via WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
      <Icon className="w-4 h-4 mx-auto text-teal-500" />
      <p className="mt-1.5 text-[10px] font-medium text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-xs font-semibold text-slate-700 mt-0.5 leading-tight">{value}</p>
    </div>
  );
}
