import { Link } from 'react-router-dom';
import { Globe, Monitor, Smartphone, Figma, ShoppingCart, Palette, Code2, Brain } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

const SERVICES = [
  {
    icon: Globe,
    title: 'Website Design',
    description: 'Beautiful, modern, and conversion-focused websites tailored to your brand.',
    href: '/services/website-design',
  },
  {
    icon: Monitor,
    title: 'Web Development',
    description: 'Fast, secure, and scalable web applications built with the latest technologies.',
    href: '/services/web-apps',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'High-performance mobile apps for iOS and Android with the latest technologies.',
    href: '/services/mobile-apps',
  },
  {
    icon: Figma,
    title: 'UI/UX Design',
    description: 'Intuitive user experiences that delight your customers and drive results.',
    href: '/services/ui-ux',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Online stores that sell more. We build fast, beautiful storefronts.',
    href: '/services/ecommerce',
  },
  {
    icon: Palette,
    title: 'Branding & Identity',
    description: 'Strong brands start with strong identities. We create lasting impressions.',
    href: '/services/branding',
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — heading */}
          <div>
            <AnimatedSection>
              <p className="section-label mb-3">What we do</p>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-tight mb-4">
                End-to-End Digital Solutions<br />Built for Your Success
              </h2>
              <p className="text-muted max-w-sm leading-relaxed">
                We combine creativity, technology, and strategy to deliver digital products that are not just beautiful — but powerful.
              </p>
            </AnimatedSection>
          </div>

          {/* Right — service cards grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map(({ icon: Icon, title, description, href }) => (
              <StaggerItem key={title}>
                <Link
                  to={href}
                  className="group block p-5 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-medium transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-secondary mb-1.5 group-hover:text-primary transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{description}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* CTA */}
        <AnimatedSection className="mt-12 text-center lg:text-left" delay={0.3}>
          <Link to="/services/website-design">
            <Button variant="primary" size="md">
              Explore All Services
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
