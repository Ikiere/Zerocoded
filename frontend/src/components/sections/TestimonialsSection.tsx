import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechVenture',
    content:
      "Zerocoded transformed our vision into a stunning, high-performing platform. Their attention to detail and commitment to quality is unmatched. We've seen a 40% increase in user engagement since launch.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, RetailBrand',
    content:
      "Working with Zerocoded was an absolute pleasure. They delivered our e-commerce platform ahead of schedule with features we didn't even know we needed. Revenue has doubled in 3 months.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Amara Osei',
    role: 'CTO, HealthTech',
    content:
      "The team at Zerocoded brought a level of technical expertise and design sensibility that is rare to find. Our mobile app received a 4.9-star rating on both app stores.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <p className="section-label mb-3">What clients say</p>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Trusted by Founders<br />and CTOs Alike
          </h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="bg-surface rounded-2xl border border-border p-8 md:p-12 text-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-warning fill-warning" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl text-secondary font-medium leading-relaxed mb-8">
                "{testimonial.content}"
              </blockquote>

              {/* Avatar */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-secondary text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-6' : 'bg-border w-1.5'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
