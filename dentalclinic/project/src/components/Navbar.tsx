import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar, Smile, UserRound, LogOut, ChevronDown } from 'lucide-react';
import { clinic } from '@/config/clinic';
import { useBooking } from '@/lib/booking-context';
import { useAuth } from '@/lib/auth-context';
import { callClinic } from '@/lib/whatsapp';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Doctor', href: '#doctor' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { openBooking } = useBooking();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform">
                <Smile className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className={`block font-bold text-base lg:text-lg tracking-tight ${scrolled ? 'text-slate-800' : 'text-slate-800'}`}>
                  Lumière
                </span>
                <span className={`block text-[10px] uppercase tracking-[0.18em] font-medium ${scrolled ? 'text-teal-600' : 'text-teal-600'}`}>
                  Dental Clinic
                </span>
              </div>
            </a>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-teal-600 rounded-lg hover:bg-teal-50/60 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={callClinic}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
                aria-label="Call clinic"
              >
                <Phone className="w-4 h-4" />
                Call
              </button>

              {/* User account */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenu((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-teal-600 rounded-lg hover:bg-teal-50/60 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <AnimatePresence>
                    {userMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setUserMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                        >
                          <div className="px-4 py-2 border-b border-slate-100">
                            <p className="text-xs text-slate-400">Signed in as</p>
                            <p className="text-sm font-semibold text-slate-700 truncate">{user.email}</p>
                          </div>
                          <button
                            onClick={() => { setUserMenu(false); signOut(); }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => openBooking()}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
                >
                  <UserRound className="w-4 h-4" />
                  Sign In
                </button>
              )}

              <button
                onClick={() => openBooking()}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => openBooking()}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-semibold rounded-lg shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[78%] max-w-xs bg-white shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
                <span className="font-bold text-slate-800">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50/60 rounded-xl transition-colors"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="p-4 border-t border-slate-100 space-y-2.5">
                {user && (
                  <div className="px-2 py-2 bg-teal-50 rounded-xl mb-2">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-700 truncate">{user.email}</p>
                  </div>
                )}
                <button
                  onClick={() => { setMenuOpen(false); openBooking(); }}
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>
                {user ? (
                  <button
                    onClick={() => { setMenuOpen(false); signOut(); }}
                    className="w-full py-3 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                ) : null}
                <button
                  onClick={() => { setMenuOpen(false); callClinic(); }}
                  className="w-full py-3 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {clinic.CLINIC_PHONE}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
