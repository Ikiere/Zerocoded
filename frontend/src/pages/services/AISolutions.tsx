import { Brain } from 'lucide-react';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';

export default function AISolutions() {
  return (
    <ServicePageTemplate
      title="AI Integrations"
      slug="ai-solutions"
      tagline="Bring the Power of AI Into Your Product"
      description="We seamlessly integrate AI capabilities into your existing products or build AI-native applications from scratch."
      icon={Brain}
      color="#8b5cf6"
      features={[
        'OpenAI GPT-4 integration', 'Claude (Anthropic) integration', 'Custom AI chatbots',
        'Document processing & summarization', 'Image generation & analysis', 'Semantic search (embeddings)',
        'AI-powered recommendations', 'Natural language interfaces', 'Model fine-tuning',
      ]}
      process={[
        { step: '01', title: 'Audit', desc: 'Identify high-impact AI opportunities in your product.' },
        { step: '02', title: 'Plan', desc: 'Design the AI integration architecture and data flow.' },
        { step: '03', title: 'Build', desc: 'Implement AI features with proper error handling and fallbacks.' },
        { step: '04', title: 'Monitor', desc: 'Track AI performance and continuously improve outputs.' },
      ]}
      deliverables={[
        'AI feature fully integrated into your product', 'Prompt library & documentation', 'Cost optimization strategy',
        'Monitoring dashboard', 'Model evaluation report', '60-day support',
      ]}
    />
  );
}

