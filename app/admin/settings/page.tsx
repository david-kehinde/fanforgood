import { getImpactStats } from '@/lib/queries';
import { SettingsAdmin } from '@/components/admin/SettingsAdmin';

export default async function AdminSettingsPage() {
  const impactStats = await getImpactStats();
  return <SettingsAdmin impactStats={impactStats} />;
}
