'use client';

import { useState } from 'react';
import type { ImpactStat } from '@/lib/types';
import { updateImpactStats } from '@/lib/actions';

export function SettingsAdmin({ impactStats }: { impactStats: ImpactStat[] }) {
  const [stats, setStats] = useState(impactStats);
  const [message, setMessage] = useState('');

  const updateStat = (index: number, field: keyof ImpactStat, value: string) => {
    setStats((prev) =>
      prev.map((s, i) =>
        i === index
          ? { ...s, [field]: field === 'value' ? Number(value) : value }
          : s
      )
    );
  };

  const save = async () => {
    await updateImpactStats(stats);
    setMessage('Impact stats saved!');
  };

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">Site Settings</h1>
      <p className="text-neutral-500 mt-1 mb-8">Edit homepage impact statistics</p>

      {message && <p className="mb-4 p-3 bg-gold-50 text-gold-800 rounded-lg text-sm">{message}</p>}

      <div className="bg-white dark:bg-ink rounded-xl p-6 border max-w-2xl space-y-4">
        <h2 className="font-semibold">Impact Stats</h2>
        {stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-4 gap-3">
            <input value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Label" className="admin-input col-span-2" />
            <input type="number" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)} placeholder="Value" className="admin-input" />
            <input value={stat.prefix ?? stat.suffix ?? ''} onChange={(e) => updateStat(i, stat.prefix !== undefined ? 'prefix' : 'suffix', e.target.value)} placeholder="Prefix/Suffix" className="admin-input" />
          </div>
        ))}
        <button type="button" onClick={save} className="px-6 py-2 rounded-full bg-gold-500 text-ink font-medium">Save Stats</button>
      </div>

      <div className="mt-8 p-6 bg-neutral-50 dark:bg-ink rounded-xl border max-w-2xl">
        <h2 className="font-semibold mb-2">Setup Reminder</h2>
        <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside">
          <li>Run <code className="bg-neutral-200 dark:bg-ink-muted px-1 rounded">supabase/schema.sql</code> in your Supabase SQL editor</li>
          <li>Set <code className="bg-neutral-200 dark:bg-ink-muted px-1 rounded">ADMIN_EMAILS</code> in .env to auto-promote admins</li>
          <li>Promote admin manually: <code className="bg-neutral-200 dark:bg-ink-muted px-1 rounded">update profiles set role=&apos;admin&apos; where email=&apos;you@email.com&apos;</code></li>
        </ul>
      </div>
    </div>
  );
}
