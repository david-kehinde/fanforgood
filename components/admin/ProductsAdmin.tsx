'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Celebrity, Product } from '@/lib/types';
import { deleteProduct, saveProduct, uploadImage } from '@/lib/actions';
import { formatCurrency, slugify } from '@/lib/utils';

export function ProductsAdmin({
  products,
  celebrities,
}: {
  products: Product[];
  celebrities: Celebrity[];
}) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await saveProduct(formData, editing?.id);
    setLoading(false);
    window.location.reload();
  };

  const showForm = creating || editing;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">Products</h1>
          <p className="text-neutral-500 mt-1">Manage merchandise, pricing, and entry points</p>
        </div>
        <button type="button" onClick={() => { setCreating(true); setEditing(null); }} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-sm font-medium dark:bg-gold-500 dark:text-ink">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="mb-8 bg-white dark:bg-ink rounded-xl p-6 border space-y-4">
          <h2 className="font-semibold">{editing ? 'Edit' : 'New'} Product</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" defaultValue={editing?.name ?? ''} placeholder="Product name" required className="admin-input" onChange={(e) => {
              const slug = e.currentTarget.form?.elements.namedItem('slug') as HTMLInputElement;
              if (slug && !editing) slug.value = slugify(e.target.value);
            }} />
            <input name="slug" defaultValue={editing?.slug ?? ''} placeholder="Slug" required className="admin-input" />
            <select name="celebrity_id" defaultValue={editing?.celebrity_id ?? ''} required className="admin-input">
              <option value="">Select celebrity</option>
              {celebrities.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select name="category" defaultValue={editing?.category ?? 't-shirt'} className="admin-input">
              <option value="t-shirt">T-Shirt</option>
              <option value="hoodie">Hoodie</option>
              <option value="signed">Signed</option>
              <option value="limited">Limited Edition</option>
            </select>
            <input name="price" type="number" step="0.01" defaultValue={editing?.price ?? ''} placeholder="Price" required className="admin-input" />
            <input name="entry_points" type="number" defaultValue={editing?.entry_points ?? 5} placeholder="Entry points" className="admin-input" />
            <select name="is_limited" defaultValue={String(editing?.is_limited ?? false)} className="admin-input">
              <option value="false">Standard</option>
              <option value="true">Limited</option>
            </select>
            <select name="is_active" defaultValue={String(editing?.is_active ?? true)} className="admin-input">
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <textarea name="description" defaultValue={editing?.description ?? ''} placeholder="Description" rows={3} className="admin-input w-full" />
          <div>
            <input name="image_url" defaultValue={editing?.image_url ?? ''} placeholder="Image URL" required className="admin-input w-full" />
            <input type="file" accept="image/*" className="mt-2 text-sm" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file || !e.currentTarget.form) return;
              const fd = new FormData(); fd.append('file', file);
              const r = await uploadImage(fd, 'products');
              if (r.url) (e.currentTarget.form.elements.namedItem('image_url') as HTMLInputElement).value = r.url;
            }} />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-full bg-gold-500 text-ink font-medium">{loading ? 'Saving...' : 'Save'}</button>
            <button type="button" onClick={() => { setEditing(null); setCreating(false); }} className="px-6 py-2 rounded-full border">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white dark:bg-ink rounded-xl overflow-hidden border">
            <div className="relative h-40">
              <Image src={p.image_url} alt={p.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm line-clamp-2">{p.name}</h3>
              <p className="text-gold-600 font-bold mt-1">{formatCurrency(p.price)}</p>
              <p className="text-xs text-neutral-500">{p.entry_points} entries · {p.celebrity_name}</p>
              <div className="flex gap-2 mt-3">
                <button type="button" onClick={() => { setEditing(p); setCreating(false); }} className="text-xs text-gold-600 flex items-center gap-1"><Pencil className="h-3 w-3" />Edit</button>
                <button type="button" onClick={async () => { if (confirm('Delete?')) { await deleteProduct(p.id); window.location.reload(); } }} className="text-xs text-red-500 flex items-center gap-1"><Trash2 className="h-3 w-3" />Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
