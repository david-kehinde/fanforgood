'use client';

import Link from 'next/link';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/products/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

export function MerchandiseMarketplace({ products }: { products: Product[] }) {
  const featured = products.slice(0, 4);

  return (
    <section id="shop" className="py-24 lg:py-32 bg-neutral-50 dark:bg-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Official Merchandise"
          title="Merchandise Marketplace"
          description="Authentic, officially licensed products. Every purchase supports charity and earns campaign entries."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-ink text-ink font-medium hover:bg-ink hover:text-white transition-all dark:border-gold-400 dark:text-gold-400 dark:hover:bg-gold-400 dark:hover:text-ink"
          >
            View All Merchandise
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
