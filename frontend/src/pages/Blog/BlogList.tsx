import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';

const CATEGORIES = ['All', 'Design', 'Development', 'Business', 'AI'];

const POSTS = [
  { slug: 'how-to-choose-the-right-tech-stack', title: 'How to Choose the Right Tech Stack for Your Project', excerpt: 'Choosing the right technology stack is one of the most critical decisions for any software project. We break down the key factors.', category: 'Development', date: 'May 20, 2025', readTime: 5, color: '#1e3a8a' },
  { slug: 'importance-of-ui-ux-in-modern-web-design', title: 'The Importance of UI/UX in Modern Web Design', excerpt: 'User experience is the backbone of any successful digital product. Learn why investing in UI/UX design pays off.', category: 'Design', date: 'May 10, 2025', readTime: 4, color: '#1e1a4e' },
  { slug: '10-web-design-trends-in-2025', title: '10 Web Design Trends in 2025 You Should Know', excerpt: 'The digital design world is evolving fast. Discover the top trends shaping web design this year.', category: 'Design', date: 'May 15, 2025', readTime: 6, color: '#1a2e1e' },
  { slug: 'building-scalable-apis-with-nodejs', title: 'Building Scalable APIs with Node.js and Express', excerpt: 'Learn best practices for building production-ready APIs that can scale to millions of users.', category: 'Development', date: 'Apr 28, 2025', readTime: 7, color: '#2e1a0a' },
  { slug: 'ai-in-product-development', title: 'How AI is Transforming Product Development in 2025', excerpt: 'From code generation to design automation, AI is changing how digital products are built.', category: 'AI', date: 'Apr 15, 2025', readTime: 5, color: '#0a1a2e' },
  { slug: 'grow-your-startup-digital-presence', title: 'How to Grow Your Startup\'s Digital Presence', excerpt: 'Practical strategies for early-stage companies to build a strong online presence on a budget.', category: 'Business', date: 'Apr 5, 2025', readTime: 4, color: '#2e0a1a' },
];

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = POSTS.filter((post) => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blog — Zerocoded | Insights on Design & Development</title>
        <meta name="description" content="Thoughts on design, development, and digital growth from the Zerocoded team." />
        <link rel="canonical" href="https://zerocoded.com/blog" />
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-xl">
            <p className="section-label mb-3">Our Blog</p>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight mb-4">
              Insights. Ideas.<br />Inspiration.
            </h1>
            <p className="text-muted leading-relaxed">
              Thoughts on design, development, and digital growth from the Zerocoded team.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters + Search */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container-custom py-4 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex gap-2 overflow-x-auto scrollbar-thin">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-surface text-muted border border-border hover:border-primary/30 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            />
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-large transition-all duration-300">
                    <div className="h-44 relative overflow-hidden" style={{ backgroundColor: post.color }}>
                      <div className="absolute inset-0 flex items-end p-4">
                        <Badge variant="primary" size="sm">{post.category}</Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h2 className="font-semibold text-secondary group-hover:text-primary transition-colors leading-snug mb-2">
                        {post.title}
                      </h2>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-2xs text-muted"><Calendar size={10} />{post.date}</span>
                        <span className="flex items-center gap-1 text-2xs text-muted"><Clock size={10} />{post.readTime} min read</span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}
