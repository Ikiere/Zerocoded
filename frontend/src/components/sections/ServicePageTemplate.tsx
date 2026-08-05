import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LucideIcon, CheckCircle, ArrowRight } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import QuoteCTASection from '@/components/sections/QuoteCTASection';

interface ServicePageProps {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
  process: { step: string; title: string; desc: string }[];
  deliverables: string[];
}

export default function ServicePageTemplate({
  title,
  slug,
  tagline,
  description,
  icon: Icon,
  color,
  features,
  process,
  deliverables,
}: ServicePageProps) {
  return (
    <>
      <Helmet>
        <title>{title} — Zerocoded</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://zerocoded.com/services/${slug}`} />
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <Icon size={14} />
                {title}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight mb-4">
                {tagline}
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-8 max-w-md">
                {description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact">
                  <Button variant="primary" size="lg">Request a Quote</Button>
                </Link>
                <Link to="/work">
                  <Button variant="outline" size="lg">View Our Work</Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Service icon display */}
            <AnimatedSection direction="right" delay={0.15}>
              <div
                className="relative rounded-3xl overflow-hidden h-64 lg:h-80 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`, border: `1px solid ${color}25` }}
              >
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon size={48} style={{ color }} />
                </div>
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-xl border" style={{ borderColor: `${color}30` }} />
                <div className="absolute bottom-8 left-8 w-10 h-10 rounded-lg" style={{ backgroundColor: `${color}15` }} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-3">What's Included</p>
            <h2 className="text-3xl font-bold text-secondary">Everything You Need</h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <StaggerItem key={feature}>
                <div className="flex items-start gap-3 bg-white rounded-xl border border-border p-4">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color }} />
                  <span className="text-sm text-secondary">{feature}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-3">How We Work</p>
            <h2 className="text-3xl font-bold text-secondary">Our Process</h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p) => (
              <StaggerItem key={p.step}>
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {p.step}
                  </div>
                  <h3 className="font-semibold text-secondary mb-2">{p.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="section-label mb-3">What You Get</p>
              <h2 className="text-3xl font-bold text-secondary mb-6">Deliverables</h2>
              <ul className="flex flex-col gap-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3">
                    <ArrowRight size={16} style={{ color }} className="shrink-0" />
                    <span className="text-muted">{d}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.15} className="bg-white rounded-2xl border border-border p-8">
              <h3 className="text-lg font-bold text-secondary mb-2">Ready to get started?</h3>
              <p className="text-muted text-sm mb-5">Tell us about your project and we'll provide a custom quote within 24 hours.</p>
              <Link to="/contact">
                <Button variant="primary" size="md" className="w-full justify-center">Request a Quote</Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <QuoteCTASection />
    </>
  );
}
