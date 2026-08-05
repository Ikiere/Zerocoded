import { Smartphone } from 'lucide-react';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';

export default function MobileApps() {
  return (
    <ServicePageTemplate
      title="Mobile App Development"
      slug="mobile-apps"
      tagline="Native-Quality Apps for iOS & Android"
      description="We build high-performance mobile applications using React Native that deliver a premium experience on both iOS and Android."
      icon={Smartphone}
      color="#7c3aed"
      features={[
        'React Native (cross-platform)', 'iOS & Android deployment', 'Native device APIs',
        'Push notifications', 'Offline-first support', 'App Store optimization',
        'Performance profiling', 'Secure local storage', 'OTA updates',
      ]}
      process={[
        { step: '01', title: 'Discovery', desc: 'Understand your users, platform requirements, and goals.' },
        { step: '02', title: 'Design', desc: 'Create pixel-perfect mobile UI following platform guidelines.' },
        { step: '03', title: 'Development', desc: 'Build the app with clean React Native code.' },
        { step: '04', title: 'Submit', desc: 'Test on real devices, then submit to App Store & Google Play.' },
      ]}
      deliverables={[
        'iOS & Android app builds', 'App Store & Play Store submission', 'Backend API',
        'Analytics integration', 'Push notification setup', '60-day support',
      ]}
    />
  );
}

