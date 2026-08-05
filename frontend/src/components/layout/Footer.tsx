import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import NewsletterForm from '@/components/forms/NewsletterForm';
import api from '@/lib/axios';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/website-design' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const SERVICES = [
  { label: 'Website Design', href: '/services/website-design' },
  { label: 'Web Development', href: '/services/web-apps' },
  { label: 'Mobile App Development', href: '/services/mobile-apps' },
  { label: 'UI/UX Design', href: '/services/ui-ux' },
  { label: 'E-Commerce Solutions', href: '/services/ecommerce' },
  { label: 'Branding & Identity', href: '/services/branding' },
];

const RESOURCES = [
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/work' },
  { label: 'FAQ', href: '/contact#faq' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const SOCIAL = [
  { icon: Facebook, href: 'https://facebook.com/zerocoded', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/zerocoded', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/zerocoded', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/zerocoded', label: 'Instagram' },
];

export default function Footer() {
  const [certUrl, setCertUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await api.get('/api/settings');
        if (res.data?.data?.business_cert_url) {
          setCertUrl(res.data.data.business_cert_url);
        }
      } catch (err) {
        // Ignore settings query error in footer
      }
    }
    fetchSettings();
  }, []);

  return (
    <footer className="bg-white border-t border-border">
      {/* Main footer grid */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 11L7 5M7 5L11 11M7 5V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 13H12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-secondary text-lg tracking-tight">zerocoded</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs mb-6">
              We design, we code. Building premium digital experiences that help brands grow, stand out, and lead the future.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-secondary mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-secondary mb-4">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-secondary mb-4">Resources</h3>
            <ul className="flex flex-col gap-2.5 mb-6">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-secondary mb-3">Let's Stay in Touch</h3>
            <p className="text-xs text-muted mb-3 leading-relaxed">
              Subscribe for the latest updates, insights, and offers.
            </p>
            <NewsletterForm compact />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Zerocoded. All rights reserved.
          </p>
          <div className="flex gap-4">
            {certUrl && (
              <a href={certUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-primary transition-colors">
                Business Certificate
              </a>
            )}
            <Link to="/privacy" className="text-xs text-muted hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
