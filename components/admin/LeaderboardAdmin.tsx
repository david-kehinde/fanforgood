'use client';

import { useState } from 'react';
import type { Celebrity, FanEntry, LeaderboardSettings } from '@/lib/types';
import { updateFanEntries, updateLeaderboardSettings } from '@/lib/actions';

export function LeaderboardAdmin({
  entries,
  celebrities,
  settings,
}: {
  entries: FanEntry[];
  celebrities: Celebrity[];
  settings: LeaderboardSettings;
}) {
  const [title, setTitle] = useState(settings.title);
  const [subtitle, setSubtitle] = useState(settings.subtitle);
  const [maxDisplay, setMaxDisplay] = useState(settings.maxDisplay);
  const [showOnHomepage, setShowOnHomepage] = useState(settings.showOnHomepage);
  const [editEntry, setEditEntry] = useState<FanEntry | null>(null);
  const [newEntries, setNewEntries] = useState(0);
  const [message, setMessage] = useState('');

  const saveSettings = async () => {
    await updateLeaderboardSettings({ title, subtitle, maxDisplay, showOnHomepage });
    setMessage('Leaderboard settings saved!');
  };

  const saveEntry = async () => {
    if (!editEntry) return;
    await updateFanEntries(editEntry.user_id, editEntry.celebrity_id, newEntries, true);
    window.location.reload();
  };

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">Leaderboard</h1>
      <p className="text-neutral-500 mt-1 mb-8">Edit leaderboard copy and manually adjust fan entries</p>

      {message && <p className="mb-4 p-3 bg-gold-50 text-gold-800 rounded-lg text-sm">{message}</p>}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white dark:bg-ink rounded-xl p-6 border space-y-4">
          <h2 className="font-semibold">Display Settings</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="admin-input w-full" />
          <textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtitle" rows={2} className="admin-input w-full" />
          <input type="number" value={maxDisplay} onChange={(e) => setMaxDisplay(Number(e.target.value))} className="admin-input w-full" placeholder="Max entries to show" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showOnHomepage} onChange={(e) => setShowOnHomepage(e.target.checked)} />
            Show on homepage
          </label>
          <button type="button" onClick={saveSettings} className="px-6 py-2 rounded-full bg-gold-500 text-ink font-medium">Save Settings</button>
        </div>

        {editEntry && (
          <div className="bg-white dark:bg-ink rounded-xl p-6 border space-y-4">
            <h2 className="font-semibold">Edit Fan Entries</h2>
            <p className="text-sm">{editEntry.profile?.display_name} · {editEntry.celebrity?.name}</p>
            <input type="number" value={newEntries} onChange={(e) => setNewEntries(Number(e.target.value))} className="admin-input w-full" />
            <div className="flex gap-2">
              <button type="button" onClick={saveEntry} className="px-6 py-2 rounded-full bg-gold-500 text-ink font-medium">Update Entries</button>
              <button type="button" onClick={() => setEditEntry(null)} className="px-6 py-2 rounded-full border">Cancel</button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-ink rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-neutral-500 border-b">
              <th className="p-4">Rank</th>
              <th className="p-4">Fan</th>
              <th className="p-4">Celebrity</th>
              <th className="p-4">Entries</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={entry.id} className="border-b">
                <td className="p-4 font-bold text-gold-600">#{i + 1}</td>
                <td className="p-4">{entry.profile?.display_name ?? entry.profile?.email ?? 'Fan'}</td>
                <td className="p-4">{entry.celebrity?.name ?? celebrities.find(c => c.id === entry.celebrity_id)?.name}</td>
                <td className="p-4 font-semibold">{entry.entries}</td>
                <td className="p-4">
                  <button type="button" onClick={() => { setEditEntry(entry); setNewEntries(entry.entries); }} className="text-gold-600 text-sm hover:underline">Edit</button>
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-neutral-500">No leaderboard entries yet. Approve orders to populate.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
