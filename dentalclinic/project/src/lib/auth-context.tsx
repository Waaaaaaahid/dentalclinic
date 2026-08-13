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

// Use the same Vercel origin for auth. The repository already contains
// Vercel serverless auth at /api/auth/[action].js, so this avoids the
// frontend -> Render CORS/URL mismatch completely.
const api = (path: string) => path;

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
        setUser(data.user ?? null);
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
      if (!data.token || !data.user) return { error: 'Invalid response from account server.' };
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
      if (!data.token || !data.user) return { error: 'Invalid response from account server.' };
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
