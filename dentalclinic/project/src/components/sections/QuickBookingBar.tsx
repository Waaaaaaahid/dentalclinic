import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Stethoscope, ArrowRight } from 'lucide-react';
import { treatments } from '@/data/treatments';
import { useBooking } from '@/lib/booking-context';

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];
const today = new Date().toISOString().split('T')[0];

export function QuickBookingBar() {
  const { openBooking } = useBooking();
  const [treatment, setTreatment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBook = () => {
    openBooking(treatment || undefined);
    // pre-fill via context only supports treatment; date/time handled in modal
  };

  return (
    <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-5 sm:p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-teal-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Quick Appointment</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Treatment */}
          <div className="relative">
            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition appearance-none"
            >
              <option value="">Treatment</option>
              {treatments.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
              <option value="General Consultation">General Consultation</option>
            </select>
          </div>

          {/* Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
            />
          </div>

          {/* Time */}
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition appearance-none"
            >
              <option value="">Preferred Time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Button */}
          <button
            onClick={handleBook}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all"
          >
            Book Appointment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
