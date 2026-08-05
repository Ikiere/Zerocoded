import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Contact = lazy(() => import('@/pages/Contact'));
const BlogList = lazy(() => import('@/pages/Blog/BlogList'));
const BlogPost = lazy(() => import('@/pages/Blog/BlogPost'));
const CV = lazy(() => import('@/pages/CV'));
const AdminLogin = lazy(() => import('@/pages/Admin/Login'));
const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'));

// Service pages
const WebsiteDesign = lazy(() => import('@/pages/services/WebsiteDesign'));
const WebApps = lazy(() => import('@/pages/services/WebApps'));
const MobileApps = lazy(() => import('@/pages/services/MobileApps'));
const UIUX = lazy(() => import('@/pages/services/UIUX'));
const Branding = lazy(() => import('@/pages/services/Branding'));
const Ecommerce = lazy(() => import('@/pages/services/Ecommerce'));
const ApiDevelopment = lazy(() => import('@/pages/services/ApiDevelopment'));
const AISolutions = lazy(() => import('@/pages/services/AISolutions'));

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Router() {
  const location = useLocation();

  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/work" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogList /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="/cv" element={<PageTransition><CV /></PageTransition>} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />

          {/* Service routes */}
          <Route path="/services/website-design" element={<PageTransition><WebsiteDesign /></PageTransition>} />
          <Route path="/services/web-apps" element={<PageTransition><WebApps /></PageTransition>} />
          <Route path="/services/mobile-apps" element={<PageTransition><MobileApps /></PageTransition>} />
          <Route path="/services/ui-ux" element={<PageTransition><UIUX /></PageTransition>} />
          <Route path="/services/branding" element={<PageTransition><Branding /></PageTransition>} />
          <Route path="/services/ecommerce" element={<PageTransition><Ecommerce /></PageTransition>} />
          <Route path="/services/api-development" element={<PageTransition><ApiDevelopment /></PageTransition>} />
          <Route path="/services/ai-solutions" element={<PageTransition><AISolutions /></PageTransition>} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <PageTransition>
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                  <p className="section-label mb-4">404 Error</p>
                  <h1 className="text-6xl font-bold text-secondary mb-4">Page not found</h1>
                  <p className="text-muted max-w-md mb-8">
                    The page you're looking for doesn't exist. Let's get you back on track.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </PageTransition>
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}
