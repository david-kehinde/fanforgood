import type { Metadata } from 'next';
import { WinnersContent } from '@/components/winners/WinnersContent';

export const metadata: Metadata = {
  title: 'Winner Stories',
  description:
    'Meet past FanForGood winners and experience highlights from exclusive celebrity meet-and-greets.',
};

export default function WinnersPage() {
  return <WinnersContent />;
}
