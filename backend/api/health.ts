import { VercelRequest, VercelResponse } from '@vercel/node';
import { allowCors } from '../src/utils/cors';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (allowCors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      version: '1.0.0',
    },
    message: 'Zerocoded API is running',
  });
}
