-- FanForGood Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Extensions
create extension if not exists "pgcrypto";

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  display_name text,
  avatar_url text,
  role text not null default 'fan' check (role in ('admin', 'fan')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Celebrities
create table if not exists public.celebrities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  profession text not null,
  charity text not null,
  charity_description text not null default '',
  image_url text not null,
  hero_image_url text not null,
  bio text not null default '',
  meet_greet_details text not null default '',
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Campaigns
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  celebrity_id uuid not null references public.celebrities(id) on delete cascade,
  slug text unique not null,
  title text not null,
  goal numeric not null default 0,
  raised numeric not null default 0,
  participants int not null default 0,
  end_date timestamptz not null,
  meet_greet_date text not null default '',
  meet_greet_location text not null default '',
  image_url text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  celebrity_id uuid not null references public.celebrities(id) on delete cascade,
  slug text unique not null,
  name text not null,
  category text not null check (category in ('t-shirt', 'hoodie', 'signed', 'limited')),
  price numeric not null,
  image_url text not null,
  description text not null default '',
  entry_points int not null default 5,
  is_limited boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'payment_submitted', 'approved', 'rejected', 'cancelled')),
  subtotal numeric not null default 0,
  total_entries int not null default 0,
  bonus_entries int not null default 0,
  fan_notes text,
  admin_notes text,
  approved_at timestamptz,
  approved_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  celebrity_id uuid references public.celebrities(id) on delete set null,
  product_name text not null,
  celebrity_name text not null,
  quantity int not null default 1,
  unit_price numeric not null,
  entry_points int not null default 0,
  created_at timestamptz not null default now()
);

-- Fan campaign entries (leaderboard)
create table if not exists public.fan_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  celebrity_id uuid not null references public.celebrities(id) on delete cascade,
  entries int not null default 0,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (user_id, celebrity_id)
);

-- Site settings (impact stats, leaderboard copy)
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger celebrities_updated before update on public.celebrities
  for each row execute function public.set_updated_at();
create trigger campaigns_updated before update on public.campaigns
  for each row execute function public.set_updated_at();
create trigger products_updated before update on public.products
  for each row execute function public.set_updated_at();
create trigger orders_updated before update on public.orders
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Order number generator
create or replace function public.generate_order_number()
returns text as $$
declare
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result text := 'FFG-';
  i int;
begin
  result := result || to_char(now(), 'YYYYMMDD') || '-';
  for i in 1..6 loop
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  end loop;
  return result;
end;
$$ language plpgsql;

-- RLS
alter table public.profiles enable row level security;
alter table public.celebrities enable row level security;
alter table public.campaigns enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.fan_entries enable row level security;
alter table public.site_settings enable row level security;

-- Helper: is admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Profiles policies
create policy "Public profiles readable for leaderboard"
  on public.profiles for select using (true);
create policy "Users update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Admins manage profiles"
  on public.profiles for all using (public.is_admin());

-- Celebrities policies
create policy "Active celebrities public read"
  on public.celebrities for select using (is_active = true or public.is_admin());
create policy "Admins manage celebrities"
  on public.celebrities for all using (public.is_admin());

-- Campaigns policies
create policy "Active campaigns public read"
  on public.campaigns for select using (is_active = true or public.is_admin());
create policy "Admins manage campaigns"
  on public.campaigns for all using (public.is_admin());

-- Products policies
create policy "Active products public read"
  on public.products for select using (is_active = true or public.is_admin());
create policy "Admins manage products"
  on public.products for all using (public.is_admin());

-- Orders policies
create policy "Fans read own orders"
  on public.orders for select using (auth.uid() = user_id or public.is_admin());
create policy "Fans create own orders"
  on public.orders for insert with check (auth.uid() = user_id);
create policy "Fans update own pending orders"
  on public.orders for update using (
    auth.uid() = user_id and status in ('pending_payment', 'payment_submitted')
  );
create policy "Admins manage orders"
  on public.orders for all using (public.is_admin());

-- Order items policies
create policy "Order items via order access"
  on public.order_items for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())
    )
  );
create policy "Fans insert order items"
  on public.order_items for insert with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );
create policy "Admins manage order items"
  on public.order_items for all using (public.is_admin());

-- Fan entries policies
create policy "Visible entries public read"
  on public.fan_entries for select using (is_visible = true or auth.uid() = user_id or public.is_admin());
create policy "Admins manage fan entries"
  on public.fan_entries for all using (public.is_admin());

-- Site settings policies
create policy "Public read site settings"
  on public.site_settings for select using (true);
create policy "Admins manage site settings"
  on public.site_settings for all using (public.is_admin());

-- Storage bucket for images
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read media"
  on storage.objects for select using (bucket_id = 'media');
create policy "Admins upload media"
  on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "Admins update media"
  on storage.objects for update using (bucket_id = 'media' and public.is_admin());
create policy "Admins delete media"
  on storage.objects for delete using (bucket_id = 'media' and public.is_admin());

-- Default site settings
insert into public.site_settings (key, value) values
  ('impact_stats', '[
    {"label":"Total Funds Raised","value":12450000,"prefix":"$"},
    {"label":"Charities Supported","value":847},
    {"label":"Fans Participating","value":156200,"suffix":"+"},
    {"label":"Experiences Completed","value":312}
  ]'::jsonb),
  ('leaderboard', '{
    "title": "Campaign Leaderboard",
    "subtitle": "Top fans by meet-and-greet entries. Complete your purchase and get approved to climb the ranks!",
    "maxDisplay": 20,
    "showOnHomepage": true
  }'::jsonb)
on conflict (key) do nothing;

-- Sample seed data (optional — remove if you prefer empty DB)
insert into public.celebrities (slug, name, profession, charity, charity_description, image_url, hero_image_url, bio, meet_greet_details, sort_order) values
  ('maya-chen', 'Maya Chen', 'Award-Winning Actress', 'Children''s Education Foundation', 'Providing scholarships and learning resources to underserved youth worldwide.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop', 'Maya Chen has dedicated her platform to education equity.', 'Private 30-minute meet-and-greet in Los Angeles.', 1),
  ('marcus-rivers', 'Marcus Rivers', 'Platinum Recording Artist', 'Music Therapy Alliance', 'Bringing music therapy programs to hospitals.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=800&fit=crop', 'Marcus Rivers combines music with philanthropy.', 'VIP studio session and acoustic performance.', 2),
  ('elena-voss', 'Elena Voss', 'Olympic Gold Medalist', 'Youth Sports Initiative', 'Building community sports facilities.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop', 'Elena Voss champions youth athletics.', 'Training clinic plus signed Olympic gear.', 3),
  ('james-okonkwo', 'James Okonkwo', 'Film Director & Producer', 'Global Clean Water Project', 'Installing sustainable water systems.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop', 'James Okonkwo uses storytelling to drive change.', 'Exclusive film screening with Q&A.', 4)
on conflict (slug) do nothing;

-- Promote your account to admin (replace with your email):
-- update public.profiles set role = 'admin' where email = 'your-email@example.com';
