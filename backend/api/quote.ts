import { VercelRequest, VercelResponse } from '@vercel/node';
import { quoteSchema } from '../../shared/src/schemas';
import { sanitizeObject, containsInjection } from '../src/utils/sanitize';
import { sendQuoteEmail } from '../src/lib/nodemailer';
import { supabase } from '../src/lib/supabase';
import { allowCors } from '../src/utils/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (allowCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const result = quoteSchema.safeParse(req.body);
  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const field = issue.path.join('.');
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return res.status(422).json({ success: false, message: 'Validation failed', errors });
  }

  const { consentGiven: _consent, ...rest } = result.data;
  const sanitized = sanitizeObject(rest);

  for (const value of Object.values(sanitized)) {
    if (typeof value === 'string' && containsInjection(value)) {
      return res.status(400).json({ success: false, message: 'Invalid input detected' });
    }
  }

  try {
    const { error: dbError } = await supabase.from('quote_requests').insert([
      {
        name: sanitized.name,
        company: sanitized.company,
        email: sanitized.email,
        phone: sanitized.phone,
        budget: sanitized.budget,
        project_type: sanitized.projectType,
        timeline: sanitized.timeline,
        description: sanitized.description,
        created_at: new Date().toISOString(),
        ip_address: (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown',
      },
    ]);

    if (dbError) {
      console.error('[quote] DB error:', dbError.message);
    }

    await sendQuoteEmail(sanitized);

    return res.status(200).json({
      success: true,
      message: "Your quote request has been received. We'll get back to you within 24 hours.",
    });
  } catch (err) {
    console.error('[quote] Error:', err instanceof Error ? err.message : String(err));
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}
