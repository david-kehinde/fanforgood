'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signUp(email, password, fullName);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-neutral-50 dark:bg-ink">
      <div className="w-full max-w-md bg-white dark:bg-ink-muted rounded-2xl p-8 border border-neutral-100 dark:border-ink-soft shadow-luxury">
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">
          Create Account
        </h1>
        <p className="text-neutral-500 mt-2 mb-8">
          Join FanForGood to track orders, earn entries, and climb the leaderboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg">
              {error}
            </p>
          )}
          <input
            type="text"
            required
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-ink-soft bg-white dark:bg-ink text-ink dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-ink-soft bg-white dark:bg-ink text-ink dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-ink-soft bg-white dark:bg-ink text-ink dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-ink text-white font-medium hover:bg-ink-soft disabled:opacity-50 dark:bg-gold-500 dark:text-ink"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-gold-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
