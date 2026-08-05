import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import QuoteForm from '@/components/forms/QuoteForm';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'Project timelines vary depending on complexity and scope. A website typically takes 4–8 weeks, while a web application can take 8–16 weeks. We provide a detailed timeline during our discovery phase.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Absolutely. We love working with startups and early-stage companies. We understand the need for speed, flexibility, and budget-consciousness at this stage.',
  },
  {
    q: 'What is your development process?',
    a: 'We follow a 5-step process: Discover → Plan → Design → Develop → Deliver. We involve you at every stage to ensure the final product exceeds your expectations.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'Yes! We offer ongoing maintenance and support packages to keep your product running smoothly after launch.',
  },
  {
    q: 'How do we get started?',
    a: 'Simply fill out the quote request form on this page or send us an email. We\'ll schedule a free discovery call to discuss your project in detail.',
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div key={i} className="border border-border rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-sm font-semibold text-secondary pr-4">{faq.q}</span>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} className="text-muted shrink-0" />
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 text-sm text-muted leading-relaxed border-t border-border pt-3">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Zerocoded — Request a Quote</title>
        <meta name="description" content="Ready to build something amazing? Contact Zerocoded to request a quote for your next digital project." />
        <link rel="canonical" href="https://zerocoded.com/contact" />
      </Helmet>

      {/* Hero */}
      <section className="pt-16 pb-10 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-2xl">
            <p className="section-label mb-3">Contact Us</p>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight mb-4">
              Let's Build Something<br />Amazing Together
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Tell us about your project. We'll get back to you within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact details + quote form */}
      <section className="section-padding bg-surface">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Contact info */}
          <AnimatedSection className="flex flex-col gap-5">
            {[
              { icon: Mail, label: 'Email', value: 'hello@zerocoded.com', href: 'mailto:hello@zerocoded.com' },
              { icon: Phone, label: 'Phone', value: '+234 800 000 0000', href: 'tel:+2348000000000' },
              { icon: MapPin, label: 'Location', value: 'Lagos, Nigeria', href: undefined },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 items-start bg-white rounded-xl border border-border p-4">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-medium text-secondary hover:text-primary transition-colors">{value}</a>
                  ) : (
                    <p className="text-sm font-medium text-secondary">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border border-border bg-slate-100 h-48 flex items-center justify-center text-sm text-muted">
              <div className="text-center">
                <MapPin size={24} className="text-muted mx-auto mb-2" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Quote form */}
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-soft">
              <h2 className="text-xl font-bold text-secondary mb-1">Request a Quote</h2>
              <p className="text-sm text-muted mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>
              <QuoteForm />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="section-label mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-secondary">Frequently Asked Questions</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <FAQ />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
