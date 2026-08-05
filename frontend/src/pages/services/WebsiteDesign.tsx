import { Globe } from 'lucide-react';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';

export default function WebsiteDesign() {
  return (
    <ServicePageTemplate
      title="Website Design"
      slug="website-design"
      tagline="Beautiful Websites That Convert and Impress"
      description="We design stunning, conversion-focused websites that reflect your brand identity and turn visitors into customers."
      icon={Globe}
      color="#2563FF"
      features={[
        'Custom design — no templates', 'Mobile-first responsive layout', 'SEO optimization built-in',
        'Fast loading (Core Web Vitals)', 'CMS integration (WordPress, Sanity)', 'Analytics setup',
        'Accessibility compliant (WCAG 2.1)', 'Cross-browser compatibility', 'SSL & security setup',
      ]}
      process={[
        { step: '01', title: 'Discovery', desc: 'We learn about your brand, goals, and target audience.' },
        { step: '02', title: 'Design', desc: 'We create wireframes and high-fidelity Figma mockups.' },
        { step: '03', title: 'Development', desc: 'We build your website with clean, optimized code.' },
        { step: '04', title: 'Launch', desc: 'We test thoroughly and deploy your website.' },
      ]}
      deliverables={[
        'Fully responsive website (all screen sizes)', 'Figma design files', 'Source code (clean & documented)',
        'CMS training session', 'SEO setup (meta tags, sitemaps)', '30-day post-launch support',
      ]}
    />
  );
}

