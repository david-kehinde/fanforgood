export interface Celebrity {
  id: string;
  slug: string;
  name: string;
  profession: string;
  charity: string;
  charityDescription: string;
  image: string;
  heroImage: string;
  bio: string;
  merchandiseCount: number;
  campaignGoal: number;
  campaignRaised: number;
  participants: number;
  daysRemaining: number;
  meetGreetDetails: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 't-shirt' | 'hoodie' | 'signed' | 'limited';
  price: number;
  image: string;
  celebrityId: string;
  celebrityName: string;
  charity: string;
  description: string;
  limited?: boolean;
}

export interface Campaign {
  id: string;
  slug: string;
  celebrityId: string;
  title: string;
  goal: number;
  raised: number;
  participants: number;
  daysRemaining: number;
  meetGreetDate: string;
  meetGreetLocation: string;
  image: string;
}

export interface Testimonial {
  id: string;
  type: 'fan' | 'charity' | 'celebrity';
  name: string;
  role: string;
  quote: string;
  image: string;
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

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ImpactStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}
