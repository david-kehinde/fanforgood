import { getCelebrities } from '@/lib/queries';
import { CelebritiesAdmin } from '@/components/admin/CelebritiesAdmin';

export default async function AdminCelebritiesPage() {
  const celebrities = await getCelebrities(false);
  return <CelebritiesAdmin celebrities={celebrities} />;
}
