'use client';

import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, Ticket } from 'lucide-react';
import { howItWorksSteps } from '@/lib/data';
import { SectionHeading } from '@/components/ui/SectionHeading';

const icons = {
  star: Star,
  shopping: ShoppingBag,
  heart: Heart,
  ticket: Ticket,
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-neutral-50 dark:bg-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Simple Process"
          title="How It Works"
          description="Four easy steps to support charity and earn your chance at an unforgettable celebrity experience."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => {
            const Icon = icons[step.icon as keyof typeof icons];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-ink rounded-2xl p-8 h-full border border-neutral-100 dark:border-ink-soft hover:border-gold-500/30 hover:shadow-gold transition-all duration-500">
                  <span className="text-6xl font-display font-bold text-gold-100 dark:text-gold-500/20 absolute top-4 right-6">
                    {step.step}
                  </span>
                  <div className="relative h-14 w-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-gold-600 dark:text-gold-400" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
