'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { celebrities } from '@/lib/data';
import { useFavorites } from '@/contexts/FavoritesContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export function FeaturedCelebrities() {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <section id="celebrities" className="py-24 lg:py-32 bg-white dark:bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Campaigns"
          title="Support Your Favorite Celebrities"
          description="Browse official campaigns, shop authentic merchandise, and support verified charities."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {celebrities.map((celebrity, index) => (
            <motion.article
              key={celebrity.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group bg-white dark:bg-ink-muted rounded-2xl overflow-hidden border border-neutral-100 dark:border-ink-soft hover:shadow-luxury-lg transition-shadow duration-500"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={celebrity.image}
                  alt={celebrity.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorite(celebrity.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-ink/90 backdrop-blur-sm hover:scale-110 transition-transform"
                  aria-label={
                    isFavorite(celebrity.id)
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite(celebrity.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-ink dark:text-white'
                    }`}
                  />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-16">
                  <p className="text-gold-400 text-xs font-medium uppercase tracking-wider">
                    {celebrity.charity}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-ink dark:text-white">
                  {celebrity.name}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">{celebrity.profession}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                  {celebrity.merchandiseCount} items available
                </p>
                <Button
                  href={`/campaigns/${celebrity.slug}`}
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 group/btn"
                >
                  View Campaign
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
