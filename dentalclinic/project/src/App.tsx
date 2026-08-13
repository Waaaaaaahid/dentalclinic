import { AuthProvider } from '@/lib/auth-context';
import { BookingProvider, useBooking } from '@/lib/booking-context';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { QuickBookingBar } from '@/components/sections/QuickBookingBar';
import { About } from '@/components/sections/About';
import { Doctor } from '@/components/sections/Doctor';
import { Treatments } from '@/components/sections/Treatments';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Process } from '@/components/sections/Process';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { GoogleReviews } from '@/components/sections/GoogleReviews';
import { Pricing } from '@/components/sections/Pricing';
import { Emergency } from '@/components/sections/Emergency';
import { Contact } from '@/components/sections/Contact';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { MobileActionBar } from '@/components/MobileActionBar';
import { BookingModal } from '@/components/BookingModal';
import { AuthModal } from '@/components/AuthModal';

function AppContent() {
  const { isOpen, presetTreatment, closeBooking, authOpen, authMessage, closeAuth } = useBooking();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <QuickBookingBar />
        <About />
        <Doctor />
        <Treatments />
        <WhyChooseUs />
        <Process />
        <BeforeAfter />
        <Gallery />
        <Testimonials />
        <GoogleReviews />
        <Pricing />
        <Emergency />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
      <BookingModal open={isOpen} onClose={closeBooking} presetTreatment={presetTreatment} />
      <AuthModal open={authOpen} onClose={closeAuth} message={authMessage} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </AuthProvider>
  );
}
