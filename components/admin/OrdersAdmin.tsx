'use client';

import { useState } from 'react';
import type { Order } from '@/lib/types';
import { approveOrder, rejectOrder } from '@/lib/actions';
import { formatCurrency } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending_payment: 'bg-yellow-100 text-yellow-800',
  payment_submitted: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-neutral-100 text-neutral-600',
};

export function OrdersAdmin({ orders }: { orders: Order[] }) {
  const [selected, setSelected] = useState<Order | null>(null);
  const [bonusEntries, setBonusEntries] = useState(0);
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleApprove = async () => {
    if (!selected) return;
    setLoading(true);
    const result = await approveOrder(selected.id, bonusEntries, adminNotes);
    setLoading(false);
    if (result.error) setMessage(result.error);
    else {
      setMessage(`Order approved! ${result.totalEntries} total entries awarded.`);
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleReject = async () => {
    if (!selected) return;
    setLoading(true);
    await rejectOrder(selected.id, adminNotes);
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">Orders</h1>
      <p className="text-neutral-500 mt-1 mb-8">
        Review manual payments and approve orders to award leaderboard entries.
      </p>

      {message && <p className="mb-4 p-3 rounded-lg bg-green-50 text-green-800 text-sm">{message}</p>}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-ink rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500 border-b">
                <th className="p-4">Order ID</th>
                <th className="p-4">Fan</th>
                <th className="p-4">Total</th>
                <th className="p-4">Entries</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => { setSelected(order); setBonusEntries(0); setAdminNotes(''); setMessage(''); }}
                  className={`border-b cursor-pointer hover:bg-neutral-50 dark:hover:bg-ink-muted ${selected?.id === order.id ? 'bg-gold-50 dark:bg-gold-500/10' : ''}`}
                >
                  <td className="p-4 font-mono text-gold-600">{order.order_number}</td>
                  <td className="p-4">{order.profile?.display_name ?? order.profile?.email}</td>
                  <td className="p-4">{formatCurrency(order.subtotal)}</td>
                  <td className="p-4">{order.total_entries}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${statusColors[order.status]}`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-ink rounded-xl border p-6">
          {selected ? (
            <>
              <h2 className="font-semibold text-lg mb-2">Order Details</h2>
              <p className="font-mono text-gold-600 text-lg mb-4">{selected.order_number}</p>
              <p className="text-sm text-neutral-500 mb-4">
                Fan: {selected.profile?.display_name ?? selected.profile?.email}
              </p>
              <ul className="space-y-2 mb-4">
                {selected.items?.map((item) => (
                  <li key={item.id} className="text-sm flex justify-between">
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>{formatCurrency(item.unit_price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="font-semibold mb-4">Subtotal: {formatCurrency(selected.subtotal)}</p>
              <p className="text-sm text-neutral-500 mb-4">
                Base entries: {selected.total_entries}
                {selected.bonus_entries > 0 && ` + ${selected.bonus_entries} bonus`}
              </p>

              {selected.status !== 'approved' && selected.status !== 'rejected' && (
                <>
                  <label className="block text-sm font-medium mb-1">Bonus entries (optional)</label>
                  <input
                    type="number"
                    min={0}
                    value={bonusEntries}
                    onChange={(e) => setBonusEntries(Number(e.target.value))}
                    className="admin-input w-full mb-4"
                    placeholder="Extra entries to boost leaderboard rank"
                  />
                  <label className="block text-sm font-medium mb-1">Admin notes</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={2}
                    className="admin-input w-full mb-4"
                  />
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={handleApprove} disabled={loading} className="w-full py-3 rounded-full bg-green-600 text-white font-medium disabled:opacity-50">
                      {loading ? 'Processing...' : '✓ Approve Payment & Award Entries'}
                    </button>
                    <button type="button" onClick={handleReject} disabled={loading} className="w-full py-3 rounded-full border border-red-300 text-red-600 font-medium">
                      Reject Order
                    </button>
                  </div>
                </>
              )}

              {selected.status === 'approved' && (
                <p className="text-green-600 text-sm">Approved on {selected.approved_at ? new Date(selected.approved_at).toLocaleString() : '—'}</p>
              )}
            </>
          ) : (
            <p className="text-neutral-500 text-sm">Select an order to review</p>
          )}
        </div>
      </div>
    </div>
  );
}
