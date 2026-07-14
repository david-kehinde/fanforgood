import { getProducts, getCelebrities } from '@/lib/queries';
import { ProductsAdmin } from '@/components/admin/ProductsAdmin';

export default async function AdminProductsPage() {
  const [products, celebrities] = await Promise.all([
    getProducts(false),
    getCelebrities(false),
  ]);
  return <ProductsAdmin products={products} celebrities={celebrities} />;
}
