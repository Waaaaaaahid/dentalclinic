import { createContext, useContext, useState, type ReactNode } from 'react';
import { useAuth } from '@/lib/auth-context';

interface BookingContextValue {
  openBooking: (treatment?: string) => void;
  closeBooking: () => void;
  isOpen: boolean;
  presetTreatment?: string;
  authOpen: boolean;
  authMessage?: string;
  closeAuth: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [presetTreatment, setPresetTreatment] = useState<string | undefined>(undefined);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | undefined>(undefined);

  const openBooking = (treatment?: string) => {
    setPresetTreatment(treatment);
    if (!user) {
      setAuthMessage('Please sign in to book an appointment.');
      setAuthOpen(true);
      return;
    }
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);
  const closeAuth = () => { setAuthOpen(false); setAuthMessage(undefined); };

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, isOpen, presetTreatment, authOpen, authMessage, closeAuth }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
