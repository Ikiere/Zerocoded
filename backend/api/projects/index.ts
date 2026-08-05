import { VercelRequest, VercelResponse } from '@vercel/node';
import type { Project } from '../../../shared/src/types';
import { supabase } from '../../src/lib/supabase';

// Static project data — fallback if DB has no entries
const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'fintech-dashboard',
    title: 'Fintech Dashboard',
    description: 'Web Application',
    category: 'web-app',
    coverImage: '',
    images: [],
    technologies: ['React', 'TypeScript', 'Node.js'],
    client: 'FinanceFlow',
    year: 2024,
    featured: true,
    color: '#1a1a2e',
    accentColor: '#2563FF',
  },
  {
    id: '2',
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Website Design',
    category: 'e-commerce',
    coverImage: '',
    images: [],
    technologies: ['Next.js', 'Stripe', 'Supabase'],
    client: 'RetailBrand',
    year: 2024,
    featured: true,
    color: '#0a1628',
    accentColor: '#16a34a',
  },
  {
    id: '3',
    slug: 'on-demand-delivery-app',
    title: 'On-Demand Delivery App',
    description: 'Mobile App',
    category: 'mobile-app',
    coverImage: '',
    images: [],
    technologies: ['React Native', 'Firebase'],
    client: 'DeliverNow',
    year: 2024,
    featured: true,
    color: '#1a0a2e',
    accentColor: '#7c3aed',
  },
  {
    id: '4',
    slug: 'saas-landing-page',
    title: 'SaaS Landing Page',
    description: 'Website Design',
    category: 'website',
    coverImage: '',
    images: [],
    technologies: ['React', 'Framer Motion'],
    client: 'SaaS Co.',
    year: 2025,
    featured: false,
    color: '#0a1a1a',
    accentColor: '#0891b2',
  },
  {
    id: '5',
    slug: 'real-estate-platform',
    title: 'Real Estate Platform',
    description: 'Web Application',
    category: 'web-app',
    coverImage: '',
    images: [],
    technologies: ['Next.js', 'PostgreSQL'],
    client: 'PropTech',
    year: 2025,
    featured: false,
    color: '#1a1a0a',
    accentColor: '#ca8a04',
  },
  {
    id: '6',
    slug: 'health-fitness-app',
    title: 'Health & Fitness App',
    description: 'Mobile App',
    category: 'mobile-app',
    coverImage: '',
    images: [],
    technologies: ['React Native', 'HealthKit'],
    client: 'FitLife',
    year: 2025,
    featured: false,
    color: '#0a1a0a',
    accentColor: '#16a34a',
  },
];

function filterProjects(list: Project[], category: any, featured: any): Project[] {
  let filtered = list;
  if (category && category !== 'all') {
    // Map category query standard SPA filters
    const catMap: Record<string, string> = {
      'Websites': 'website',
      'Web Apps': 'web-app',
      'Mobile Apps': 'mobile-app',
      'E-Commerce': 'e-commerce'
    };
    const targetCat = catMap[category] || category;
    filtered = filtered.filter((p) => p.category === targetCat);
  }
  if (featured === 'true') {
    filtered = filtered.filter((p) => p.featured);
  }
  return filtered;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { category, featured } = req.query;

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return res.status(200).json({ success: true, data: filterProjects(STATIC_PROJECTS, category, featured) });
    }

    const mapped: Project[] = data.map((item) => ({
      id: item.id,
      slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: item.title,
      description: item.type,
      category: item.category,
      coverImage: '',
      images: [],
      technologies: item.tags || [],
      client: 'Agency Client',
      year: new Date(item.created_at).getFullYear() || 2025,
      featured: true,
      color: item.color,
      accentColor: item.accent_color,
    }));

    return res.status(200).json({ success: true, data: filterProjects(mapped, category, featured) });
  } catch (err) {
    return res.status(200).json({ success: true, data: filterProjects(STATIC_PROJECTS, category, featured) });
  }
}
