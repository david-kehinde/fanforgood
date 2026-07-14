import { getAllOrders, getCelebrities, getProducts, getCampaigns } from '@/lib/queries';

export default async function AdminOverviewPage() {
  const [orders, celebrities, products, campaigns] = await Promise.all([
    getAllOrders(),
    getCelebrities(false),
    getProducts(false),
    getCampaigns(false),
  ]);

  const pendingOrders = orders.filter(
    (o) => o.status === 'pending_payment' || o.status === 'payment_submitted'
  );

  const stats = [
    { label: 'Total Orders', value: orders.length },
    { label: 'Pending Approval', value: pendingOrders.length },
    { label: 'Celebrities', value: celebrities.length },
    { label: 'Products', value: products.length },
    { label: 'Active Campaigns', value: campaigns.filter((c) => c.is_active).length },
  ];

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">
        Admin Overview
      </h1>
      <p className="text-neutral-500 mt-2">
        Manage celebrities, merchandise, campaigns, orders, and leaderboard entries.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-ink rounded-xl p-6 border border-neutral-100 dark:border-ink-soft"
          >
            <p className="text-3xl font-bold text-gold-600 dark:text-gold-400">
              {stat.value}
            </p>
            <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white dark:bg-ink rounded-xl border border-neutral-100 dark:border-ink-soft overflow-hidden">
        <div className="p-6 border-b border-neutral-100 dark:border-ink-soft">
          <h2 className="font-semibold text-ink dark:text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500 border-b border-neutral-100 dark:border-ink-soft">
                <th className="p-4">Order ID</th>
                <th className="p-4">Fan</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-neutral-50 dark:border-ink-soft"
                >
                  <td className="p-4 font-mono text-gold-600">{order.order_number}</td>
                  <td className="p-4">
                    {order.profile?.display_name ?? order.profile?.email ?? '—'}
                  </td>
                  <td className="p-4">${Number(order.subtotal).toFixed(0)}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-neutral-100 dark:bg-ink-muted capitalize">
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
