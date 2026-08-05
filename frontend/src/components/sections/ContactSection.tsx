import { Mail, Phone, MapPin } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactForm from '@/components/forms/ContactForm';

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@zerocoded.com',
    href: 'mailto:hello@zerocoded.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+234 800 000 0000',
    href: 'tel:+2348000000000',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Lagos, Nigeria',
    href: undefined,
  },
];

export default function ContactSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — contact info */}
          <AnimatedSection>
            <p className="section-label mb-3">Contact Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-tight mb-4">
              Let's Build Something<br />Amazing Together
            </h2>
            <p className="text-muted leading-relaxed mb-8 max-w-sm">
              We'd love to hear about your idea. Tell us about your project and we'll get back to you.
            </p>

            <div className="flex flex-col gap-5">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-secondary hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-secondary">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right — contact form */}
          <AnimatedSection delay={0.15} direction="right">
            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-soft">
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
