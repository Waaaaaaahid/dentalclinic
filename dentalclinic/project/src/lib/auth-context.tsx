import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = 'lumiere_token';

// VITE_API_URL can override this in Vercel/Render. The fallback points to the
// deployed Express API so auth does not silently call a static frontend's /api.
const API_URL = (
  import.meta.env.VITE_API_URL || 'https://dentalclinic-5bxy.onrender.com'
).replace(/\/$/, '');

const api = (path: string) => `${API_URL}${path}`;

async function parseResponse(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { error: `Server returned HTTP ${res.status}` };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(api('/api/auth/verify'), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          localStorage.removeItem(TOKEN_KEY);
          setUser(null);
          return;
        }
        const data = await parseResponse(res);
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const res = await fetch(api('/api/auth/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await parseResponse(res);
      if (!res.ok) return { error: data.error ?? 'Sign up failed' };
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
      return { error: null };
    } catch (error) {
      console.error('[auth signup]', error);
      return { error: 'Unable to reach the account server. Please try again.' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(api('/api/auth/signin'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await parseResponse(res);
      if (!res.ok) return { error: data.error ?? 'Sign in failed' };
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
      return { error: null };
    } catch (error) {
      console.error('[auth signin]', error);
      return { error: 'Unable to reach the account server. Please try again.' };
    }
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
