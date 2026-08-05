import { VercelRequest, VercelResponse } from '@vercel/node';
import { newsletterSchema } from '../../shared/src/schemas';
import { sanitizeObject } from '../src/utils/sanitize';
import { sendNewsletterConfirmation } from '../src/lib/nodemailer';
import { supabase } from '../src/lib/supabase';
import { allowCors } from '../src/utils/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (allowCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const result = newsletterSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      success: false,
      message: 'Please enter a valid email address',
    });
  }

  const { email } = sanitizeObject(result.data);

  try {
    // Check for duplicate subscription
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "You're already subscribed to our newsletter.",
      });
    }

    const { error: dbError } = await supabase.from('newsletter_subscribers').insert([
      {
        email,
        subscribed_at: new Date().toISOString(),
        ip_address: (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown',
      },
    ]);

    if (dbError) {
      console.error('[newsletter] DB error:', dbError.message);
    }

    await sendNewsletterConfirmation(email);

    return res.status(200).json({
      success: true,
      message: "You've been subscribed successfully. Welcome to the Zerocoded community!",
    });
  } catch (err) {
    console.error('[newsletter] Error:', err instanceof Error ? err.message : String(err));
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}
