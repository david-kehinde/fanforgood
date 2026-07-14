import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/supabase/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdmin();
  if (!profile) redirect('/auth/login?redirect=/admin');

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-ink-muted">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
