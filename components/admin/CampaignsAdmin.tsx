'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Campaign, Celebrity } from '@/lib/types';
import { deleteCampaign, saveCampaign } from '@/lib/actions';
import { formatCurrency, slugify } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function CampaignsAdmin({
  campaigns,
  celebrities,
}: {
  campaigns: Campaign[];
  celebrities: Celebrity[];
}) {
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await saveCampaign(new FormData(e.currentTarget), editing?.id);
    setLoading(false);
    window.location.reload();
  };

  const showForm = creating || editing;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">Campaigns</h1>
          <p className="text-neutral-500 mt-1">Manage fundraising goals and meet-and-greet details</p>
        </div>
        <button type="button" onClick={() => { setCreating(true); setEditing(null); }} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-sm font-medium dark:bg-gold-500 dark:text-ink">
          <Plus className="h-4 w-4" /> Add Campaign
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="mb-8 bg-white dark:bg-ink rounded-xl p-6 border space-y-4">
          <h2 className="font-semibold">{editing ? 'Edit' : 'New'} Campaign</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="title" defaultValue={editing?.title ?? ''} placeholder="Campaign title" required className="admin-input" onChange={(e) => {
              const slug = e.currentTarget.form?.elements.namedItem('slug') as HTMLInputElement;
              if (slug && !editing) slug.value = slugify(e.target.value);
            }} />
            <input name="slug" defaultValue={editing?.slug ?? ''} placeholder="Slug" required className="admin-input" />
            <select name="celebrity_id" defaultValue={editing?.celebrity_id ?? ''} required className="admin-input">
              <option value="">Select celebrity</option>
              {celebrities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input name="goal" type="number" defaultValue={editing?.goal ?? 100000} placeholder="Goal ($)" className="admin-input" />
            <input name="raised" type="number" defaultValue={editing?.raised ?? 0} placeholder="Raised ($)" className="admin-input" />
            <input name="participants" type="number" defaultValue={editing?.participants ?? 0} placeholder="Participants" className="admin-input" />
            <input name="end_date" type="datetime-local" defaultValue={editing?.end_date?.slice(0, 16) ?? ''} required className="admin-input" />
            <input name="meet_greet_date" defaultValue={editing?.meet_greet_date ?? ''} placeholder="Meet & greet date text" className="admin-input" />
            <input name="meet_greet_location" defaultValue={editing?.meet_greet_location ?? ''} placeholder="Location" className="admin-input" />
            <input name="image_url" defaultValue={editing?.image_url ?? ''} placeholder="Image URL" className="admin-input" />
            <select name="is_active" defaultValue={String(editing?.is_active ?? true)} className="admin-input">
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-full bg-gold-500 text-ink font-medium">Save</button>
            <button type="button" onClick={() => { setEditing(null); setCreating(false); }} className="px-6 py-2 rounded-full border">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {campaigns.map((c) => (
          <div key={c.id} className="bg-white dark:bg-ink rounded-xl p-6 border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-ink dark:text-white">{c.title}</h3>
                <p className="text-sm text-neutral-500">{c.celebrity?.name ?? '—'} · {c.days_remaining ?? 0} days left</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setEditing(c); setCreating(false); }} className="text-sm text-gold-600 flex items-center gap-1"><Pencil className="h-3 w-3" />Edit</button>
                <button type="button" onClick={async () => { if (confirm('Delete?')) { await deleteCampaign(c.id); window.location.reload(); } }} className="text-sm text-red-500"><Trash2 className="h-3 w-3" /></button>
              </div>
            </div>
            <ProgressBar current={c.raised} goal={c.goal} className="mt-4" />
            <p className="text-sm text-neutral-500 mt-2">{formatCurrency(c.raised)} raised · {c.participants} participants</p>
          </div>
        ))}
      </div>
    </div>
  );
}
