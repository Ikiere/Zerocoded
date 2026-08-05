import { Palette } from 'lucide-react';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';

export default function Branding() {
  return (
    <ServicePageTemplate
      title="Branding & Identity"
      slug="branding"
      tagline="Build a Brand That Stands the Test of Time"
      description="We create powerful brand identities that communicate trust, personality, and purpose — from logo design to full brand guidelines."
      icon={Palette}
      color="#f97316"
      features={[
        'Brand strategy & positioning', 'Logo design (multiple concepts)', 'Color palette & typography',
        'Brand voice & messaging', 'Business card & stationery', 'Social media kit',
        'Brand guidelines document', 'Icon & illustration set', 'Brand collateral',
      ]}
      process={[
        { step: '01', title: 'Discovery', desc: 'Brand audit, competitor analysis, and brand workshops.' },
        { step: '02', title: 'Strategy', desc: 'Define positioning, values, and brand personality.' },
        { step: '03', title: 'Design', desc: 'Create logo, color system, and typography.' },
        { step: '04', title: 'Deliver', desc: 'Final files, brand guide, and all assets delivered.' },
      ]}
      deliverables={[
        'Logo (all formats: SVG, PNG, PDF)', 'Brand guidelines PDF (50+ pages)', 'Color & typography system',
        'Social media profile graphics', 'Business card design', 'Brand asset library',
      ]}
    />
  );
}

