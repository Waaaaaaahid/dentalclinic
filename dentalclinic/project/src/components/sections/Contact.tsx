import { Phone, MessageCircle, Mail, MapPin, Clock, Navigation, ExternalLink } from 'lucide-react';
import { clinic } from '@/config/clinic';
import { Reveal } from '@/components/ui/Reveal';
import { callClinic, openWhatsApp, getDirections } from '@/lib/whatsapp';

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full tracking-wide">
            Contact Us
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            We're here to help you smile.
          </h2>
          <p className="mt-4 text-slate-500">
            Reach out for appointments, queries or directions. We'd love to hear from you.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Left: info */}
          <div className="space-y-5">
            {/* Info cards */}
            <Reveal>
              <div className="grid sm:grid-cols-2 gap-4">
                <ContactCard icon={Phone} label="Phone" value={clinic.CLINIC_PHONE} onClick={callClinic} actionLabel="Call Now" />
                <ContactCard icon={MessageCircle} label="WhatsApp" value={clinic.CLINIC_WHATSAPP_NUMBER} onClick={() => openWhatsApp()} actionLabel="Chat" />
                <ContactCard icon={Mail} label="Email" value={clinic.CLINIC_EMAIL} onClick={() => window.location.href = `mailto:${clinic.CLINIC_EMAIL}`} actionLabel="Email" />
                <ContactCard icon={MapPin} label="Address" value={`${clinic.CLINIC_ADDRESS}, ${clinic.CLINIC_CITY}, ${clinic.CLINIC_PINCODE}`} onClick={getDirections} actionLabel="Directions" />
              </div>
            </Reveal>

            {/* Timings */}
            <Reveal delay={0.1}>
              <div className="bg-gradient-to-br from-teal-50/60 to-cyan-50/40 rounded-2xl p-6 border border-teal-100/50">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <h3 className="text-sm font-bold text-slate-800">Opening Hours</h3>
                </div>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center py-2 border-b border-teal-100/50">
                    <span className="text-sm text-slate-600 font-medium">Monday – Saturday</span>
                    <span className="text-sm font-semibold text-teal-700">{clinic.CLINIC_HOURS.weekdays}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600 font-medium">Sunday</span>
                    <span className="text-sm font-semibold text-rose-500">{clinic.CLINIC_HOURS.sunday}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-rose-50 rounded-xl flex items-center gap-2">
                  <Phone className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <p className="text-xs text-rose-600">
                    <span className="font-semibold">Emergency:</span> {clinic.CLINIC_EMERGENCY_PHONE} — available after hours
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Action buttons */}
            <Reveal delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={callClinic}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-900 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
                <button
                  onClick={() => openWhatsApp()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
                <button
                  onClick={getDirections}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-teal-400 hover:text-teal-600 transition-all"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right: map */}
          <Reveal delay={0.1}>
            <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <iframe
                src={clinic.CLINIC_GOOGLE_MAPS_EMBED}
                title="Lumière Dental Clinic location map"
                className="w-full h-full min-h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  onClick,
  actionLabel,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  onClick: () => void;
  actionLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white rounded-2xl p-5 border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
          <Icon className="w-5 h-5 text-teal-600" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
          <p className="text-sm font-semibold text-slate-700 truncate mt-0.5">{value}</p>
          <p className="mt-1.5 text-xs text-teal-600 font-medium flex items-center gap-1">
            {actionLabel}
            <ExternalLink className="w-3 h-3" />
          </p>
        </div>
      </div>
    </button>
  );
}
