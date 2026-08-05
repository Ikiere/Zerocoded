import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../src/lib/supabase';
import { allowCors } from '../src/utils/cors';

const DEFAULT_SETTINGS = {
  github_username: 'ikiere',
  use_github_cv: true,
  custom_cv_url: '',
  business_cert_url: '',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (allowCors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error || !data) {
      // Fallback if table not seeded or error
      return res.status(200).json({ success: true, data: DEFAULT_SETTINGS });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(200).json({ success: true, data: DEFAULT_SETTINGS });
  }
}
