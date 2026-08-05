import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

type Category = 'all' | 'Websites' | 'Web Apps' | 'Mobile Apps' | 'E-Commerce';

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Websites', value: 'Websites' },
  { label: 'Web Apps', value: 'Web Apps' },
  { label: 'Mobile Apps', value: 'Mobile Apps' },
  { label: 'E-Commerce', value: 'E-Commerce' },
];

const PROJECTS = [
  {
    id: '1',
    title: 'Fintech Dashboard',
    type: 'Web Application',
    category: 'Web Apps' as Category,
    color: '#1a1a2e',
    accentColor: '#2563FF',
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    type: 'Website Design',
    category: 'E-Commerce' as Category,
    color: '#0a1628',
    accentColor: '#16a34a',
  },
  {
    id: '3',
    title: 'On-Demand Delivery App',
    type: 'Mobile App',
    category: 'Mobile Apps' as Category,
    color: '#1a0a2e',
    accentColor: '#7c3aed',
  },
  {
    id: '4',
    title: 'SaaS Landing Page',
    type: 'Website Design',
    category: 'Websites' as Category,
    color: '#0a1a1a',
    accentColor: '#0891b2',
  },
  {
    id: '5',
    title: 'Real Estate Platform',
    type: 'Web Application',
    category: 'Web Apps' as Category,
    color: '#1a1a0a',
    accentColor: '#ca8a04',
  },
  {
    id: '6',
    title: 'Health & Fitness App',
    type: 'Mobile App',
    category: 'Mobile Apps' as Category,
    color: '#0a1a0a',
    accentColor: '#16a34a',
  },
];

// Project card placeholder
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden border border-border bg-white hover:shadow-large transition-all duration-300 cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {/* Image placeholder */}
      <div
        className="relative h-44 overflow-hidden"
        style={{ backgroundColor: project.color }}
      >
        {/* UI decoration */}
        <div className="absolute inset-3 rounded-lg opacity-60" style={{ border: `1px solid ${project.accentColor}40` }}>
          <div className="p-2">
            <div className="flex gap-1 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 rounded-full bg-white/10 w-3/4" />
              <div className="h-1.5 rounded-full bg-white/10 w-1/2" />
              <div className="grid grid-cols-3 gap-1 mt-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 rounded-md" style={{ backgroundColor: `${project.accentColor}20` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <ExternalLink size={16} className="text-secondary" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-xs text-muted mt-0.5">{project.type}</p>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — heading */}
          <AnimatedSection>
            <p className="section-label mb-3">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-tight mb-4">
              Featured Projects
            </h2>
            <p className="text-muted max-w-sm leading-relaxed">
              We take pride in building digital products that make an impact. Here are some of our favorites.
            </p>
          </AnimatedSection>

          {/* Filters */}
          <AnimatedSection delay={0.1} className="flex items-end">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setActiveCategory(value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === value
                      ? 'bg-primary text-white shadow-primary/30 shadow-sm'
                      : 'bg-white text-muted border border-border hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all */}
        <AnimatedSection className="mt-10 flex justify-center" delay={0.2}>
          <Link to="/work">
            <Button variant="outline" size="md">
              View All Projects
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
