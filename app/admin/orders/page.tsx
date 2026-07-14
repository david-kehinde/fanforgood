import { getAllOrders } from '@/lib/queries';
import { OrdersAdmin } from '@/components/admin/OrdersAdmin';

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();
  return <OrdersAdmin orders={orders} />;
}
