# FanForGood Setup Guide

## 1. Supabase Database

1. Open your [Supabase SQL Editor](https://supabase.com/dashboard)
2. Paste and run the entire contents of `supabase/schema.sql`
3. Promote yourself to admin (replace with your email):

```sql
update public.profiles set role = 'admin' where email = 'your-email@example.com';
```

## 2. Environment Variables

Copy `.env.example` to `.env` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_EMAILS` — your admin email(s), comma-separated

Add the same variables in **Netlify → Site settings → Environment variables**.

## 3. Auth Setup in Supabase

In Supabase Dashboard → Authentication → URL Configuration:
- **Site URL:** your Netlify URL (e.g. `https://yoursite.netlify.app`)
- **Redirect URLs:** add `http://localhost:3000/**` and your production URL

## 4. Order Flow

1. Fan signs up → shops → checkout → receives **Order ID** (e.g. `FFG-20260714-A1B2C3`)
2. Fan pays manually (bank transfer) with Order ID in reference
3. Admin goes to `/admin/orders` → approves order → fan receives leaderboard entries
4. Admin can add **bonus entries** when approving to boost a fan's rank

## 5. Admin Panel (`/admin`)

| Section | Manage |
|---------|--------|
| Celebrities | Profiles, charities, images |
| Products | Merch, pricing, entry points |
| Campaigns | Goals, dates, progress |
| Orders | Approve/reject manual payments |
| Leaderboard | Edit entries, display settings |
| Settings | Homepage impact stats |

## 6. Fan Dashboard (`/dashboard`)

- View orders and status
- Track campaign entries
- See leaderboard rank

## 7. Deploy

```bash
git add .
git commit -m "Add admin panel and Supabase backend"
git push
```

Netlify auto-deploys from GitHub.
