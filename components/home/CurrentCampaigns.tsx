'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Users, MapPin } from 'lucide-react';
import type { Campaign } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProgressBar } from '@/components/ui/ProgressBar';

function Countdown({ days }: { days: number }) {
  return (
    <div className="flex gap-2">
      {[
        { label: 'Days', value: days },
        { label: 'Hours', value: 12 },
        { label: 'Min', value: 45 },
      ].map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center px-3 py-2 bg-ink/5 dark:bg-white/5 rounded-lg min-w-[52px]"
        >
          <span className="text-lg font-bold text-ink dark:text-white tabular-nums">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase text-neutral-500">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CurrentCampaigns({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Active Now"
          title="Current Campaigns"
          description="Join live fundraising campaigns and compete for exclusive meet-and-greet experiences."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {campaigns.slice(0, 2).map((campaign, index) => (
            <motion.article
              key={campaign.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row bg-neutral-50 dark:bg-ink-muted rounded-2xl overflow-hidden border border-neutral-100 dark:border-ink-soft"
            >
              <div className="relative md:w-2/5 aspect-video md:aspect-auto min-h-[200px]">
                <Image
                  src={campaign.image_url || campaign.celebrity?.hero_image_url || ''}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="flex-1 p-6 lg:p-8 flex flex-col">
                <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
                  {campaign.title}
                </h3>
                <ProgressBar
                  current={campaign.raised}
                  goal={campaign.goal}
                  className="my-6"
                />
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gold-500" />
                    {campaign.participants.toLocaleString()} participants
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold-500" />
                    {campaign.days_remaining ?? 0} days left
                  </span>
                </div>
                <Countdown days={campaign.days_remaining ?? 0} />
                <div className="mt-6 p-4 rounded-xl bg-gold-50 dark:bg-gold-500/10 border border-gold-200/50 dark:border-gold-500/20">
                  <p className="text-sm font-medium text-ink dark:text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold-600" />
                    Meet & Greet: {campaign.meet_greet_date}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {campaign.meet_greet_location}
                  </p>
                </div>
                <Link
                  href={`/campaigns/${campaign.slug}`}
                  className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full bg-ink text-white font-medium hover:bg-ink-soft transition-colors dark:bg-gold-500 dark:text-ink dark:hover:bg-gold-400"
                >
                  Join Campaign
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
