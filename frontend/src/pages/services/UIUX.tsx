import { Figma } from 'lucide-react';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';

export default function UIUX() {
  return (
    <ServicePageTemplate
      title="UI/UX Design"
      slug="ui-ux"
      tagline="Designs That Delight and Convert"
      description="We craft user-centered interfaces grounded in research, usability, and a deep understanding of what makes people click."
      icon={Figma}
      color="#ec4899"
      features={[
        'User research & personas', 'Information architecture', 'Wireframes & user flows',
        'High-fidelity Figma mockups', 'Interactive prototypes', 'Usability testing',
        'Design system creation', 'Accessibility review', 'Developer handoff',
      ]}
      process={[
        { step: '01', title: 'Research', desc: 'Understand users, competitors, and business goals.' },
        { step: '02', title: 'Wireframe', desc: 'Map out flows and low-fidelity layouts.' },
        { step: '03', title: 'Design', desc: 'Build high-fidelity mockups in Figma.' },
        { step: '04', title: 'Handoff', desc: 'Deliver design specs and assets to developers.' },
      ]}
      deliverables={[
        'User research report', 'Figma design files', 'Interactive prototype',
        'Design system / component library', 'Usability test report', 'Developer handoff documentation',
      ]}
    />
  );
}

