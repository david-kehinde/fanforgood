import type { Metadata } from 'next';
import { ImpactContent } from '@/components/impact/ImpactContent';

export const metadata: Metadata = {
  title: 'Charity Impact',
  description:
    'Transparent fundraising reports, donation breakdowns, and beneficiary stories from FanForGood campaigns.',
};

export default function ImpactPage() {
  return <ImpactContent />;
}
