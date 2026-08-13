import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = Number(process.env.PORT || 5000);
const JWT_EXPIRES_IN = '7d';

const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS origin not allowed'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '100kb' }));

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

function getJwtSecret() {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
  return process.env.JWT_SECRET;
}

function signToken(userId) {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
}

function publicUser(user) {
  return { id: user._id.toString(), email: user.email };
}

async function connectMongo() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured');
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
}

app.get('/api/health', async (_req, res) => {
  try {
    await connectMongo();
    res.json({ ok: true, service: 'dental-clinic-api', database: 'connected' });
  } catch (error) {
    console.error('[health]', error);
    res.status(503).json({ ok: false, service: 'dental-clinic-api', database: 'disconnected' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    await connectMongo();
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    if (String(password).length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ error: 'An account with this email already exists' });

    const hashedPassword = await bcrypt.hash(String(password), 12);
    const user = await User.create({ email: normalizedEmail, password: hashedPassword });
    return res.status(201).json({ token: signToken(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    console.error('[signup]', error);
    return res.status(500).json({ error: 'Server configuration or database error' });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    await connectMongo();
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user || !(await bcrypt.compare(String(password), user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.json({ token: signToken(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    console.error('[signin]', error);
    return res.status(500).json({ error: 'Server configuration or database error' });
  }
});

app.get('/api/auth/verify', async (req, res) => {
  try {
    await connectMongo();
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(authHeader.slice(7), getJwtSecret());
    const user = await User.findById(decoded.userId).select('email');
    if (!user) return res.status(401).json({ error: 'User not found' });
    return res.json({ user: publicUser(user) });
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});

app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

app.use((error, _req, res, _next) => {
  console.error('[server]', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Dental clinic API listening on port ${PORT}`);
});
