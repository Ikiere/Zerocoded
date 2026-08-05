import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/sections/HeroSection';
import TrustedBy from '@/components/sections/TrustedBy';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import AboutSection from '@/components/sections/AboutSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogPreviewSection from '@/components/sections/BlogPreviewSection';
import QuoteCTASection from '@/components/sections/QuoteCTASection';
import ContactSection from '@/components/sections/ContactSection';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zerocoded',
  url: 'https://zerocoded.com',
  logo: 'https://zerocoded.com/favicon.svg',
  description:
    'Zerocoded is a premium digital studio building websites, web apps, and mobile apps.',
  address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
  contactPoint: { '@type': 'ContactPoint', email: 'hello@zerocoded.com', contactType: 'customer service' },
  sameAs: [
    'https://twitter.com/zerocoded',
    'https://linkedin.com/company/zerocoded',
    'https://instagram.com/zerocoded',
  ],
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Zerocoded — Premium Digital Product Agency</title>
        <meta
          name="description"
          content="Zerocoded is a premium digital studio building websites, web apps, and mobile apps that help brands grow, stand out, and lead the future."
        />
        <meta property="og:title" content="Zerocoded — Premium Digital Product Agency" />
        <meta
          property="og:description"
          content="We build digital experiences that scale. Premium websites, web apps, and mobile apps."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zerocoded.com" />
        <meta property="og:image" content="https://zerocoded.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zerocoded — Premium Digital Product Agency" />
        <meta
          name="twitter:description"
          content="We build digital experiences that scale."
        />
        <link rel="canonical" href="https://zerocoded.com" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>

      <HeroSection />
      <TrustedBy />
      <ServicesSection />
      <FeaturedProjects />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <BlogPreviewSection />
        <QuoteCTASection />
      </div>
      <ContactSection />
    </>
  );
}
