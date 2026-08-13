import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Calendar, Phone, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { treatments } from '@/data/treatments';
import { openWhatsApp } from '@/lib/whatsapp';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  presetTreatment?: string;
}

type Status = 'idle' | 'submitting' | 'success';

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM',
];

export function BookingModal({ open, onClose, presetTreatment }: BookingModalProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '',
    phone: '',
    treatment: presetTreatment ?? '',
    date: '',
    time: '',
    patientType: 'New Patient',
    message: '',
  });

  useEffect(() => {
    if (presetTreatment) setForm((f) => ({ ...f, treatment: presetTreatment }));
  }, [presetTreatment]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStatus('idle');
        setErrors({});
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number';
    else if (!/^\+?[\d\s-]{8,15}$/.test(form.phone.trim())) e.phone = 'Please enter a valid phone number';
    if (!form.treatment) e.treatment = 'Please select a treatment';
    if (!form.date) e.date = 'Please choose a date';
    if (!form.time) e.time = 'Please choose a time';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    setTimeout(() => {
      openWhatsApp(form);
      setStatus('success');
    }, 600);
  };

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => { const c = { ...e }; delete c[k]; return c; });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Book an appointment"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-t-3xl">
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Book Appointment</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {status === 'success' ? (
              <div className="px-6 py-12 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                  <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
                </motion.div>
                <h3 className="mt-4 text-xl font-bold text-slate-800">Opening WhatsApp…</h3>
                <p className="mt-2 text-slate-500 text-sm">
                  Your appointment details have been prepared. Please press send in WhatsApp to confirm your booking.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                {/* Name */}
                <Field label="Full Name" error={errors.name} required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className={inputCls(errors.name)}
                  />
                </Field>

                {/* Phone */}
                <Field label="Phone Number" error={errors.phone} required>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="e.g. 98XXXXXXXX"
                    className={inputCls(errors.phone)}
                  />
                </Field>

                {/* Treatment */}
                <Field label="Treatment" error={errors.treatment} required>
                  <select
                    value={form.treatment}
                    onChange={(e) => update('treatment', e.target.value)}
                    className={inputCls(errors.treatment)}
                  >
                    <option value="">Select a treatment</option>
                    {treatments.map((t) => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </Field>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Preferred Date" error={errors.date} required>
                    <input
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={(e) => update('date', e.target.value)}
                      className={inputCls(errors.date)}
                    />
                  </Field>
                  <Field label="Preferred Time" error={errors.time} required>
                    <select
                      value={form.time}
                      onChange={(e) => update('time', e.target.value)}
                      className={inputCls(errors.time)}
                    >
                      <option value="">Select</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Patient type */}
                <Field label="Patient Type">
                  <div className="flex gap-2">
                    {['New Patient', 'Existing Patient'].map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => update('patientType', pt)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${
                          form.patientType === pt
                            ? 'bg-teal-50 border-teal-500 text-teal-700'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Message */}
                <Field label="Additional Message (optional)">
                  <textarea
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    rows={2}
                    placeholder="Any specific concerns or questions…"
                    className={inputCls()}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-teal-600/20 hover:shadow-teal-600/40 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Preparing…</>
                  ) : (
                    <><MessageCircle className="w-5 h-5" /> Book via WhatsApp</>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                  <Phone className="w-3 h-3" /> No payment needed — we'll confirm on WhatsApp
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">
        {label}{required && <span className="text-rose-500"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

function inputCls(error?: string): string {
  return `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition ${
    error
      ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
      : 'border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
  }`;
}
