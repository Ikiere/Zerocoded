import { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAdminToken } from '../../src/middleware/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const admin = verifyAdminToken(req);
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid token.' });
  }

  return res.status(200).json({
    success: true,
    admin,
  });
}
