import { Smile, Phone, MessageCircle, Mail, MapPin, Clock, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react';
import { clinic } from '@/config/clinic';
import { callClinic, openWhatsApp, getDirections } from '@/lib/whatsapp';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Doctor', href: '#doctor' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const treatmentLinks = [
  'Teeth Cleaning',
  'Teeth Whitening',
  'Root Canal Treatment',
  'Dental Implants',
  'Braces',
  'Clear Aligners',
  'Crowns & Bridges',
  'Kids Dentistry',
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500">
                <Smile className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="block font-bold text-base text-white">Lumière</span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-teal-400">Dental Clinic</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              {clinic.CLINIC_NAME} delivers modern, gentle and honest dental care in {clinic.CLINIC_CITY}.
              Your smile is our priority.
            </p>
            <div className="mt-5 flex gap-2.5">
              <SocialBtn href={clinic.CLINIC_INSTAGRAM_URL} icon={Instagram} label="Instagram" />
              <SocialBtn href={clinic.CLINIC_FACEBOOK_URL} icon={Facebook} label="Facebook" />
              <SocialBtn href={clinic.CLINIC_TWITTER_URL} icon={Twitter} label="Twitter" />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-4">Treatments</h4>
            <ul className="space-y-2.5">
              {treatmentLinks.map((t) => (
                <li key={t}>
                  <a href="#treatments" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>{clinic.CLINIC_ADDRESS}, {clinic.CLINIC_CITY}, {clinic.CLINIC_PINCODE}</span>
              </li>
              <li>
                <button onClick={callClinic} className="flex items-center gap-2.5 hover:text-teal-400 transition-colors">
                  <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  {clinic.CLINIC_PHONE}
                </button>
              </li>
              <li>
                <button onClick={() => openWhatsApp()} className="flex items-center gap-2.5 hover:text-teal-400 transition-colors">
                  <MessageCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  WhatsApp: {clinic.CLINIC_WHATSAPP_NUMBER}
                </button>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>{clinic.CLINIC_EMAIL}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Mon – Sat: {clinic.CLINIC_HOURS.weekdays}</p>
                  <p>Sun: {clinic.CLINIC_HOURS.sunday}</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <button onClick={getDirections} className="text-xs text-teal-400 hover:text-teal-300 font-medium">
                Get Directions →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {clinic.CLINIC_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-slate-500 hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-teal-400 transition-colors">Terms</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white rounded-lg transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ href, icon: Icon, label }: { href: string; icon: typeof Instagram; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}
