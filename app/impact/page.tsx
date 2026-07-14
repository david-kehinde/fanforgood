import { getImpactStats } from '@/lib/queries';
import { charityReports } from '@/lib/constants';
import { ImpactContent } from '@/components/impact/ImpactContent';

export default async function ImpactPage() {
  const impactStats = await getImpactStats();
  return <ImpactContent impactStats={impactStats} charityReports={charityReports} />;
}
