import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../src/lib/supabase';
import { verifyAdminToken } from '../../src/middleware/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Verify Admin JWT
  const admin = verifyAdminToken(req);
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Admin session required.' });
  }

  const { github_username, use_github_cv, custom_cv_url, business_cert_url } = req.body;

  try {
    const { data, error } = await supabase
      .from('app_settings')
      .upsert([
        {
          id: 1,
          github_username,
          use_github_cv: !!use_github_cv,
          custom_cv_url: custom_cv_url || '',
          business_cert_url: business_cert_url || '',
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('[settings-admin] DB Error:', error.message);
      return res.status(400).json({ success: false, message: `Database error: ${error.message}` });
    }

    return res.status(200).json({
      success: true,
      message: 'Application settings updated successfully',
      data: data?.[0],
    });
  } catch (err) {
    console.error('[settings-admin] Exception:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.',
    });
  }
}
