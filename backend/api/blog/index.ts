import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../src/lib/supabase';
import type { BlogPost } from '../../../shared/src/types';

// Static fallback blog data for when DB is not yet seeded
const STATIC_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-choose-the-right-tech-stack',
    title: 'How to Choose the Right Tech Stack for Your Project',
    excerpt: 'Choosing the right technology stack is one of the most critical decisions for any software project. We break down the key factors.',
    content: '',
    category: 'Development',
    author: { id: '1', name: 'Zerocoded Team', avatar: '', role: 'Engineering' },
    publishedAt: '2025-05-20',
    readTime: 5,
    coverImage: '',
    tags: ['Tech Stack', 'React', 'Node.js'],
  },
  {
    id: '2',
    slug: 'importance-of-ui-ux-in-modern-web-design',
    title: 'The Importance of UI/UX in Modern Web Design',
    excerpt: 'User experience is the backbone of any successful digital product. Learn why investing in UI/UX design pays off.',
    content: '',
    category: 'Design',
    author: { id: '1', name: 'Zerocoded Team', avatar: '', role: 'Design' },
    publishedAt: '2025-05-10',
    readTime: 4,
    coverImage: '',
    tags: ['UI/UX', 'Design', 'User Experience'],
  },
  {
    id: '3',
    slug: '10-web-design-trends-in-2025',
    title: '10 Web Design Trends in 2025 You Should Know',
    excerpt: 'The digital design world is evolving fast. Discover the top trends shaping web design this year.',
    content: '',
    category: 'Design',
    author: { id: '1', name: 'Zerocoded Team', avatar: '', role: 'Design' },
    publishedAt: '2025-05-15',
    readTime: 6,
    coverImage: '',
    tags: ['Design Trends', '2025', 'Web Design'],
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return res.status(200).json({ success: true, data: STATIC_POSTS });
    }

    return res.status(200).json({ success: true, data });
  } catch {
    return res.status(200).json({ success: true, data: STATIC_POSTS });
  }
}
