import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

// Illustration: two people working on a project
function WorkIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Person at laptop */}
      <div className="relative">
        {/* Monitor */}
        <div className="w-32 h-22 bg-secondary rounded-lg border-4 border-slate-700 mx-auto mb-1 p-2">
          <div className="w-full h-full bg-primary/20 rounded flex flex-col gap-1 p-1">
            <div className="h-1 bg-primary/60 rounded-full w-3/4" />
            <div className="h-1 bg-white/20 rounded-full w-1/2" />
            <div className="h-1 bg-white/20 rounded-full w-2/3" />
          </div>
        </div>
        {/* Stand */}
        <div className="w-1 h-4 bg-slate-600 mx-auto" />
        <div className="w-16 h-1 bg-slate-600 mx-auto rounded" />
      </div>
    </div>
  );
}

export default function QuoteCTASection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — illustration */}
          <AnimatedSection direction="left">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-slate-800 h-64 lg:h-80 flex items-center justify-center">
              {/* Glowing orbs */}
              <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-primary/20 blur-xl" />
              <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />

              {/* Content placeholder */}
              <div className="relative z-10 flex items-center gap-6">
                <div className="text-center">
                  {/* Person 1 */}
                  <div className="w-12 h-12 rounded-full bg-primary/30 border-2 border-primary/50 mx-auto mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 opacity-60">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                  <div className="w-20 h-16 bg-white/10 rounded-xl mx-auto" />
                </div>
                {/* Laptop */}
                <div className="w-28 h-20 bg-white/10 rounded-xl border border-white/10 p-2 flex flex-col gap-1">
                  <div className="h-1 bg-primary/60 rounded-full w-3/4" />
                  <div className="h-1 bg-white/20 rounded-full w-1/2" />
                  <div className="flex gap-1 mt-2">
                    <div className="w-8 h-5 bg-primary/30 rounded" />
                    <div className="w-8 h-5 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — CTA copy */}
          <AnimatedSection delay={0.1}>
            <p className="section-label mb-3">Work with Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-tight mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-muted leading-relaxed mb-6 max-w-sm">
              Let's build something amazing together. We'll get back to you within 24 hours.
            </p>

            <Link to="/contact">
              <Button variant="primary" size="lg">
                Request a Quote
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
