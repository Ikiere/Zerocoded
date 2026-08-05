import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Website Design', href: '/services/website-design' },
      { label: 'Web Applications', href: '/services/web-apps' },
      { label: 'Mobile Apps', href: '/services/mobile-apps' },
      { label: 'UI/UX Design', href: '/services/ui-ux' },
      { label: 'Branding', href: '/services/branding' },
      { label: 'E-Commerce', href: '/services/ecommerce' },
      { label: 'API Development', href: '/services/api-development' },
      { label: 'AI Solutions', href: '/services/ai-solutions' },
    ],
  },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

// Logo SVG
function ZerocodedLogo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5 group', className)} aria-label="Zerocoded home">
      <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-primary/40 shadow-sm group-hover:scale-105 transition-transform duration-200">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11L7 5M7 5L11 11M7 5V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 13H12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <span className="font-bold text-secondary text-lg tracking-tight">zerocoded</span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-soft'
            : 'bg-transparent'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <ZerocodedLogo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        className={cn(
                          'flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                          'text-muted hover:text-secondary hover:bg-surface'
                        )}
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={cn(
                            'transition-transform duration-200',
                            servicesOpen ? 'rotate-180' : ''
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            className="absolute top-full left-0 pt-2"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                          >
                            <div className="bg-white rounded-2xl border border-border shadow-large p-2 min-w-[220px]">
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  className="flex items-center px-3 py-2 text-sm text-muted hover:text-secondary hover:bg-surface rounded-lg transition-colors duration-150"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    end={link.href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                        isActive
                          ? 'text-primary bg-primary/5'
                          : 'text-muted hover:text-secondary hover:bg-surface'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/contact">
                <Button variant="primary" size="sm">
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-secondary hover:bg-surface transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-large lg:hidden overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <ZerocodedLogo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-muted hover:text-secondary hover:bg-surface transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="p-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  if (link.children) {
                    return (
                      <div key={link.label}>
                        <p className="px-3 py-2 text-xs font-semibold tracking-widest uppercase text-muted/60 mt-2">
                          Services
                        </p>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="flex items-center px-3 py-2.5 text-sm text-muted hover:text-secondary hover:bg-surface rounded-lg transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      end={link.href === '/'}
                      className={({ isActive }) =>
                        cn(
                          'px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                          isActive ? 'text-primary bg-primary/5' : 'text-muted hover:text-secondary hover:bg-surface'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-border">
                <Link to="/contact" className="block">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Social links */}
              <div className="p-4 flex gap-3">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((s) => (
                  <a
                    key={s}
                    href={`https://${s}.com/zerocoded`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-colors text-xs font-bold capitalize"
                    aria-label={s}
                  >
                    {s[0].toUpperCase()}
                  </a>
                ))}
              </div>
              <p className="text-center text-xs text-muted/60 pb-6">© 2025 Zerocoded. All rights reserved.</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
