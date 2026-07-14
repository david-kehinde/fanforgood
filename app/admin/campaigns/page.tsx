import { getCampaigns, getCelebrities } from '@/lib/queries';
import { CampaignsAdmin } from '@/components/admin/CampaignsAdmin';

export default async function AdminCampaignsPage() {
  const [campaigns, celebrities] = await Promise.all([
    getCampaigns(false),
    getCelebrities(false),
  ]);
  return <CampaignsAdmin campaigns={campaigns} celebrities={celebrities} />;
}
