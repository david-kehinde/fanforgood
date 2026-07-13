import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24">
      <h1 className="font-display text-6xl font-bold text-ink dark:text-white">404</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-lg">
        Page not found
      </p>
      <Link
        href="/"
        className="mt-8 px-8 py-3 rounded-full bg-ink text-white font-medium hover:bg-ink-soft dark:bg-gold-500 dark:text-ink"
      >
        Return Home
      </Link>
    </div>
  );
}
