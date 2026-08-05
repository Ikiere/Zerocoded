import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';

const POSTS: Record<string, {
  title: string; excerpt: string; content: string; category: string;
  date: string; readTime: number; author: string; tags: string[]; color: string;
}> = {
  'how-to-choose-the-right-tech-stack': {
    title: 'How to Choose the Right Tech Stack for Your Project',
    excerpt: 'Choosing the right technology stack is one of the most critical decisions for any software project.',
    category: 'Development',
    date: 'May 20, 2025',
    readTime: 5,
    author: 'Zerocoded Team',
    tags: ['Tech Stack', 'React', 'Node.js', 'Architecture'],
    color: '#1e3a8a',
    content: `
## Introduction

Choosing the right technology stack is one of the most important — and often most stressful — decisions in software development. The wrong choice can lead to expensive rewrites, poor performance, and a team that struggles to deliver.

## Key Factors to Consider

### 1. Project Requirements
Start with what you need to build. A content-heavy marketing site has very different requirements from a real-time financial dashboard.

### 2. Team Expertise
The best stack is often the one your team already knows well. Speed of delivery matters, especially for early-stage products.

### 3. Scalability
Consider where you'll be in 2 years. Will your stack scale with your growth? Can you add new developers easily?

### 4. Community & Ecosystem
A thriving community means better libraries, faster answers to questions, and long-term support.

## Our Recommended Stacks

**For marketing websites:** Next.js + Tailwind CSS + Vercel  
**For web applications:** React + Node.js + PostgreSQL + Supabase  
**For mobile apps:** React Native + Expo + Firebase  
**For AI-powered products:** Python + FastAPI + OpenAI + Next.js frontend  

## Conclusion

There is no universally "best" stack — only the best stack for your specific context. Take time to evaluate your requirements, team capabilities, and future growth before committing.
    `,
  },
  'importance-of-ui-ux-in-modern-web-design': {
    title: 'The Importance of UI/UX in Modern Web Design',
    excerpt: 'User experience is the backbone of any successful digital product.',
    category: 'Design',
    date: 'May 10, 2025',
    readTime: 4,
    author: 'Zerocoded Team',
    tags: ['UI/UX', 'Design', 'User Experience'],
    color: '#1e1a4e',
    content: `
## Why UX is a Business Imperative

Great design is not just about aesthetics — it's about solving problems for real people. Businesses that invest in user experience see higher conversion rates, lower churn, and stronger brand loyalty.

## The Cost of Bad UX

Studies show that 88% of users are less likely to return to a website after a bad user experience. Poor UX costs businesses billions annually in lost conversions.

## Key UX Principles

### 1. Clarity Over Cleverness
Users should never have to think about how to use your product. Clarity always wins over creative complexity.

### 2. Consistency
Consistent patterns, colors, and interactions build trust and reduce cognitive load.

### 3. Accessibility
Design for everyone. Accessibility is not optional — it's a mark of quality.

## Conclusion

Investing in UI/UX design is one of the highest-ROI decisions a product company can make. It is not a luxury — it is a competitive advantage.
    `,
  },
};

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-secondary mt-8 mb-4">{line.slice(3)}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-secondary mt-6 mb-2">{line.slice(4)}</h3>;
    if (line.startsWith('**')) return <p key={i} className="text-muted leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-secondary">$1</strong>') }} />;
    if (line.trim() === '') return <div key={i} className="my-2" />;
    return <p key={i} className="text-muted leading-relaxed mb-3">{line}</p>;
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? POSTS[slug] : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-secondary mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  const relatedSlugs = Object.keys(POSTS).filter((s) => s !== slug).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{post.title} — Zerocoded Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://zerocoded.com/blog/${slug}`} />
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <AnimatedSection>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8">
              <ArrowLeft size={14} />
              Back to Blog
            </Link>

            <Badge variant="primary" size="md" className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary leading-tight mb-4">{post.title}</h1>
            <p className="text-muted leading-relaxed mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 border-y border-border py-4">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">Z</div>
              <span className="text-sm font-medium text-secondary">{post.author}</span>
              <span className="flex items-center gap-1 text-xs text-muted"><Calendar size={12} />{post.date}</span>
              <span className="flex items-center gap-1 text-xs text-muted"><Clock size={12} />{post.readTime} min read</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Cover image */}
      <div className="container-custom max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="rounded-2xl h-64 overflow-hidden" style={{ backgroundColor: post.color }} />
      </div>

      {/* Content */}
      <section className="pb-20">
        <div className="container-custom max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="prose prose-slate max-w-none">
              {renderContent(post.content)}
            </div>
          </AnimatedSection>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
            <Tag size={14} className="text-muted" />
            {post.tags.map((tag) => (
              <Badge key={tag} variant="default" size="md">{tag}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedSlugs.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-custom max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-secondary mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedSlugs.map((s) => {
                const related = POSTS[s];
                return (
                  <Link key={s} to={`/blog/${s}`} className="group bg-white rounded-xl border border-border p-5 hover:shadow-medium transition-all">
                    <Badge variant="primary" size="sm" className="mb-2">{related.category}</Badge>
                    <h3 className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-2xs text-muted">{related.date}</span>
                      <span className="text-2xs text-muted">· {related.readTime} min read</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
