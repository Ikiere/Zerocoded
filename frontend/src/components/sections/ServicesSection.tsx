import { Link } from 'react-router-dom';
import { Globe, Monitor, Smartphone, Figma, ShoppingCart, Palette, Code2, Brain } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

import { motion } from 'framer-motion';

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
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="h-full"
                >
                  <Link
                    to={href}
                    className="group block h-full p-6 rounded-2xl border border-border bg-white hover:border-primary/40 hover:shadow-medium transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover subtle radial glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                        <Icon size={18} className="text-primary group-hover:rotate-6 transition-transform duration-300" />
                      </div>
                      <h3 className="text-sm font-semibold text-secondary mb-2 group-hover:text-primary transition-colors duration-200">
                        {title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed">{description}</p>
                    </div>
                  </Link>
                </motion.div>
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
