'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      className={`max-w-3xl mb-16 ${alignClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <span
          className={`inline-block text-sm font-semibold tracking-widest uppercase mb-4 ${
            dark ? 'text-gold-400' : 'text-gold-600'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg leading-relaxed ${
            dark ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
