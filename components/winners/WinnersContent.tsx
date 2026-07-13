'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { winnerStories } from '@/lib/data';

export function WinnersContent() {
  return (
    <div className="pt-24 lg:pt-28 pb-24 min-h-screen bg-white dark:bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <span className="text-sm font-semibold tracking-widest uppercase text-gold-600 dark:text-gold-400">
            Winner Stories
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-ink dark:text-white mt-4">
            Dreams Fulfilled, Lives Changed
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Real fans, real experiences, real impact. Explore highlights from past
            meet-and-greet winners.
          </p>
        </div>

        <div className="space-y-20">
          {winnerStories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className={`grid lg:grid-cols-2 gap-10 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div
                className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-luxury-lg">
                  <Image
                    src={story.image}
                    alt={`${story.fanName} meets ${story.celebrityName}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/30">
                    <button
                      type="button"
                      className="h-16 w-16 rounded-full bg-gold-500 flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Play video"
                    >
                      <Play className="h-7 w-7 text-ink ml-1" fill="currentColor" />
                    </button>
                  </div>
                </div>
                <div className="relative aspect-[16/9] mt-4 rounded-xl overflow-hidden">
                  <Image
                    src={story.videoThumbnail}
                    alt="Video thumbnail"
                    fill
                    className="object-cover opacity-80"
                    sizes="400px"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-gold-500 text-gold-500"
                    />
                  ))}
                </div>
                <blockquote className="font-display text-2xl lg:text-3xl text-ink dark:text-white leading-snug">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <footer className="mt-6">
                  <p className="font-semibold text-ink dark:text-white">
                    {story.fanName}
                  </p>
                  <p className="text-gold-600 dark:text-gold-400">
                    Met {story.celebrityName}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Supporting {story.charity}
                  </p>
                </footer>
                <ul className="mt-8 space-y-3">
                  {story.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400"
                    >
                      <span className="h-2 w-2 rounded-full bg-gold-500 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
