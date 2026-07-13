import type { Metadata } from 'next';
import { StoreContent } from '@/components/store/StoreContent';

export const metadata: Metadata = {
  title: 'Merchandise Store',
  description:
    'Shop official celebrity merchandise. Every purchase supports verified charities and earns campaign entries.',
};

export default function StorePage() {
  return <StoreContent />;
}
