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

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function connectMongo() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured');
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
}

function json(res, status, body) {
  return res.status(status).json(body);
}

function getJwtSecret() {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
  return process.env.JWT_SECRET;
}

export default async function handler(req, res) {
  try {
    const action = req.query.action;

    if (!['signup', 'signin', 'verify'].includes(action)) {
      return json(res, 404, { error: 'Not found' });
    }

    await connectMongo();
    const JWT_SECRET = getJwtSecret();

    if (action === 'signup' && req.method === 'POST') {
      const { email, password } = req.body || {};
      if (!email || !password) return json(res, 400, { error: 'Email and password are required' });
      if (password.length < 6) return json(res, 400, { error: 'Password must be at least 6 characters' });

      const normalizedEmail = String(email).toLowerCase().trim();
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) return json(res, 409, { error: 'An account with this email already exists' });

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email: normalizedEmail, password: hashed });
      const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      return json(res, 201, {
        token,
        user: { id: user._id.toString(), email: user.email },
      });
    }

    if (action === 'signin' && req.method === 'POST') {
      const { email, password } = req.body || {};
      if (!email || !password) return json(res, 400, { error: 'Email and password are required' });

      const user = await User.findOne({ email: String(email).toLowerCase().trim() });
      if (!user) return json(res, 401, { error: 'Invalid email or password' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return json(res, 401, { error: 'Invalid email or password' });

      const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      return json(res, 200, {
        token,
        user: { id: user._id.toString(), email: user.email },
      });
    }

    if (action === 'verify' && req.method === 'GET') {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) return json(res, 401, { error: 'No token provided' });

      try {
        const decoded = jwt.verify(authHeader.slice(7), JWT_SECRET);
        const user = await User.findById(decoded.userId).select('email');
        if (!user) return json(res, 401, { error: 'User not found' });
        return json(res, 200, { user: { id: user._id.toString(), email: user.email } });
      } catch {
        return json(res, 401, { error: 'Invalid or expired token' });
      }
    }

    res.setHeader('Allow', action === 'verify' ? 'GET' : 'POST');
    return json(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('[api/auth]', error);
    return json(res, 500, { error: 'Server configuration or database error' });
  }
}
