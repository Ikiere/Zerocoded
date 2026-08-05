import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

const directionVariants = {
  up:    { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 } },
  down:  { initial: { opacity: 0, y: -32 }, animate: { opacity: 1, y: 0 } },
  left:  { initial: { opacity: 0, x: -32 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 32 }, animate: { opacity: 1, x: 0 } },
  none:  { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });
  const { initial, animate } = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children wrapper
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({ children, className, staggerDelay = 0.1, once = true }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
  key?: React.Key;
}) {
  const variants = {
    hidden: directionVariants[direction].initial,
    visible: {
      ...directionVariants[direction].animate,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
