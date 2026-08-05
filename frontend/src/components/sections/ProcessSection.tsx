import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your goals, audience, and requirements.',
    color: '#2563FF',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'We strategize and create a roadmap tailored to your project.',
    color: '#0891b2',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We design with creativity and user experience in mind.',
    color: '#7c3aed',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'We build with clean, efficient, and scalable code.',
    color: '#0f766e',
  },
  {
    number: '05',
    title: 'Deliver',
    description: 'We test thoroughly and launch a product you\'ll love.',
    color: '#16a34a',
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — heading */}
          <AnimatedSection>
            <p className="section-label mb-3">Our Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-tight mb-4">
              A Simple, Transparent Process<br />That Delivers Results
            </h2>
          </AnimatedSection>

          {/* Right — CTA */}
          <AnimatedSection delay={0.1} direction="right">
            <Link to="/contact">
              <Button variant="primary" size="md">
                Start Your Project
              </Button>
            </Link>
          </AnimatedSection>
        </div>

        {/* Steps */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
          {STEPS.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px border-t border-dashed border-border z-0 -translate-y-1/2" />
                )}

                <div className="relative z-10">
                  {/* Step number circle */}
                  <div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 bg-white"
                    style={{ borderColor: step.color }}
                  >
                    <span className="text-sm font-bold" style={{ color: step.color }}>
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-secondary mb-1.5">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
