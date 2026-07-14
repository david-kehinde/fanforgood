export type UserRole = 'admin' | 'fan';

export type OrderStatus =
  | 'pending_payment'
  | 'payment_submitted'
  | 'approved'
  | 'rejected'
  | 'cancelled';

export type ProductCategory = 't-shirt' | 'hoodie' | 'signed' | 'limited';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Celebrity {
  id: string;
  slug: string;
  name: string;
  profession: string;
  charity: string;
  charity_description: string;
  image_url: string;
  hero_image_url: string;
  bio: string;
  meet_greet_details: string;
  is_active: boolean;
  sort_order: number;
  merchandise_count?: number;
  campaign?: Campaign | null;
}

export interface Campaign {
  id: string;
  celebrity_id: string;
  slug: string;
  title: string;
  goal: number;
  raised: number;
  participants: number;
  end_date: string;
  meet_greet_date: string;
  meet_greet_location: string;
  image_url: string;
  is_active: boolean;
  days_remaining?: number;
  celebrity?: Celebrity;
}

export interface Product {
  id: string;
  celebrity_id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  image_url: string;
  description: string;
  entry_points: number;
  is_limited: boolean;
  is_active: boolean;
  celebrity?: Celebrity;
  celebrity_name?: string;
  charity?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: OrderStatus;
  subtotal: number;
  total_entries: number;
  bonus_entries: number;
  fan_notes: string | null;
  admin_notes: string | null;
  approved_at: string | null;
  created_at: string;
  items?: OrderItem[];
  profile?: Profile;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  celebrity_id: string | null;
  product_name: string;
  celebrity_name: string;
  quantity: number;
  unit_price: number;
  entry_points: number;
}

export interface FanEntry {
  id: string;
  user_id: string;
  celebrity_id: string;
  entries: number;
  is_visible: boolean;
  profile?: Profile;
  celebrity?: Celebrity;
  rank?: number;
}

export interface LeaderboardSettings {
  title: string;
  subtitle: string;
  maxDisplay: number;
  showOnHomepage: boolean;
}

export interface ImpactStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  type: 'fan' | 'charity' | 'celebrity';
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface WinnerStory {
  id: string;
  slug: string;
  fanName: string;
  celebrityName: string;
  charity: string;
  quote: string;
  image: string;
  videoThumbnail: string;
  highlights: string[];
}
