'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';
import { useState } from 'react';

interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccountModal({ open, onClose }: AccountModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[80]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-ink rounded-2xl shadow-luxury-lg z-[90] p-8"
            role="dialog"
            aria-labelledby="account-title"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="account-title" className="font-display text-2xl font-semibold text-ink dark:text-white">
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-ink-muted"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-neutral-500 mb-6">
              Track favorites, view your donation impact, and manage campaign entries.
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              {mode === 'signup' && (
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-ink-soft bg-white dark:bg-ink-muted text-ink dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
                />
              )}
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-ink-soft bg-white dark:bg-ink-muted text-ink dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-ink-soft bg-white dark:bg-ink-muted text-ink dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-ink text-white font-medium hover:bg-ink-soft dark:bg-gold-500 dark:text-ink"
              >
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-500">
              {mode === 'signin' ? (
                <>
                  New to FanForGood?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-gold-600 font-medium hover:underline"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-gold-600 font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>

            <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-ink-soft">
              <p className="text-xs text-neutral-400 text-center flex items-center justify-center gap-2">
                <User className="h-4 w-4" />
                Connect Supabase Auth for production accounts
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
