import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useBooking } from '@/lib/booking-context';
import { callClinic, openWhatsApp } from '@/lib/whatsapp';

export function MobileActionBar() {
  const { openBooking } = useBooking();

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3 gap-1 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <button
          onClick={callClinic}
          className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[11px] font-semibold">Call</span>
        </button>
        <button
          onClick={() => openWhatsApp()}
          className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-green-600 hover:bg-green-50 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </button>
        <button
          onClick={() => openBooking()}
          className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[11px] font-semibold">Book</span>
        </button>
      </div>
    </div>
  );
}
