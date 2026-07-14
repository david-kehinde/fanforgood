'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Celebrity } from '@/lib/types';
import { deleteCelebrity, saveCelebrity, uploadImage } from '@/lib/actions';
import { slugify } from '@/lib/utils';

export function CelebritiesAdmin({ celebrities }: { celebrities: Celebrity[] }) {
  const [editing, setEditing] = useState<Celebrity | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const empty: Partial<Celebrity> = {
    name: '',
    slug: '',
    profession: '',
    charity: '',
    charity_description: '',
    image_url: '',
    hero_image_url: '',
    bio: '',
    meet_greet_details: '',
    is_active: true,
    sort_order: 0,
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const formData = new FormData(e.currentTarget);
    const result = await saveCelebrity(formData, editing?.id);
    setLoading(false);
    if (result.error) setMessage(result.error);
    else {
      setMessage('Saved successfully!');
      setEditing(null);
      setCreating(false);
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this celebrity?')) return;
    await deleteCelebrity(id);
    window.location.reload();
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'image_url' | 'hero_image_url',
    form: HTMLFormElement
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const result = await uploadImage(fd, 'celebrities');
    if (result.url) {
      const input = form.elements.namedItem(field) as HTMLInputElement;
      if (input) input.value = result.url;
    }
  };

  const showForm = creating || editing;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">
            Celebrities
          </h1>
          <p className="text-neutral-500 mt-1">Manage celebrity profiles and charities</p>
        </div>
        <button
          type="button"
          onClick={() => { setCreating(true); setEditing(null); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-sm font-medium dark:bg-gold-500 dark:text-ink"
        >
          <Plus className="h-4 w-4" />
          Add Celebrity
        </button>
      </div>

      {message && (
        <p className="mb-4 text-sm p-3 rounded-lg bg-gold-50 text-gold-800">{message}</p>
      )}

      {showForm && (
        <form
          onSubmit={handleSave}
          className="mb-8 bg-white dark:bg-ink rounded-xl p-6 border border-neutral-100 dark:border-ink-soft space-y-4"
        >
          <h2 className="font-semibold text-lg">{editing ? 'Edit' : 'New'} Celebrity</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" defaultValue={editing?.name ?? ''} placeholder="Name" required className="admin-input" onChange={(e) => {
              const slugInput = e.currentTarget.form?.elements.namedItem('slug') as HTMLInputElement;
              if (slugInput && !editing) slugInput.value = slugify(e.target.value);
            }} />
            <input name="slug" defaultValue={editing?.slug ?? ''} placeholder="Slug" required className="admin-input" />
            <input name="profession" defaultValue={editing?.profession ?? ''} placeholder="Profession" required className="admin-input" />
            <input name="charity" defaultValue={editing?.charity ?? ''} placeholder="Charity name" required className="admin-input" />
            <input name="sort_order" type="number" defaultValue={editing?.sort_order ?? 0} placeholder="Sort order" className="admin-input" />
            <select name="is_active" defaultValue={String(editing?.is_active ?? true)} className="admin-input">
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <textarea name="charity_description" defaultValue={editing?.charity_description ?? ''} placeholder="Charity description" rows={2} className="admin-input w-full" />
          <textarea name="bio" defaultValue={editing?.bio ?? ''} placeholder="Bio" rows={3} className="admin-input w-full" />
          <textarea name="meet_greet_details" defaultValue={editing?.meet_greet_details ?? ''} placeholder="Meet & greet details" rows={2} className="admin-input w-full" />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input name="image_url" defaultValue={editing?.image_url ?? ''} placeholder="Profile image URL" required className="admin-input w-full" />
              <input type="file" accept="image/*" className="mt-2 text-sm" onChange={(e) => e.currentTarget.form && handleImageUpload(e, 'image_url', e.currentTarget.form)} />
            </div>
            <div>
              <input name="hero_image_url" defaultValue={editing?.hero_image_url ?? ''} placeholder="Hero image URL" required className="admin-input w-full" />
              <input type="file" accept="image/*" className="mt-2 text-sm" onChange={(e) => e.currentTarget.form && handleImageUpload(e, 'hero_image_url', e.currentTarget.form)} />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-full bg-gold-500 text-ink font-medium disabled:opacity-50">
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => { setEditing(null); setCreating(false); }} className="px-6 py-2 rounded-full border border-neutral-200">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {celebrities.map((c) => (
          <div key={c.id} className="bg-white dark:bg-ink rounded-xl overflow-hidden border border-neutral-100 dark:border-ink-soft">
            <div className="relative h-48">
              <Image src={c.image_url} alt={c.name} fill className="object-cover" />
              {!c.is_active && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded">Inactive</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-ink dark:text-white">{c.name}</h3>
              <p className="text-sm text-neutral-500">{c.profession}</p>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={() => { setEditing(c); setCreating(false); }} className="flex items-center gap-1 text-sm text-gold-600">
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button type="button" onClick={() => handleDelete(c.id)} className="flex items-center gap-1 text-sm text-red-500">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
                <Link href={`/campaigns/${c.slug}`} className="text-sm text-neutral-500 ml-auto">View →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
