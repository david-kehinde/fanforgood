'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Copy, Check, Trophy, Package, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { createOrder } from '@/lib/actions';
import { formatCurrency } from '@/lib/utils';

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [copied, setCopied] = useState(false);

  if (orderNumber) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="bg-white dark:bg-ink-muted rounded-2xl p-8 border shadow-luxury">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">
            Order Created!
          </h1>
          <p className="text-neutral-500 mt-2 mb-6">
            Complete payment manually using the Order ID below. Once paid, an admin will approve your order and award your leaderboard entries.
          </p>
          <div className="bg-neutral-50 dark:bg-ink rounded-xl p-4 mb-4">
            <p className="text-xs text-neutral-500 mb-1">Your Order ID</p>
            <p className="font-mono text-xl font-bold text-gold-600">{orderNumber}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(orderNumber);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center gap-2 mx-auto px-6 py-2 rounded-full border border-gold-500 text-gold-600 font-medium"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Order ID'}
          </button>
          <p className="text-sm text-neutral-500 mt-6">
            Include this Order ID when making your bank transfer or payment.
          </p>
          <Link href="/dashboard" className="inline-block mt-6 px-8 py-3 rounded-full bg-ink text-white font-medium dark:bg-gold-500 dark:text-ink">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-500 mb-4">Your cart is empty</p>
        <Link href="/store" className="text-gold-600 font-medium hover:underline">Browse store</Link>
      </div>
    );
  }

  const totalEntries = items.reduce(
    (s, i) => s + i.product.entry_points * i.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }
    setLoading(true);
    setError('');
    const result = await createOrder(
      items.map(({ product, quantity }) => ({
        product_id: product.id,
        celebrity_id: product.celebrity_id,
        product_name: product.name,
        celebrity_name: product.celebrity_name ?? product.celebrity?.name ?? '',
        quantity,
        unit_price: product.price,
        entry_points: product.entry_points,
      })),
      notes
    );
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.orderNumber) {
      setOrderNumber(result.orderNumber);
      clearCart();
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div>
        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
        <ul className="space-y-4">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex justify-between text-sm border-b pb-4">
              <div>
                <p className="font-medium text-ink dark:text-white">{product.name}</p>
                <p className="text-neutral-500">Qty: {quantity} · {product.entry_points * quantity} entries</p>
              </div>
              <span>{formatCurrency(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-ink-muted rounded-2xl p-6 border h-fit">
        <h2 className="font-semibold text-lg mb-4">Checkout</h2>
        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between text-gold-600"><span>Entries on approval</span><span className="font-semibold">{totalEntries}</span></div>
        </div>

        <div className="bg-gold-50 dark:bg-gold-500/10 rounded-xl p-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p className="font-medium text-ink dark:text-white mb-1">Manual Payment</p>
          <p>After placing your order, you&apos;ll receive an Order ID. Complete payment via bank transfer and include your Order ID in the payment reference.</p>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes for admin (optional)"
          rows={2}
          className="admin-input w-full mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 rounded-full bg-ink text-white font-medium hover:bg-ink-soft disabled:opacity-50 dark:bg-gold-500 dark:text-ink"
        >
          {loading ? 'Creating order...' : 'Place Order & Get Order ID'}
        </button>
      </div>
    </div>
  );
}

export function DashboardContent({
  orders,
  entries,
  leaderboard,
  settings,
}: {
  orders: import('@/lib/types').Order[];
  entries: import('@/lib/types').FanEntry[];
  leaderboard: import('@/lib/types').FanEntry[];
  settings: import('@/lib/types').LeaderboardSettings;
}) {
  const { profile, signOut } = useAuth();
  const totalEntries = entries.reduce((s, e) => s + e.entries, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">
            Welcome, {profile?.display_name ?? 'Fan'}!
          </h1>
          <p className="text-neutral-500 mt-1">Track orders, entries, and your leaderboard rank</p>
        </div>
        <div className="flex gap-3">
          {profile?.role === 'admin' && (
            <Link href="/admin" className="px-4 py-2 rounded-full border text-sm font-medium">Admin Panel</Link>
          )}
          <button type="button" onClick={() => signOut()} className="px-4 py-2 rounded-full border text-sm">Sign Out</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white dark:bg-ink-muted rounded-xl p-6 border">
          <Trophy className="h-8 w-8 text-gold-500 mb-2" />
          <p className="text-3xl font-bold text-ink dark:text-white">{totalEntries}</p>
          <p className="text-sm text-neutral-500">Total Entries</p>
        </div>
        <div className="bg-white dark:bg-ink-muted rounded-xl p-6 border">
          <Package className="h-8 w-8 text-gold-500 mb-2" />
          <p className="text-3xl font-bold text-ink dark:text-white">{orders.length}</p>
          <p className="text-sm text-neutral-500">Orders Placed</p>
        </div>
        <div className="bg-white dark:bg-ink-muted rounded-xl p-6 border">
          <Star className="h-8 w-8 text-gold-500 mb-2" />
          <p className="text-3xl font-bold text-ink dark:text-white">{entries.length}</p>
          <p className="text-sm text-neutral-500">Campaigns Joined</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold text-xl mb-4">Your Orders</h2>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-ink-muted rounded-xl p-4 border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-gold-600 font-medium">{order.order_number}</p>
                    <p className="text-sm text-neutral-500 mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-ink capitalize">{order.status.replace(/_/g, ' ')}</span>
                </div>
                <p className="text-sm mt-2">{formatCurrency(order.subtotal)} · {order.total_entries + order.bonus_entries} entries</p>
              </div>
            ))}
            {orders.length === 0 && <p className="text-neutral-500 text-sm">No orders yet. <Link href="/store" className="text-gold-600">Shop now</Link></p>}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-xl mb-1">{settings.title}</h2>
          <p className="text-sm text-neutral-500 mb-4">{settings.subtitle}</p>
          <div className="bg-white dark:bg-ink-muted rounded-xl border overflow-hidden">
            {leaderboard.slice(0, settings.maxDisplay).map((entry, i) => {
              const isMe = entry.user_id === profile?.id;
              return (
                <div key={entry.id} className={`flex items-center gap-4 p-4 border-b ${isMe ? 'bg-gold-50 dark:bg-gold-500/10' : ''}`}>
                  <span className="font-bold text-gold-600 w-8">#{entry.rank ?? i + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{entry.profile?.display_name ?? 'Fan'}{isMe && ' (You)'}</p>
                    <p className="text-xs text-neutral-500">{entry.celebrity?.name}</p>
                  </div>
                  <span className="font-semibold">{entry.entries}</span>
                </div>
              );
            })}
            {leaderboard.length === 0 && <p className="p-6 text-neutral-500 text-sm text-center">Leaderboard empty — be the first!</p>}
          </div>
        </div>
      </div>

      {entries.length > 0 && (
        <div className="mt-10">
          <h2 className="font-semibold text-xl mb-4">Your Campaign Entries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {entries.map((e) => (
              <div key={e.id} className="bg-white dark:bg-ink-muted rounded-xl p-4 border text-center">
                <p className="font-semibold">{e.celebrity?.name}</p>
                <p className="text-2xl font-bold text-gold-600 mt-2">{e.entries}</p>
                <p className="text-xs text-neutral-500">entries</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
