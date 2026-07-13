'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MapPin, Clock, Users } from 'lucide-react';
import type { Celebrity, Product } from '@/lib/types';
import { formatCurrency } from '@/lib/data';
import { useFavorites } from '@/contexts/FavoritesContext';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProductCard } from '@/components/products/ProductCard';
interface CampaignContentProps {
  celebrity: Celebrity;
  products: Product[];
}

export function CampaignContent({ celebrity, products }: CampaignContentProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const percent = (celebrity.campaignRaised / celebrity.campaignGoal) * 100;

  const campaignFaqs = [
    {
      id: 'c1',
      category: 'campaign',
      question: `How do entries work for ${celebrity.name}'s campaign?`,
      answer: `Every official merchandise purchase earns entries for ${celebrity.name}'s meet-and-greet drawing. Entry amounts vary by product—see each item for details.`,
    },
    {
      id: 'c2',
      category: 'campaign',
      question: 'What charity does this campaign support?',
      answer: `${percent.toFixed(0)}% of funds support ${celebrity.charity}. ${celebrity.charityDescription}`,
    },
    {
      id: 'c3',
      category: 'campaign',
      question: 'What does the meet-and-greet include?',
      answer: celebrity.meetGreetDetails,
    },
  ];

  return (
    <div className="pt-16">
      <section className="relative min-h-[50vh] flex items-end">
        <Image
          src={celebrity.heroImage}
          alt={celebrity.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <button
            type="button"
            onClick={() => toggleFavorite(celebrity.id)}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite(celebrity.id) ? 'fill-red-400 text-red-400' : ''
              }`}
            />
            {isFavorite(celebrity.id) ? 'Favorited' : 'Add to Favorites'}
          </button>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl lg:text-6xl font-semibold text-white"
          >
            {celebrity.name}
          </motion.h1>
          <p className="text-gold-400 text-lg mt-2">{celebrity.profession}</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-semibold text-ink dark:text-white mb-4">
                Campaign Overview
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                {celebrity.bio}
              </p>

              <div className="mt-10 p-6 rounded-2xl bg-gold-50 dark:bg-gold-500/10 border border-gold-200/50 dark:border-gold-500/20">
                <h3 className="font-semibold text-ink dark:text-white mb-2">
                  Supported Charity
                </h3>
                <p className="text-gold-700 dark:text-gold-400 font-medium">
                  {celebrity.charity}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                  {celebrity.charityDescription}
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 dark:bg-ink-muted rounded-2xl p-6 border border-neutral-100 dark:border-ink-soft h-fit sticky top-24">
              <h3 className="font-display text-xl font-semibold text-ink dark:text-white mb-6">
                Campaign Progress
              </h3>
              <ProgressBar
                current={celebrity.campaignRaised}
                goal={celebrity.campaignGoal}
              />
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                  <Users className="h-5 w-5 text-gold-500" />
                  {celebrity.participants.toLocaleString()} participants
                </div>
                <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                  <Clock className="h-5 w-5 text-gold-500" />
                  {celebrity.daysRemaining} days remaining
                </div>
                <div className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400">
                  <MapPin className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>{celebrity.meetGreetDetails}</span>
                </div>
              </div>
              <p className="mt-6 text-2xl font-bold text-ink dark:text-white">
                {formatCurrency(celebrity.campaignRaised)}{' '}
                <span className="text-sm font-normal text-neutral-500">
                  of {formatCurrency(celebrity.campaignGoal)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50 dark:bg-ink-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-ink dark:text-white mb-10">
            Official Merchandise
          </h2>
          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No merchandise available yet.</p>
          )}
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl font-semibold text-ink dark:text-white mb-6 text-center">
            Campaign FAQ
          </h2>
          <div className="space-y-3">
            {campaignFaqs.map((faq) => (
              <details
                key={faq.id}
                className="bg-white dark:bg-ink rounded-xl border border-neutral-100 dark:border-ink-soft p-5 group"
              >
                <summary className="font-medium text-ink dark:text-white cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-gold-500 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
