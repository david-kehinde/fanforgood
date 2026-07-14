'use client';

import { motion } from 'framer-motion';
import type { ImpactStat } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TrendingUp, Users, Droplets, BookOpen } from 'lucide-react';

const beneficiaryStories = [
  {
    title: '500 Scholarships Funded',
    charity: 'Children\'s Education Foundation',
    description:
      'Maya Chen\'s campaign funded full-year scholarships for 500 students in underserved communities.',
    icon: BookOpen,
  },
  {
    title: '12,000 Therapy Sessions',
    charity: 'Music Therapy Alliance',
    description:
      'Marcus Rivers\'s supporters enabled music therapy programs reaching 12,000 hospital patients.',
    icon: Users,
  },
  {
    title: '47 Sports Centers Built',
    charity: 'Youth Sports Initiative',
    description:
      'Elena Voss\'s fans helped construct community sports facilities across 12 countries.',
    icon: TrendingUp,
  },
  {
    title: '200K People with Clean Water',
    charity: 'Global Clean Water Project',
    description:
      'James Okonkwo\'s campaign installed sustainable water systems serving over 200,000 people.',
    icon: Droplets,
  },
];

export function ImpactContent({
  impactStats,
  charityReports,
}: {
  impactStats: ImpactStat[];
  charityReports: { quarter: string; raised: number; distributed: number; overhead: number }[];
}) {
  return (
    <div className="pt-24 lg:pt-28 pb-24">
      <section className="bg-ink text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Transparency Dashboard"
            title="Charity Impact"
            description="Real-time data on funds raised, distributed, and the lives changed through FanForGood."
            dark
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-ink-muted border border-ink-soft"
              >
                <div className="text-3xl font-display font-bold text-gold-400">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-neutral-400 mt-2 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-ink dark:text-white mb-8">
            Quarterly Reports
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-ink-soft">
                  <th className="py-4 pr-4 font-semibold text-ink dark:text-white">
                    Quarter
                  </th>
                  <th className="py-4 pr-4 font-semibold text-ink dark:text-white">
                    Raised
                  </th>
                  <th className="py-4 pr-4 font-semibold text-ink dark:text-white">
                    Distributed
                  </th>
                  <th className="py-4 font-semibold text-ink dark:text-white">
                    Overhead %
                  </th>
                </tr>
              </thead>
              <tbody>
                {charityReports.map((row) => (
                  <tr
                    key={row.quarter}
                    className="border-b border-neutral-100 dark:border-ink-soft"
                  >
                    <td className="py-4 text-ink dark:text-white">{row.quarter}</td>
                    <td className="py-4 text-neutral-600 dark:text-neutral-400">
                      {formatCurrency(row.raised)}
                    </td>
                    <td className="py-4 text-gold-600 dark:text-gold-400 font-medium">
                      {formatCurrency(row.distributed)}
                    </td>
                    <td className="py-4 text-neutral-600 dark:text-neutral-400">
                      {row.overhead}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50 dark:bg-ink-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-ink dark:text-white mb-12 text-center">
            Beneficiary Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {beneficiaryStories.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-8 bg-white dark:bg-ink rounded-2xl border border-neutral-100 dark:border-ink-soft"
              >
                <story.icon className="h-10 w-10 text-gold-500 mb-4" />
                <h3 className="font-display text-xl font-semibold text-ink dark:text-white">
                  {story.title}
                </h3>
                <p className="text-sm text-gold-600 dark:text-gold-400 mt-1">
                  {story.charity}
                </p>
                <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {story.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-ink">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="font-display text-2xl font-semibold text-ink dark:text-white mb-4">
            Donation Breakdown
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            On average, 88% of every dollar goes directly to charitable programs,
            6% covers platform operations, and 6% supports fulfillment and logistics.
          </p>
          <div className="flex h-4 rounded-full overflow-hidden">
            <div className="bg-gold-500" style={{ width: '88%' }} title="Programs 88%" />
            <div className="bg-ink-muted" style={{ width: '6%' }} title="Operations 6%" />
            <div className="bg-neutral-300 dark:bg-ink-soft" style={{ width: '6%' }} title="Fulfillment 6%" />
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gold-500" />
              Programs 88%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-ink-muted" />
              Operations 6%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-neutral-300" />
              Fulfillment 6%
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
