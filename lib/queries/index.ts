import { createClient } from '@/lib/supabase/server';
import type {
  Campaign,
  Celebrity,
  FanEntry,
  ImpactStat,
  LeaderboardSettings,
  Order,
  Product,
} from '@/lib/types';
import { daysRemaining } from '@/lib/utils';
import {
  campaigns as fallbackCampaigns,
  celebrities as fallbackCelebrities,
  impactStats as fallbackImpactStats,
  products as fallbackProducts,
} from '@/lib/constants';

function mapCelebrity(row: Record<string, unknown>, campaign?: Campaign | null): Celebrity {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    profession: row.profession as string,
    charity: row.charity as string,
    charity_description: row.charity_description as string,
    image_url: row.image_url as string,
    hero_image_url: row.hero_image_url as string,
    bio: row.bio as string,
    meet_greet_details: row.meet_greet_details as string,
    is_active: row.is_active as boolean,
    sort_order: row.sort_order as number,
    campaign: campaign ?? null,
  };
}

function mapCampaign(row: Record<string, unknown>): Campaign {
  return {
    id: row.id as string,
    celebrity_id: row.celebrity_id as string,
    slug: row.slug as string,
    title: row.title as string,
    goal: Number(row.goal),
    raised: Number(row.raised),
    participants: row.participants as number,
    end_date: row.end_date as string,
    meet_greet_date: row.meet_greet_date as string,
    meet_greet_location: row.meet_greet_location as string,
    image_url: row.image_url as string,
    is_active: row.is_active as boolean,
    days_remaining: daysRemaining(row.end_date as string),
  };
}

function mapProduct(row: Record<string, unknown>, celebrity?: Celebrity): Product {
  const celeb = celebrity ?? (row.celebrities as Celebrity | undefined);
  return {
    id: row.id as string,
    celebrity_id: row.celebrity_id as string,
    slug: row.slug as string,
    name: row.name as string,
    category: row.category as Product['category'],
    price: Number(row.price),
    image_url: row.image_url as string,
    description: row.description as string,
    entry_points: row.entry_points as number,
    is_limited: row.is_limited as boolean,
    is_active: row.is_active as boolean,
    celebrity: celeb,
    celebrity_name: celeb?.name,
    charity: celeb?.charity,
  };
}

export async function getCelebrities(activeOnly = true): Promise<Celebrity[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('celebrities')
      .select('*, campaigns(*)')
      .order('sort_order');

    if (activeOnly) query = query.eq('is_active', true);

    const { data, error } = await query;
    if (error || !data?.length) throw error;

    const { data: productCounts } = await supabase
      .from('products')
      .select('celebrity_id')
      .eq('is_active', true);

    const counts: Record<string, number> = {};
    productCounts?.forEach((p) => {
      counts[p.celebrity_id] = (counts[p.celebrity_id] ?? 0) + 1;
    });

    return data.map((row) => {
      const campaigns = (row.campaigns as Record<string, unknown>[]) ?? [];
      const activeCampaign = campaigns.find((c) => c.is_active) ?? campaigns[0];
      const campaign = activeCampaign ? mapCampaign(activeCampaign) : null;
      const celeb = mapCelebrity(row, campaign);
      celeb.merchandise_count = counts[row.id as string] ?? 0;
      return celeb;
    });
  } catch {
    return fallbackCelebrities.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      profession: c.profession,
      charity: c.charity,
      charity_description: c.charityDescription,
      image_url: c.image,
      hero_image_url: c.heroImage,
      bio: c.bio,
      meet_greet_details: c.meetGreetDetails,
      is_active: true,
      sort_order: 0,
      merchandise_count: c.merchandiseCount,
      campaign: {
        id: `camp-${c.id}`,
        celebrity_id: c.id,
        slug: c.slug,
        title: `${c.name} Charity Campaign 2026`,
        goal: c.campaignGoal,
        raised: c.campaignRaised,
        participants: c.participants,
        end_date: new Date(Date.now() + c.daysRemaining * 86400000).toISOString(),
        meet_greet_date: 'June 15, 2026',
        meet_greet_location: 'Los Angeles, CA',
        image_url: c.heroImage,
        is_active: true,
        days_remaining: c.daysRemaining,
      },
    }));
  }
}

export async function getCelebrityBySlug(slug: string): Promise<Celebrity | null> {
  const all = await getCelebrities(false);
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(activeOnly = true): Promise<Product[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('products')
      .select('*, celebrities(*)')
      .order('created_at', { ascending: false });

    if (activeOnly) query = query.eq('is_active', true);

    const { data, error } = await query;
    if (error || !data?.length) throw error;

    return data.map((row) =>
      mapProduct(row, mapCelebrity(row.celebrities as Record<string, unknown>))
    );
  } catch {
    return fallbackProducts.map((p) => ({
      id: p.id,
      celebrity_id: p.celebrityId,
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      image_url: p.image,
      description: p.description,
      entry_points: p.limited ? 15 : 5,
      is_limited: !!p.limited,
      is_active: true,
      celebrity_name: p.celebrityName,
      charity: p.charity,
    }));
  }
}

export async function getProductsByCelebrity(celebrityId: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.celebrity_id === celebrityId);
}

export async function getCampaigns(activeOnly = true): Promise<Campaign[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('campaigns')
      .select('*, celebrities(*)')
      .order('created_at', { ascending: false });

    if (activeOnly) query = query.eq('is_active', true);

    const { data, error } = await query;
    if (error || !data?.length) throw error;

    return data.map((row) => {
      const campaign = mapCampaign(row);
      if (row.celebrities) {
        campaign.celebrity = mapCelebrity(row.celebrities as Record<string, unknown>);
      }
      return campaign;
    });
  } catch {
    return fallbackCampaigns.map((c) => ({
      id: c.id,
      celebrity_id: c.celebrityId,
      slug: c.slug,
      title: c.title,
      goal: c.goal,
      raised: c.raised,
      participants: c.participants,
      end_date: new Date(Date.now() + c.daysRemaining * 86400000).toISOString(),
      meet_greet_date: c.meetGreetDate,
      meet_greet_location: c.meetGreetLocation,
      image_url: c.image,
      is_active: true,
      days_remaining: c.daysRemaining,
    }));
  }
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'impact_stats')
      .single();

    if (data?.value) return data.value as ImpactStat[];
  } catch {
    /* fallback */
  }
  return fallbackImpactStats;
}

export async function getLeaderboardSettings(): Promise<LeaderboardSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'leaderboard')
      .single();

    if (data?.value) return data.value as LeaderboardSettings;
  } catch {
    /* fallback */
  }
  return {
    title: 'Campaign Leaderboard',
    subtitle: 'Top fans by meet-and-greet entries.',
    maxDisplay: 20,
    showOnHomepage: true,
  };
}

export async function getLeaderboard(
  celebrityId?: string,
  limit = 20
): Promise<FanEntry[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('fan_entries')
      .select('*, profiles(*), celebrities(*)')
      .eq('is_visible', true)
      .order('entries', { ascending: false })
      .limit(limit);

    if (celebrityId) query = query.eq('celebrity_id', celebrityId);

    const { data, error } = await query;
    if (error) throw error;

    return (data ?? []).map((row, index) => ({
      id: row.id,
      user_id: row.user_id,
      celebrity_id: row.celebrity_id,
      entries: row.entries,
      is_visible: row.is_visible,
      rank: index + 1,
      profile: row.profiles as FanEntry['profile'],
      celebrity: row.celebrities
        ? mapCelebrity(row.celebrities as Record<string, unknown>)
        : undefined,
    }));
  } catch {
    return [];
  }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return (data ?? []).map((row) => ({
    ...row,
    subtotal: Number(row.subtotal),
    items: row.order_items as Order['items'],
  }));
}

export async function getAllOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('orders')
    .select('*, order_items(*), profiles(*)')
    .order('created_at', { ascending: false });

  return (data ?? []).map((row) => ({
    ...row,
    subtotal: Number(row.subtotal),
    items: row.order_items as Order['items'],
    profile: row.profiles as Order['profile'],
  }));
}

export async function getUserEntries(userId: string): Promise<FanEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('fan_entries')
    .select('*, celebrities(*)')
    .eq('user_id', userId)
    .order('entries', { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id,
    user_id: row.user_id,
    celebrity_id: row.celebrity_id,
    entries: row.entries,
    is_visible: row.is_visible,
    celebrity: row.celebrities
      ? mapCelebrity(row.celebrities as Record<string, unknown>)
      : undefined,
  }));
}
