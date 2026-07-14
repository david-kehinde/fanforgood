'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ImpactStat } from '@/lib/types';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

export function CharityImpact({ stats }: { stats: ImpactStat[] }) {
  return (
    <section className="py-24 lg:py-32 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,162,39,0.15),_transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Real Impact"
          title="Charity Impact at Scale"
          description="Every purchase creates measurable change. Track our collective impact in real time."
          dark
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl bg-ink-muted/50 border border-ink-soft backdrop-blur-sm"
            >
              <div className="font-display text-4xl lg:text-5xl font-bold text-gold-400 mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-neutral-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-gold-400 font-medium hover:text-gold-300 transition-colors"
          >
            View full transparency dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
