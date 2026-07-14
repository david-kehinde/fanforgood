'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Star,
  ShoppingBag,
  Megaphone,
  Package,
  Trophy,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const links = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/celebrities', label: 'Celebrities', icon: Star },
  { href: '/admin/products', label: 'Products', icon: ShoppingBag },
  { href: '/admin/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/admin/orders', label: 'Orders', icon: Package },
  { href: '/admin/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut, profile } = useAuth();

  return (
    <aside className="w-64 bg-ink text-white min-h-screen flex flex-col border-r border-ink-soft">
      <div className="p-6 border-b border-ink-soft">
        <Link href="/admin" className="font-display text-xl font-bold">
          Fan<span className="text-gold-400">For</span>Good
        </Link>
        <p className="text-xs text-neutral-400 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === href
                ? 'bg-gold-500 text-ink'
                : 'text-neutral-300 hover:bg-ink-muted hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-ink-soft space-y-2">
        <p className="text-xs text-neutral-500 px-4 truncate">{profile?.email}</p>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-400 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View Site
        </Link>
        <button
          type="button"
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-400 hover:text-white w-full"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
