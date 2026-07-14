import { createBrowserClient } from '@supabase/ssr';

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '';
}

function getSupabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    ''
  );
}

export function createClient() {
  return createBrowserClient(getSupabaseUrl(), getSupabaseKey());
}
