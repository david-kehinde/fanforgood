'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { FanEntry, LeaderboardSettings } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function LeaderboardSection({
  entries,
  settings,
}: {
  entries: FanEntry[];
  settings: LeaderboardSettings;
}) {
  return (
    <section className="py-24 lg:py-32 bg-neutral-50 dark:bg-ink-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leaderboard"
          title={settings.title}
          description={settings.subtitle}
        />

        <div className="bg-white dark:bg-ink rounded-2xl border border-neutral-100 dark:border-ink-soft overflow-hidden shadow-luxury">
          {entries.length === 0 ? (
            <p className="p-8 text-center text-neutral-500">
              Be the first on the leaderboard — shop and get your order approved!
            </p>
          ) : (
            entries.slice(0, settings.maxDisplay).map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 border-b border-neutral-100 dark:border-ink-soft last:border-0"
              >
                <span className={`font-bold w-10 text-center ${i < 3 ? 'text-gold-600 text-lg' : 'text-neutral-400'}`}>
                  {i < 3 ? <Trophy className="h-5 w-5 mx-auto" /> : `#${i + 1}`}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-ink dark:text-white">
                    {entry.profile?.display_name ?? 'Fan'}
                  </p>
                  <p className="text-xs text-neutral-500">{entry.celebrity?.name}</p>
                </div>
                <span className="font-semibold text-gold-600">{entry.entries} entries</span>
              </motion.div>
            ))
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/dashboard" className="text-gold-600 font-medium hover:underline">
            View full leaderboard →
          </Link>
        </div>
      </div>
    </section>
  );
}
