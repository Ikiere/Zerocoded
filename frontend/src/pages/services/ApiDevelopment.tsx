import { Code2 } from 'lucide-react';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';

export default function ApiDevelopment() {
  return (
    <ServicePageTemplate
      title="API Development"
      slug="api-development"
      tagline="Robust APIs That Power Your Applications"
      description="We build secure, well-documented, and performant APIs that serve as the backbone of your digital products."
      icon={Code2}
      color="#0f766e"
      features={[
        'REST & GraphQL APIs', 'JWT & OAuth2 authentication', 'Rate limiting & throttling',
        'Webhook support', 'API versioning', 'Swagger / OpenAPI documentation',
        'Database optimization', 'Caching strategies (Redis)', 'Error monitoring (Sentry)',
      ]}
      process={[
        { step: '01', title: 'Design', desc: 'Define endpoints, data models, and authentication strategy.' },
        { step: '02', title: 'Build', desc: 'Implement endpoints with full validation and security.' },
        { step: '03', title: 'Document', desc: 'Write comprehensive API documentation with examples.' },
        { step: '04', title: 'Deploy', desc: 'Deploy to production with monitoring and alerting.' },
      ]}
      deliverables={[
        'Production-ready API service', 'OpenAPI/Swagger documentation', 'Postman collection',
        'Authentication setup', 'Deployment configuration', '60-day support & monitoring',
      ]}
    />
  );
}

