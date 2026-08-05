import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';

type Category = 'all' | 'website' | 'web-app' | 'mobile-app' | 'e-commerce';

const FILTERS = [
  { label: 'All', value: 'all' as Category },
  { label: 'Websites', value: 'website' as Category },
  { label: 'Web Apps', value: 'web-app' as Category },
  { label: 'Mobile Apps', value: 'mobile-app' as Category },
  { label: 'E-Commerce', value: 'e-commerce' as Category },
];

const PROJECTS = [
  { id: '1', title: 'Fintech Dashboard', type: 'Web Application', category: 'web-app' as Category, color: '#1a1a2e', accent: '#2563FF', year: 2024, tags: ['React', 'TypeScript', 'Node.js'] },
  { id: '2', title: 'E-Commerce Platform', type: 'Website Design', category: 'e-commerce' as Category, color: '#0a1628', accent: '#16a34a', year: 2024, tags: ['Next.js', 'Stripe', 'Supabase'] },
  { id: '3', title: 'On-Demand Delivery App', type: 'Mobile App', category: 'mobile-app' as Category, color: '#1a0a2e', accent: '#7c3aed', year: 2024, tags: ['React Native', 'Firebase'] },
  { id: '4', title: 'SaaS Landing Page', type: 'Website Design', category: 'website' as Category, color: '#0a1a1a', accent: '#0891b2', year: 2025, tags: ['React', 'Framer Motion'] },
  { id: '5', title: 'Real Estate Platform', type: 'Web Application', category: 'web-app' as Category, color: '#1a1a0a', accent: '#ca8a04', year: 2025, tags: ['Next.js', 'PostgreSQL'] },
  { id: '6', title: 'Health & Fitness App', type: 'Mobile App', category: 'mobile-app' as Category, color: '#0a1a0a', accent: '#16a34a', year: 2025, tags: ['React Native', 'HealthKit'] },
  { id: '7', title: 'Restaurant Booking', type: 'Web Application', category: 'web-app' as Category, color: '#1a0a0a', accent: '#dc2626', year: 2024, tags: ['React', 'Node.js'] },
  { id: '8', title: 'Fashion E-Store', type: 'E-Commerce', category: 'e-commerce' as Category, color: '#0a0a1a', accent: '#ec4899', year: 2025, tags: ['Shopify', 'Custom Theme'] },
  { id: '9', title: 'Corporate Rebrand', type: 'Website Design', category: 'website' as Category, color: '#0f0f0f', accent: '#f97316', year: 2025, tags: ['Figma', 'Webflow'] },
];

export default function Portfolio() {
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <Helmet>
        <title>Our Work — Zerocoded Portfolio</title>
        <meta name="description" content="Explore Zerocoded's portfolio of websites, web applications, mobile apps, and e-commerce platforms we've built for our clients." />
        <link rel="canonical" href="https://zerocoded.com/work" />
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-2xl">
            <p className="section-label mb-3">Our Work</p>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight mb-4">
              Projects That Make<br />an Impact
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              From startups to enterprises, we've partnered with ambitious brands to build products that drive growth and deliver results.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container-custom py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
            {FILTERS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActive(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  active === value
                    ? 'bg-primary text-white shadow-primary/30 shadow-sm'
                    : 'bg-surface text-muted border border-border hover:border-primary/30 hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-large transition-all duration-300"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                >
                  {/* Project preview */}
                  <div className="relative h-48 overflow-hidden" style={{ backgroundColor: project.color }}>
                    <div className="absolute inset-4 rounded-xl border opacity-40" style={{ borderColor: `${project.accent}60` }}>
                      <div className="p-3">
                        <div className="flex gap-1 mb-3">
                          {[project.accent, '#ffffff30', '#ffffff20'].map((c, j) => (
                            <div key={j} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: `${project.accent}40` }} />
                          <div className="h-2 rounded-full w-1/2 bg-white/10" />
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {[...Array(4)].map((_, j) => (
                              <div key={j} className="h-12 rounded-lg" style={{ backgroundColor: `${project.accent}20` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <ExternalLink size={16} className="text-secondary" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs text-muted shrink-0 ml-2">{project.year}</span>
                    </div>
                    <p className="text-xs text-muted mb-3">{project.type}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-secondary mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted mb-8 max-w-md mx-auto">Tell us about your project and let's build something remarkable together.</p>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-primary-600 transition-colors shadow-primary">
                Request a Quote
              </button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
