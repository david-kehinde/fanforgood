'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/data';

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-ink z-[70] shadow-luxury-lg flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-ink-soft">
              <h2 className="font-display text-xl font-semibold text-ink dark:text-white">
                Cart ({totalItems})
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-ink-muted"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-neutral-300 mb-4" />
                  <p className="text-neutral-500 mb-4">Your cart is empty</p>
                  <Link
                    href="/store"
                    onClick={() => setIsOpen(false)}
                    className="text-gold-600 font-medium hover:underline"
                  >
                    Browse merchandise
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-ink dark:text-white truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-neutral-500">{product.celebrityName}</p>
                        <p className="text-gold-600 font-semibold mt-1">
                          {formatCurrency(product.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1)
                            }
                            className="p-1 rounded border border-neutral-200 dark:border-ink-soft"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity + 1)
                            }
                            className="p-1 rounded border border-neutral-200 dark:border-ink-soft"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="ml-auto text-sm text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-100 dark:border-ink-soft space-y-4">
                <div className="flex justify-between text-lg font-semibold text-ink dark:text-white">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <p className="text-xs text-neutral-500">
                  25%+ of your purchase supports verified charities. Entries applied at checkout.
                </p>
                <button
                  type="button"
                  className="w-full py-4 rounded-full bg-ink text-white font-medium hover:bg-ink-soft transition-colors dark:bg-gold-500 dark:text-ink dark:hover:bg-gold-400"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
