import { Monitor } from 'lucide-react';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';

export default function WebApps() {
  return (
    <ServicePageTemplate
      title="Web Application Development"
      slug="web-apps"
      tagline="Scalable Web Applications Built to Perform"
      description="We engineer robust, scalable web applications using modern technologies that handle millions of users and complex workflows."
      icon={Monitor}
      color="#0891b2"
      features={[
        'React 19 & Next.js frontend', 'Node.js & Express backend', 'PostgreSQL / Supabase database',
        'Real-time features (WebSockets)', 'Authentication & authorization', 'REST & GraphQL APIs',
        'CI/CD pipeline setup', 'Cloud deployment (Vercel / AWS)', 'Performance monitoring',
      ]}
      process={[
        { step: '01', title: 'Architecture', desc: 'We design the system architecture and data models.' },
        { step: '02', title: 'UI/UX Design', desc: 'We design the user interface and experience.' },
        { step: '03', title: 'Development', desc: 'We build frontend and backend in parallel sprints.' },
        { step: '04', title: 'QA & Deploy', desc: 'We test thoroughly and deploy to production.' },
      ]}
      deliverables={[
        'Full-stack web application', 'Admin dashboard', 'API documentation (Swagger)', 'Source code repository',
        'Deployment configuration', '60-day post-launch support',
      ]}
    />
  );
}

