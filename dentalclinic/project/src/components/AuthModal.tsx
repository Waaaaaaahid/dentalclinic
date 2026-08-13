import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, Lock, Loader2, UserRound, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

type Mode = 'signin' | 'signup';

export function AuthModal({ open, onClose, message }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setError(null);
        setEmail('');
        setPassword('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const fn = mode === 'signin' ? signIn : signUp;
    const { error: err } = await fn(email.trim(), password);
    setLoading(false);

    if (err) {
      setError(err);
      return;
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Sign in to book an appointment"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-t-3xl">
              <h2 className="text-lg font-semibold text-white">
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <button onClick={onClose} className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5">
              {message && (
                <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-xl text-sm text-teal-700">
                  {message}
                </div>
              )}

              {/* Mode toggle */}
              <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-5">
                {(['signin', 'signup'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setMode(m); setError(null); }}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
                      mode === m ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {m === 'signin' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-rose-500 bg-rose-50 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-teal-600/20 hover:shadow-teal-600/40 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Please wait…</>
                  ) : (
                    <>
                      {mode === 'signin' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-slate-400">
                {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); }}
                  className="text-teal-600 font-semibold hover:underline"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
