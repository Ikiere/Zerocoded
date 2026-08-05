import { VercelRequest, VercelResponse } from '@vercel/node';
import { contactSchema } from '../../shared/src/schemas';
import { sanitizeObject, containsInjection } from '../src/utils/sanitize';
import { sendContactEmail } from '../src/lib/nodemailer';
import { supabase } from '../src/lib/supabase';
import { allowCors } from '../src/utils/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (allowCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Validate with Zod
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const field = issue.path.join('.');
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return res.status(422).json({ success: false, message: 'Validation failed', errors });
  }

  // Sanitize against XSS / injection
  const sanitized = sanitizeObject(result.data);

  // Check for injection patterns
  for (const value of Object.values(sanitized)) {
    if (typeof value === 'string' && containsInjection(value)) {
      return res.status(400).json({ success: false, message: 'Invalid input detected' });
    }
  }

  try {
    // Store in Supabase
    const { error: dbError } = await supabase.from('contact_submissions').insert([
      {
        name: sanitized.name,
        email: sanitized.email,
        project_type: sanitized.projectType,
        message: sanitized.message,
        created_at: new Date().toISOString(),
        ip_address: (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown',
      },
    ]);

    if (dbError) {
      console.error('[contact] DB error:', dbError.message);
      // Continue even if DB fails — still send email
    }

    // Send email notification
    await sendContactEmail(sanitized);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent. We'll get back to you within 24 hours.",
    });
  } catch (err) {
    console.error('[contact] Error:', err instanceof Error ? err.message : String(err));
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}
