'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  const categoryLabels = {
    't-shirt': 'T-Shirt',
    hoodie: 'Hoodie',
    signed: 'Signed',
    limited: 'Limited Edition',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white dark:bg-ink-muted rounded-2xl overflow-hidden border border-neutral-100 dark:border-ink-soft hover:shadow-luxury transition-shadow duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-ink-soft">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        {product.limited && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-gold-500 text-ink rounded-full">
            Limited
          </span>
        )}
        <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium bg-white/90 dark:bg-ink/90 text-ink dark:text-white rounded-full backdrop-blur-sm">
          {categoryLabels[product.category]}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs text-gold-600 dark:text-gold-400 font-medium uppercase tracking-wider">
          {product.celebrityName}
        </p>
        <h3 className="font-semibold text-ink dark:text-white mt-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{product.charity}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-ink dark:text-white">
            {formatCurrency(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-white text-sm font-medium hover:bg-ink-soft transition-colors dark:bg-gold-500 dark:text-ink dark:hover:bg-gold-400"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
