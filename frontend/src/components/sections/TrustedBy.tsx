import { motion } from 'framer-motion';

const LOGOS = [
  'logoipsum',
  'logoipsum',
  'logoipsum',
  'logoipsum',
  'logoipsum',
];

// Placeholder SVG logo
function PlaceholderLogo({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-2 opacity-40 hover:opacity-60 transition-opacity duration-300">
      <div className="w-6 h-6 rounded-md bg-muted/30" />
      <span className="text-sm font-medium text-muted">logoipsum</span>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section className="py-10 border-t border-border bg-white">
      <div className="container-custom">
        <p className="text-center text-xs text-muted/60 mb-6">
          Trusted by forward-thinking brands worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {LOGOS.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <PlaceholderLogo index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
