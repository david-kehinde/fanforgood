'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { SectionHeading } from '@/components/ui/SectionHeading';

const typeLabels = {
  fan: 'Fan Story',
  charity: 'Charity Partner',
  celebrity: 'Celebrity',
};

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-neutral-50 dark:bg-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Stories That Matter"
          title="What People Are Saying"
          description="Hear from fans, charity partners, and celebrities about the FanForGood experience."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative bg-white dark:bg-ink rounded-2xl p-8 border border-neutral-100 dark:border-ink-soft shadow-sm hover:shadow-luxury transition-shadow"
            >
              <Quote className="h-10 w-10 text-gold-200 dark:text-gold-500/30 absolute top-6 right-6" />
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-gold-50 dark:bg-gold-500/10 text-gold-700 dark:text-gold-400 rounded-full mb-4">
                {typeLabels[item.type]}
              </span>
              <p className="text-lg text-ink dark:text-white leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <cite className="not-italic font-semibold text-ink dark:text-white">
                    {item.name}
                  </cite>
                  <p className="text-sm text-neutral-500">{item.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
