'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    const dest =
      result.role === 'admin' && redirect.startsWith('/admin')
        ? redirect
        : result.role === 'admin' && redirect === '/dashboard'
          ? '/admin'
          : redirect;
    router.push(dest);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-neutral-50 dark:bg-ink">
      <div className="w-full max-w-md bg-white dark:bg-ink-muted rounded-2xl p-8 border border-neutral-100 dark:border-ink-soft shadow-luxury">
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">
          Sign In
        </h1>
        <p className="text-neutral-500 mt-2 mb-8">
          Access your fan dashboard, orders, and leaderboard rank.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg">
              {error}
            </p>
          )}
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-ink-soft bg-white dark:bg-ink text-ink dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-ink text-white font-medium hover:bg-ink-soft disabled:opacity-50 dark:bg-gold-500 dark:text-ink"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          New fan?{' '}
          <Link href="/auth/signup" className="text-gold-600 font-medium hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
