import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const POSTS = [
  {
    slug: 'how-to-choose-the-right-tech-stack',
    title: 'How to Choose the Right Tech Stack for Your Project',
    date: 'May 20, 2025',
    readTime: 5,
    category: 'Development',
    color: '#1e3a8a',
  },
  {
    slug: 'importance-of-ui-ux-in-modern-web-design',
    title: 'The Importance of UI/UX in Modern Web Design',
    date: 'May 10, 2025',
    readTime: 4,
    category: 'Design',
    color: '#1e1a4e',
  },
  {
    slug: '10-web-design-trends-in-2025',
    title: '10 Web Design Trends in 2025 You Should Know',
    date: 'May 15, 2025',
    readTime: 6,
    category: 'Design',
    color: '#1a2e1e',
  },
];

export default function BlogPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <AnimatedSection>
            <p className="section-label mb-3">Our Blog</p>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-tight">
              Insights. Ideas. Inspiration.
            </h2>
            <p className="text-muted mt-2 max-w-xs">
              Thoughts on design, development, and digital growth.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Link to="/blog">
              <Button variant="outline" size="sm">
                View All Articles
              </Button>
            </Link>
          </AnimatedSection>
        </div>

        <StaggerContainer className="flex flex-col gap-4">
          {POSTS.map((post) => (
            <StaggerItem key={post.slug}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex gap-5 group items-center p-3 -m-3 rounded-2xl border border-transparent hover:border-border hover:bg-surface dark:hover:bg-surface/50 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div
                    className="w-20 h-16 rounded-xl shrink-0 overflow-hidden relative"
                    style={{ backgroundColor: post.color }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="w-full h-full flex items-end p-2 relative z-10">
                      <div className="w-full h-1 bg-white/20 rounded-full group-hover:bg-white/40 transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="primary" size="sm" className="group-hover:bg-primary-600 transition-colors">{post.category}</Badge>
                    </div>
                    <h3 className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-2xs text-muted">
                        <Calendar size={10} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1 text-2xs text-muted">
                        <Clock size={10} />
                        {post.readTime} min read
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
