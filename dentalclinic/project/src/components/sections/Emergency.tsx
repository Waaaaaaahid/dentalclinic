import { Phone, MessageCircle, Siren } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { clinic } from '@/config/clinic';
import { callClinic, openWhatsApp } from '@/lib/whatsapp';

export function Emergency() {
  return (
    <section className="py-16 lg:py-20 bg-rose-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-rose-600 p-8 lg:p-12 shadow-xl shadow-rose-500/20">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Siren className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold text-white">Need Urgent Dental Care?</h2>
                <p className="mt-2 text-white/80 text-sm lg:text-base">
                  Dental emergencies can't wait. Call us immediately or message on WhatsApp for same-day emergency slots.
                </p>
                <p className="mt-2 text-white/70 text-xs">
                  Emergency Line: {clinic.CLINIC_EMERGENCY_PHONE}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={callClinic}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-rose-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
                <button
                  onClick={() => openWhatsApp({ treatment: 'Emergency Appointment' })}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-700 text-white font-semibold rounded-xl shadow-lg hover:bg-rose-800 hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Now
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
