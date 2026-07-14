'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

function generateOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `FFG-${date}-${suffix}`;
}

export async function createOrder(
  items: {
    product_id: string;
    celebrity_id: string;
    product_name: string;
    celebrity_name: string;
    quantity: number;
    unit_price: number;
    entry_points: number;
  }[],
  fanNotes?: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: 'You must be signed in to checkout.' };

  const subtotal = items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const totalEntries = items.reduce(
    (s, i) => s + i.entry_points * i.quantity,
    0
  );
  const orderNumber = generateOrderNumber();

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: user.id,
      status: 'pending_payment',
      subtotal,
      total_entries: totalEntries,
      fan_notes: fanNotes ?? null,
    })
    .select()
    .single();

  if (orderError || !order) return { error: orderError?.message ?? 'Failed to create order' };

  const orderItems = items.map((item) => ({
    order_id: order.id,
    ...item,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) return { error: itemsError.message };

  revalidatePath('/dashboard');
  return { orderNumber, orderId: order.id };
}

export async function markPaymentSubmitted(orderId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('orders')
    .update({ status: 'payment_submitted' })
    .eq('id', orderId)
    .in('status', ['pending_payment']);

  if (error) return { error: error.message };
  revalidatePath('/dashboard');
  return { success: true };
}

export async function approveOrder(
  orderId: string,
  bonusEntries: number,
  adminNotes?: string
) {
  const supabase = await createClient();
  const profile = await supabase.from('profiles').select('role').eq('id', (await supabase.auth.getUser()).data.user?.id ?? '').single();
  if (profile.data?.role !== 'admin') return { error: 'Unauthorized' };

  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single();

  if (!order) return { error: 'Order not found' };
  if (order.status === 'approved') return { error: 'Order already approved' };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const totalEntries = order.total_entries + bonusEntries;

  const { error: updateError } = await supabase
    .from('orders')
    .update({
      status: 'approved',
      bonus_entries: bonusEntries,
      admin_notes: adminNotes ?? null,
      approved_at: new Date().toISOString(),
      approved_by: user?.id,
    })
    .eq('id', orderId);

  if (updateError) return { error: updateError.message };

  const items = order.order_items as {
    celebrity_id: string;
    entry_points: number;
    quantity: number;
    unit_price: number;
  }[];

  for (const item of items) {
    if (!item.celebrity_id) continue;
    const itemEntries = item.entry_points * item.quantity;
    const bonusShare =
      bonusEntries > 0
        ? Math.floor(bonusEntries / items.length)
        : 0;
    const entriesToAdd = itemEntries + bonusShare;

    const { data: existing } = await supabase
      .from('fan_entries')
      .select('id, entries')
      .eq('user_id', order.user_id)
      .eq('celebrity_id', item.celebrity_id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('fan_entries')
        .update({ entries: existing.entries + entriesToAdd })
        .eq('id', existing.id);
    } else {
      await supabase.from('fan_entries').insert({
        user_id: order.user_id,
        celebrity_id: item.celebrity_id,
        entries: entriesToAdd,
      });
    }

    const { data: campaign } = await supabase
      .from('campaigns')
      .select('id, raised, participants')
      .eq('celebrity_id', item.celebrity_id)
      .eq('is_active', true)
      .maybeSingle();

    if (campaign) {
      await supabase
        .from('campaigns')
        .update({
          raised: Number(campaign.raised) + item.unit_price * item.quantity,
          participants: campaign.participants + 1,
        })
        .eq('id', campaign.id);
    }
  }

  revalidatePath('/admin/orders');
  revalidatePath('/dashboard');
  revalidatePath('/');
  return { success: true, totalEntries };
}

export async function rejectOrder(orderId: string, adminNotes?: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('orders')
    .update({ status: 'rejected', admin_notes: adminNotes ?? null })
    .eq('id', orderId);

  if (error) return { error: error.message };
  revalidatePath('/admin/orders');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateFanEntries(
  userId: string,
  celebrityId: string,
  entries: number,
  isVisible: boolean
) {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from('fan_entries')
    .select('id')
    .eq('user_id', userId)
    .eq('celebrity_id', celebrityId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('fan_entries')
      .update({ entries, is_visible: isVisible })
      .eq('id', existing.id);
  } else {
    await supabase.from('fan_entries').insert({
      user_id: userId,
      celebrity_id: celebrityId,
      entries,
      is_visible: isVisible,
    });
  }

  revalidatePath('/admin/leaderboard');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateLeaderboardSettings(settings: {
  title: string;
  subtitle: string;
  maxDisplay: number;
  showOnHomepage: boolean;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from('site_settings').upsert({
    key: 'leaderboard',
    value: settings,
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };
  revalidatePath('/admin/leaderboard');
  revalidatePath('/dashboard');
  revalidatePath('/');
  return { success: true };
}

export async function updateImpactStats(
  stats: { label: string; value: number; prefix?: string; suffix?: string }[]
) {
  const supabase = await createClient();
  const { error } = await supabase.from('site_settings').upsert({
    key: 'impact_stats',
    value: stats,
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };
  revalidatePath('/admin/settings');
  revalidatePath('/impact');
  revalidatePath('/');
  return { success: true };
}

export async function uploadImage(formData: FormData, folder: string) {
  const supabase = await createClient();
  const file = formData.get('file') as File;
  if (!file) return { error: 'No file provided' };

  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) return { error: error.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from('media').getPublicUrl(path);

  return { url: publicUrl };
}

export async function saveCelebrity(formData: FormData, id?: string) {
  const supabase = await createClient();
  const payload = {
    slug: formData.get('slug') as string,
    name: formData.get('name') as string,
    profession: formData.get('profession') as string,
    charity: formData.get('charity') as string,
    charity_description: formData.get('charity_description') as string,
    image_url: formData.get('image_url') as string,
    hero_image_url: formData.get('hero_image_url') as string,
    bio: formData.get('bio') as string,
    meet_greet_details: formData.get('meet_greet_details') as string,
    is_active: formData.get('is_active') === 'true',
    sort_order: Number(formData.get('sort_order') ?? 0),
  };

  if (id) {
    const { error } = await supabase.from('celebrities').update(payload).eq('id', id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from('celebrities').insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath('/admin/celebrities');
  revalidatePath('/');
  return { success: true };
}

export async function deleteCelebrity(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('celebrities').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/celebrities');
  revalidatePath('/');
  return { success: true };
}

export async function saveProduct(formData: FormData, id?: string) {
  const supabase = await createClient();
  const payload = {
    celebrity_id: formData.get('celebrity_id') as string,
    slug: formData.get('slug') as string,
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    price: Number(formData.get('price')),
    image_url: formData.get('image_url') as string,
    description: formData.get('description') as string,
    entry_points: Number(formData.get('entry_points') ?? 5),
    is_limited: formData.get('is_limited') === 'true',
    is_active: formData.get('is_active') === 'true',
  };

  if (id) {
    const { error } = await supabase.from('products').update(payload).eq('id', id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from('products').insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/store');
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/products');
  revalidatePath('/store');
  return { success: true };
}

export async function saveCampaign(formData: FormData, id?: string) {
  const supabase = await createClient();
  const payload = {
    celebrity_id: formData.get('celebrity_id') as string,
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    goal: Number(formData.get('goal')),
    raised: Number(formData.get('raised') ?? 0),
    participants: Number(formData.get('participants') ?? 0),
    end_date: formData.get('end_date') as string,
    meet_greet_date: formData.get('meet_greet_date') as string,
    meet_greet_location: formData.get('meet_greet_location') as string,
    image_url: formData.get('image_url') as string,
    is_active: formData.get('is_active') === 'true',
  };

  if (id) {
    const { error } = await supabase.from('campaigns').update(payload).eq('id', id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from('campaigns').insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath('/admin/campaigns');
  revalidatePath('/');
  return { success: true };
}

export async function deleteCampaign(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('campaigns').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/campaigns');
  revalidatePath('/');
  return { success: true };
}

export async function promoteAdminIfAllowed(email: string, userId: string) {
  const adminEmails =
    process.env.ADMIN_EMAILS?.split(',').map((e) => e.trim().toLowerCase()) ?? [];
  if (!adminEmails.includes(email.toLowerCase())) return;

  const supabase = await createClient();
  await supabase.from('profiles').update({ role: 'admin' }).eq('id', userId);
}
