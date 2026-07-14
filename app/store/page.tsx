import { getProducts, getCelebrities } from '@/lib/queries';
import { StoreContent } from '@/components/store/StoreContent';

export default async function StorePage() {
  const [products, celebrities] = await Promise.all([
    getProducts(),
    getCelebrities(),
  ]);

  return <StoreContent products={products} celebrities={celebrities} />;
}
