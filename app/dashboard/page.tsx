import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/supabase/server';
import { getUserOrders, getUserEntries, getLeaderboard, getLeaderboardSettings } from '@/lib/queries';
import { DashboardContent } from '@/components/dashboard/DashboardViews';

export default async function DashboardPage() {
  const profile = await requireAuth();
  if (!profile) redirect('/auth/login?redirect=/dashboard');

  const [orders, entries, leaderboard, settings] = await Promise.all([
    getUserOrders(profile.id),
    getUserEntries(profile.id),
    getLeaderboard(undefined, 50),
    getLeaderboardSettings(),
  ]);

  return (
    <DashboardContent
      orders={orders}
      entries={entries}
      leaderboard={leaderboard}
      settings={settings}
    />
  );
}
