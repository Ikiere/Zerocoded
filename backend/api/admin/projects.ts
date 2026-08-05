import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../src/lib/supabase';
import { verifyAdminToken } from '../../src/middleware/auth';
import { allowCors } from '../../src/utils/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (allowCors(req, res)) return;

  // Verify token
  const admin = verifyAdminToken(req);
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Admin session required.' });
  }

  const { id } = req.query;

  try {
    if (req.method === 'POST') {
      const { title, type, category, color, accent_color, tags } = req.body;

      if (!title || !type || !category || !color || !accent_color || !tags) {
        return res.status(400).json({ success: false, message: 'Missing required project attributes.' });
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            title,
            type,
            category,
            color,
            accent_color,
            tags: Array.isArray(tags) ? tags : [tags],
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      return res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: data?.[0],
      });
    }

    if (req.method === 'PUT') {
      const { title, type, category, color, accent_color, tags, id: bodyId } = req.body;
      const targetId = id || bodyId;

      if (!targetId) {
        return res.status(400).json({ success: false, message: 'Project identifier (id) is required.' });
      }

      const { data, error } = await supabase
        .from('projects')
        .update({
          title,
          type,
          category,
          color,
          accent_color,
          tags: Array.isArray(tags) ? tags : [tags],
        })
        .eq('id', targetId)
        .select();

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: data?.[0],
      });
    }

    if (req.method === 'DELETE') {
      const targetId = id || req.body?.id;

      if (!targetId) {
        return res.status(400).json({ success: false, message: 'Project identifier (id) is required.' });
      }

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', targetId);

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
        id: targetId,
      });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (err: any) {
    console.error('[projects-admin] CRUD Error:', err.message || err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal database CRUD error occurred.',
    });
  }
}
