import { getLeaderboard, getCelebrities, getLeaderboardSettings } from '@/lib/queries';
import { LeaderboardAdmin } from '@/components/admin/LeaderboardAdmin';

export default async function AdminLeaderboardPage() {
  const [entries, celebrities, settings] = await Promise.all([
    getLeaderboard(undefined, 100),
    getCelebrities(false),
    getLeaderboardSettings(),
  ]);
  return <LeaderboardAdmin entries={entries} celebrities={celebrities} settings={settings} />;
}
