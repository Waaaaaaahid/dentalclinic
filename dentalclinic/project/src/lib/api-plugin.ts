import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN = '7d';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

let User: mongoose.Model<any> | null = null;
let mongoConnected = false;
let JWT_SECRET = 'lumiere-dental-jwt-secret-2026';
let MONGODB_URI = '';

async function connectMongo(retries = 0) {
  if (!MONGODB_URI) {
    console.error('[api] MONGODB_URI not set');
    return;
  }
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    User = conn.model('User', userSchema);
    mongoConnected = true;
    console.log('[api] MongoDB connected');
  } catch (err: any) {
    console.error(`[api] MongoDB attempt ${retries + 1} failed:`, err.message);
    if (retries < 10) {
      setTimeout(() => connectMongo(retries + 1), 3000);
    }
  }
}

function jsonBody(status: number, body: any) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleAuthRequest(url: string, method: string, body: any, authHeader?: string) {
  if (url === '/api/auth/signup' && method === 'POST') {
    if (!mongoConnected || !User) return jsonBody(503, { error: 'Database is connecting. Please try again in a moment.' });
    const { email, password } = body;
    if (!email || !password) return jsonBody(400, { error: 'Email and password are required' });
    if (password.length < 6) return jsonBody(400, { error: 'Password must be at least 6 characters' });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return jsonBody(409, { error: 'An account with this email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email.toLowerCase(), password: hashed });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return jsonBody(201, { token, user: { id: user._id, email: user.email } });
  }

  if (url === '/api/auth/signin' && method === 'POST') {
    if (!mongoConnected || !User) return jsonBody(503, { error: 'Database is connecting. Please try again in a moment.' });
    const { email, password } = body;
    if (!email || !password) return jsonBody(400, { error: 'Email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return jsonBody(401, { error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return jsonBody(401, { error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return jsonBody(200, { token, user: { id: user._id, email: user.email } });
  }

  if (url === '/api/auth/verify' && method === 'GET') {
    if (!mongoConnected || !User) return jsonBody(503, { error: 'Database is connecting.' });
    if (!authHeader || !authHeader.startsWith('Bearer ')) return jsonBody(401, { error: 'No token provided' });
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET) as any;
      const user = await User.findById(decoded.userId).select('email');
      if (!user) return jsonBody(401, { error: 'User not found' });
      return jsonBody(200, { user: { id: user._id, email: user.email } });
    } catch {
      return jsonBody(401, { error: 'Invalid or expired token' });
    }
  }

  return null;
}

export function apiPlugin(): Plugin {
  return {
    name: 'api-auth',
    config(_, { mode }) {
      const env = loadEnv(mode, process.cwd(), '');
      MONGODB_URI = env.MONGODB_URI || process.env.MONGODB_URI || '';
      JWT_SECRET = env.JWT_SECRET || process.env.JWT_SECRET || JWT_SECRET;
      connectMongo();
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();

        const method = req.method || 'GET';
        const url = req.url.split('?')[0];
        const authHeader = req.headers.authorization;

        let body: any = null;
        if (method === 'POST' || method === 'PUT') {
          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(chunk as Buffer);
            body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
          } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON body' }));
            return;
          }
        }

        try {
          const result = await handleAuthRequest(url, method, body, authHeader);
          if (result) {
            res.writeHead(result.status, { 'Content-Type': 'application/json' });
            res.end(await result.text());
            return;
          }
        } catch (err: any) {
          console.error('[api] Error:', err.message);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Something went wrong. Please try again.' }));
          return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
      });
    },
  };
}
