import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

const STATS = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 4, suffix: '+', label: 'Years of Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(to / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= to) {
              setCount(to);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="font-bold text-2xl md:text-3xl text-secondary">
      {count}{suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <AnimatedSection>
            <p className="section-label mb-3">About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-tight mb-4">
              We're More Than<br />Developers.<br />
              <span className="text-accent">We're Problem Solvers.</span>
            </h2>
            <p className="text-muted leading-relaxed mb-6 max-w-md">
              Zerocoded works side by side with ambitious businesses to turn ideas into digital products that solve real problems and drive real growth.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {STATS.map(({ value, suffix, label }) => (
                <div key={label}>
                  <CountUp to={value} suffix={suffix} />
                  <p className="text-xs text-muted mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="primary" size="md">
                Learn More About Us
              </Button>
            </Link>
          </AnimatedSection>

          {/* Right — image placeholder */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="relative">
              {/* Main image placeholder */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200">
                {/* Team working illustration */}
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80" />
                  {/* People silhouettes */}
                  <div className="relative z-10 flex items-end gap-3 px-8">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div
                          className="rounded-full bg-white/20"
                          style={{ width: 32 + i * 4, height: 32 + i * 4 }}
                        />
                        <div
                          className="rounded-t-xl bg-white/10"
                          style={{ width: 40 + i * 4, height: 60 + i * 8 }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-1 bg-white/10 rounded-full mb-2" />
                    <div className="h-1 bg-white/10 rounded-full w-2/3" />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl border border-border shadow-medium p-4 min-w-[140px]">
                <p className="text-2xl font-bold text-secondary">50+</p>
                <p className="text-xs text-muted">Projects delivered</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
