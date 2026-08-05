import { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAdminToken } from '../../src/middleware/auth';
import { allowCors } from '../../src/utils/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (allowCors(req, res)) return;

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
