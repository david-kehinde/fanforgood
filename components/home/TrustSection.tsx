'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, FileText, BarChart3, BadgeCheck } from 'lucide-react';
import { trustBadges } from '@/lib/data';
import { SectionHeading } from '@/components/ui/SectionHeading';

const features = [
  {
    icon: BadgeCheck,
    title: 'Verified Charity Partners',
    description: 'Every charity undergoes rigorous vetting and annual audits.',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'PCI DSS compliant processing with bank-level encryption.',
  },
  {
    icon: FileText,
    title: 'Transparency Reports',
    description: 'Quarterly published reports with full financial breakdowns.',
  },
  {
    icon: BarChart3,
    title: 'Donation Tracking',
    description: 'Track your personal impact with real-time donation dashboards.',
  },
];

export function TrustSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white dark:bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trust & Transparency"
          title="Your Support, Fully Accountable"
          description="We believe transparency builds trust. Every dollar is tracked, verified, and reported."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="text-center"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 dark:bg-gold-500/10 mb-4">
                <feature.icon className="h-7 w-7 text-gold-600 dark:text-gold-400" />
              </div>
              <h3 className="font-semibold text-ink dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-50 dark:bg-ink-muted border border-neutral-200 dark:border-ink-soft text-sm font-medium text-ink dark:text-white"
            >
              <Shield className="h-4 w-4 text-gold-500" />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
