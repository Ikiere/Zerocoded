import { VercelRequest, VercelResponse } from '@vercel/node';
import type { Project } from '../../../shared/src/types';

// Static project data — replace with Supabase query when seeded
const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'fintech-dashboard',
    title: 'Fintech Dashboard',
    description: 'A comprehensive financial management dashboard with real-time analytics and data visualization.',
    category: 'web-app',
    coverImage: '',
    images: [],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    client: 'FinanceFlow',
    year: 2024,
    featured: true,
  },
  {
    id: '2',
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with inventory management, payments, and analytics.',
    category: 'e-commerce',
    coverImage: '',
    images: [],
    technologies: ['Next.js', 'Stripe', 'Supabase', 'Tailwind CSS'],
    client: 'RetailBrand',
    year: 2024,
    featured: true,
  },
  {
    id: '3',
    slug: 'on-demand-delivery-app',
    title: 'On-Demand Delivery App',
    description: 'Real-time delivery tracking app for iOS and Android with driver management.',
    category: 'mobile-app',
    coverImage: '',
    images: [],
    technologies: ['React Native', 'Node.js', 'Google Maps API', 'Firebase'],
    client: 'DeliverNow',
    year: 2024,
    featured: true,
  },
  {
    id: '4',
    slug: 'saas-landing-page',
    title: 'SaaS Landing Page',
    description: 'High-converting landing page design for a B2B SaaS company.',
    category: 'website',
    coverImage: '',
    images: [],
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    client: 'SaaS Co.',
    year: 2025,
    featured: false,
  },
  {
    id: '5',
    slug: 'real-estate-platform',
    title: 'Real Estate Platform',
    description: 'Property listing and management platform with AI-powered recommendations.',
    category: 'web-app',
    coverImage: '',
    images: [],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'AI/ML'],
    client: 'PropTech',
    year: 2025,
    featured: false,
  },
  {
    id: '6',
    slug: 'health-fitness-app',
    title: 'Health & Fitness App',
    description: 'Personal health tracking and workout management mobile application.',
    category: 'mobile-app',
    coverImage: '',
    images: [],
    technologies: ['React Native', 'Node.js', 'HealthKit', 'Firebase'],
    client: 'FitLife',
    year: 2025,
    featured: false,
  },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { category, featured } = req.query;

  let filtered = PROJECTS;
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (featured === 'true') {
    filtered = filtered.filter((p) => p.featured);
  }

  return res.status(200).json({ success: true, data: filtered });
}
