import { CheckoutForm } from '@/components/dashboard/DashboardViews';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-white mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
