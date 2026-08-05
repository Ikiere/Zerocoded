import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from '../../src/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only-change-in-prod';
const FALLBACK_USER = process.env.ADMIN_USERNAME || 'admin';
const FALLBACK_PASS = process.env.ADMIN_PASSWORD || 'admin123'; // Default fallback

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    let authenticated = false;
    let userId = 'fallback';

    // 1. Try querying Supabase admin_users table
    try {
      const { data: users, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .limit(1);

      if (!error && users && users.length > 0) {
        const dbUser = users[0];
        // Compare password hash
        const isMatch = await bcrypt.compare(password, dbUser.password_hash);
        if (isMatch) {
          authenticated = true;
          userId = dbUser.id;
        }
      }
    } catch (dbError) {
      console.warn('[login] DB auth skipped or failed, using env fallback');
    }

    // 2. Fallback to Env variable check if not authenticated via database
    if (!authenticated) {
      if (username === FALLBACK_USER && password === FALLBACK_PASS) {
        authenticated = true;
        userId = 'env-admin';
      }
    }

    if (!authenticated) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: userId, username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      admin: { id: userId, username },
      message: 'Authentication successful',
    });
  } catch (err) {
    console.error('[login] Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.',
    });
  }
}
