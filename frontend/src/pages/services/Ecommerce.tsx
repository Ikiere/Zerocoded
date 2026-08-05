import { ShoppingCart } from 'lucide-react';
import ServicePageTemplate from '@/components/sections/ServicePageTemplate';

export default function Ecommerce() {
  return (
    <ServicePageTemplate
      title="E-Commerce Solutions"
      slug="ecommerce"
      tagline="Online Stores Built to Sell More"
      description="We build fast, beautiful, and conversion-optimized e-commerce experiences that turn browsers into buyers."
      icon={ShoppingCart}
      color="#16a34a"
      features={[
        'Custom or Shopify storefront', 'Payment gateway integration (Stripe, PayPal)', 'Inventory management',
        'Order tracking & fulfilment', 'Customer account portal', 'SEO-optimized product pages',
        'Mobile-optimized checkout', 'Analytics & conversion tracking', 'Email marketing integration',
      ]}
      process={[
        { step: '01', title: 'Platform', desc: 'Choose the right e-commerce platform for your needs.' },
        { step: '02', title: 'Design', desc: 'Design a storefront that reflects your brand and converts.' },
        { step: '03', title: 'Build', desc: 'Develop product pages, cart, checkout, and admin.' },
        { step: '04', title: 'Launch', desc: 'Test payments, load, and SEO before going live.' },
      ]}
      deliverables={[
        'Fully functional online store', 'Payment processing setup', 'Admin dashboard & CMS',
        'SEO optimization', 'Analytics & conversion tracking', '30-day post-launch support',
      ]}
    />
  );
}

