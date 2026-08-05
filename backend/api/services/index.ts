import { VercelRequest, VercelResponse } from '@vercel/node';
import type { Service } from '../../../shared/src/types';

const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'website-design',
    title: 'Website Design',
    description: 'Beautiful, modern, and conversion-focused websites tailored to your brand.',
    icon: 'Globe',
    features: ['Custom design', 'Mobile responsive', 'SEO optimized', 'Fast loading'],
    deliverables: ['Design mockups', 'Responsive code', 'CMS integration', 'Launch support'],
  },
  {
    id: '2',
    slug: 'web-application',
    title: 'Web Application Development',
    description: 'Fast, secure, and scalable web applications built with the latest technologies.',
    icon: 'Monitor',
    features: ['React & Node.js', 'Real-time features', 'API integrations', 'Cloud deployment'],
    deliverables: ['Full-stack app', 'Admin dashboard', 'API documentation', 'DevOps setup'],
  },
  {
    id: '3',
    slug: 'mobile-app',
    title: 'Mobile App Development',
    description: 'High-performance mobile apps for iOS and Android using the latest technologies.',
    icon: 'Smartphone',
    features: ['iOS & Android', 'React Native', 'Push notifications', 'Offline support'],
    deliverables: ['App builds', 'App Store submission', 'Backend API', 'Analytics setup'],
  },
  {
    id: '4',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Intuitive user experiences that delight your customers and drive results.',
    icon: 'Figma',
    features: ['User research', 'Wireframing', 'Prototyping', 'Usability testing'],
    deliverables: ['Design system', 'Figma files', 'Component library', 'Design specs'],
  },
  {
    id: '5',
    slug: 'branding',
    title: 'Branding & Identity',
    description: 'Strong brands start with strong identities. We create brands that make lasting impressions.',
    icon: 'Palette',
    features: ['Logo design', 'Brand guidelines', 'Typography', 'Color systems'],
    deliverables: ['Logo package', 'Brand guide PDF', 'Asset library', 'Social media kit'],
  },
  {
    id: '6',
    slug: 'e-commerce',
    title: 'E-Commerce Solutions',
    description: 'Online stores that sell. We build fast, beautiful, and conversion-optimized storefronts.',
    icon: 'ShoppingCart',
    features: ['Shopify / custom', 'Payment integration', 'Inventory management', 'Analytics'],
    deliverables: ['E-commerce store', 'Payment setup', 'Admin panel', 'SEO optimization'],
  },
  {
    id: '7',
    slug: 'api-development',
    title: 'API Development',
    description: 'Robust, secure, and well-documented APIs that power your applications.',
    icon: 'Code2',
    features: ['REST & GraphQL', 'Authentication', 'Rate limiting', 'Documentation'],
    deliverables: ['API service', 'Documentation', 'SDKs', 'Monitoring setup'],
  },
  {
    id: '8',
    slug: 'ai-integrations',
    title: 'AI Integrations',
    description: 'Bring the power of AI into your product with seamless integrations.',
    icon: 'Brain',
    features: ['OpenAI / Claude', 'Custom ML models', 'Chatbots', 'Data analysis'],
    deliverables: ['AI feature', 'Training pipeline', 'API integration', 'Documentation'],
  },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return res.status(200).json({ success: true, data: SERVICES });
}
