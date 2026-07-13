'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { products, celebrities } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/lib/types';

const categories = [
  { id: 'all', label: 'All' },
  { id: 't-shirt', label: 'T-Shirts' },
  { id: 'hoodie', label: 'Hoodies' },
  { id: 'signed', label: 'Signed' },
  { id: 'limited', label: 'Limited Edition' },
];

export function StoreContent() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [celebrityFilter, setCelebrityFilter] = useState('all');

  const filtered = useMemo(() => {
    return products.filter((p: Product) => {
      const matchesSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.celebrityName.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || p.category === category;
      const matchesCelebrity =
        celebrityFilter === 'all' || p.celebrityId === celebrityFilter;
      return matchesSearch && matchesCategory && matchesCelebrity;
    });
  }, [search, category, celebrityFilter]);

  return (
    <div className="pt-24 lg:pt-28 pb-24 min-h-screen bg-neutral-50 dark:bg-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-ink dark:text-white">
            Merchandise Store
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Official licensed merchandise from your favorite celebrities. Filter,
            search, and add to cart—every purchase makes a difference.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="search"
              placeholder="Search products or celebrities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-neutral-200 dark:border-ink-soft bg-white dark:bg-ink text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          <select
            value={celebrityFilter}
            onChange={(e) => setCelebrityFilter(e.target.value)}
            className="px-4 py-3 rounded-full border border-neutral-200 dark:border-ink-soft bg-white dark:bg-ink text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <option value="all">All Celebrities</option>
            {celebrities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat.id
                  ? 'bg-ink text-white dark:bg-gold-500 dark:text-ink'
                  : 'bg-white dark:bg-ink text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-ink-soft hover:border-gold-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-neutral-500 py-16">
            No products match your filters. Try adjusting your search.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
