'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  User,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { AccountModal } from '@/components/auth/AccountModal';

const navLinks = [
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#celebrities', label: 'Celebrities' },
  { href: '/store', label: 'Shop' },
  { href: '/impact', label: 'Impact' },
  { href: '/winners', label: 'Winners' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { totalItems, setIsOpen } = useCart();
  const { favorites } = useFavorites();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-ink/90 backdrop-blur-xl border-b border-neutral-100 dark:border-ink-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl lg:text-2xl font-bold text-ink dark:text-white">
              Fan<span className="text-gold-500">For</span>Good
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-ink dark:text-neutral-300 dark:hover:text-gold-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-ink-muted transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 hidden dark:block text-gold-400" />
              <Moon className="h-5 w-5 block dark:hidden text-ink" />
            </button>

            <Link
              href="/#celebrities"
              className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-ink-muted transition-colors hidden sm:block"
              aria-label={`${favorites.length} favorite celebrities`}
            >
              <Heart className="h-5 w-5 text-ink dark:text-white" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-[10px] font-bold bg-gold-500 text-ink rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-ink-muted transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User className="h-5 w-5 text-ink dark:text-white" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-ink-muted transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5 text-ink dark:text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-[10px] font-bold bg-gold-500 text-ink rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <ButtonLink href="/store" className="hidden md:inline-flex">
              Shop & Support
            </ButtonLink>

            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-neutral-100 dark:border-ink-soft bg-white dark:bg-ink"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-ink dark:text-white hover:bg-neutral-50 dark:hover:bg-ink-muted font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/store"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-full bg-ink text-white text-center font-medium dark:bg-gold-500 dark:text-ink"
              >
                Shop & Support
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}

function ButtonLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`px-5 py-2.5 text-sm font-medium rounded-full bg-ink text-white hover:bg-ink-soft transition-all dark:bg-gold-500 dark:text-ink dark:hover:bg-gold-400 ${className}`}
    >
      {children}
    </Link>
  );
}
