'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-ink">
      <div className="absolute inset-0 bg-gradient-to-br from-gold-50/50 via-transparent to-transparent dark:from-gold-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 dark:bg-gold-500/10 text-gold-700 dark:text-gold-400 text-sm font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
              Official Celebrity Charity Platform
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-ink dark:text-white leading-[1.1] tracking-tight">
              Meet Your Favorite Celebrities While{' '}
              <span className="text-gold-500">Changing Lives</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
              Support meaningful charitable causes through official celebrity merchandise
              purchases. Every purchase helps raise funds for charity and increases your
              opportunity to attend exclusive celebrity meet-and-greet experiences.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="/store" size="lg">
                Shop & Support
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/#how-it-works" variant="secondary" size="lg">
                How It Works
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-8 text-sm text-neutral-500">
              <div>
                <span className="block text-2xl font-semibold text-ink dark:text-white">
                  $12.4M+
                </span>
                Raised for charity
              </div>
              <div className="h-10 w-px bg-neutral-200 dark:bg-ink-soft" />
              <div>
                <span className="block text-2xl font-semibold text-ink dark:text-white">
                  156K+
                </span>
                Fans participating
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-luxury-lg">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=1000&fit=crop"
                alt="Excited fans meeting celebrities at a charity event"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-medium text-lg">
                  Exclusive meet-and-greet experiences
                </p>
                <p className="text-white/80 text-sm mt-1">
                  Supporting verified charities worldwide
                </p>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-white dark:bg-ink-muted rounded-xl p-4 shadow-luxury border border-neutral-100 dark:border-ink-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center">
                  <Play className="h-5 w-5 text-ink ml-0.5" fill="currentColor" />
                </div>
                <div>
                  <p className="font-semibold text-ink dark:text-white text-sm">
                    Watch impact stories
                  </p>
                  <p className="text-xs text-neutral-500">2 min highlight reel</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
