'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-ink via-ink-muted to-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Mail className="h-10 w-10 text-gold-400 mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
            Stay Connected to the Cause
          </h2>
          <p className="text-neutral-400 mb-8">
            Get campaign updates, winner announcements, and exclusive merchandise drops.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-gold-400">
              <Check className="h-5 w-5" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-gold-500 text-ink font-semibold hover:bg-gold-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
