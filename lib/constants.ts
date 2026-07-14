import type { FAQ, ImpactStat, Testimonial, WinnerStory } from './types';

/** @deprecated Fallback seed data — use Supabase in production */
export interface LegacyCelebrity {
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

export interface LegacyProduct {
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

export interface LegacyCampaign {
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

export const siteConfig = {
  name: 'FanForGood',
  tagline: 'Meet Your Favorite Celebrities While Changing Lives',
  description:
    'Support meaningful charitable causes through official celebrity merchandise. Every purchase funds charity and increases your chance to meet your favorite stars.',
};

export const impactStats: ImpactStat[] = [
  { label: 'Total Funds Raised', value: 12450000, prefix: '$' },
  { label: 'Charities Supported', value: 847 },
  { label: 'Fans Participating', value: 156200, suffix: '+' },
  { label: 'Experiences Completed', value: 312 },
];

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Choose Your Favorite Celebrity',
    description:
      'Browse verified celebrity campaigns and find causes that resonate with you.',
    icon: 'star',
  },
  {
    step: 2,
    title: 'Purchase Official Merchandise',
    description:
      'Shop authentic, officially licensed merchandise. Every item is verified.',
    icon: 'shopping',
  },
  {
    step: 3,
    title: 'Support Verified Charities',
    description:
      'A portion of every purchase goes directly to vetted charitable organizations.',
    icon: 'heart',
  },
  {
    step: 4,
    title: 'Get a Chance to Meet the Celebrity',
    description:
      'Earn entries for exclusive meet-and-greet experiences with every qualifying purchase.',
    icon: 'ticket',
  },
];

export const celebrities: LegacyCelebrity[] = [
  {
    id: '1',
    slug: 'maya-chen',
    name: 'Maya Chen',
    profession: 'Award-Winning Actress',
    charity: 'Children\'s Education Foundation',
    charityDescription:
      'Providing scholarships and learning resources to underserved youth worldwide.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop',
    bio: 'Maya Chen has dedicated her platform to education equity, partnering with FanForGood to fund schools in 12 countries.',
    merchandiseCount: 24,
    campaignGoal: 500000,
    campaignRaised: 387500,
    participants: 8420,
    daysRemaining: 18,
    meetGreetDetails:
      'Private 30-minute meet-and-greet in Los Angeles, including signed memorabilia and photo opportunity.',
  },
  {
    id: '2',
    slug: 'marcus-rivers',
    name: 'Marcus Rivers',
    profession: 'Platinum Recording Artist',
    charity: 'Music Therapy Alliance',
    charityDescription:
      'Bringing music therapy programs to hospitals and rehabilitation centers.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=800&fit=crop',
    bio: 'Marcus Rivers combines his passion for music with philanthropy, funding therapy sessions for over 5,000 patients annually.',
    merchandiseCount: 18,
    campaignGoal: 750000,
    campaignRaised: 612000,
    participants: 12100,
    daysRemaining: 24,
    meetGreetDetails:
      'VIP studio session and acoustic performance for winners, plus backstage access at select tour dates.',
  },
  {
    id: '3',
    slug: 'elena-voss',
    name: 'Elena Voss',
    profession: 'Olympic Gold Medalist',
    charity: 'Youth Sports Initiative',
    charityDescription:
      'Building community sports facilities and providing equipment to young athletes.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop',
    bio: 'Elena Voss champions youth athletics, having funded 47 community sports centers through her FanForGood campaigns.',
    merchandiseCount: 15,
    campaignGoal: 400000,
    campaignRaised: 298000,
    participants: 6750,
    daysRemaining: 12,
    meetGreetDetails:
      'Training clinic with Elena plus signed Olympic gear and professional photo session.',
  },
  {
    id: '4',
    slug: 'james-okonkwo',
    name: 'James Okonkwo',
    profession: 'Film Director & Producer',
    charity: 'Global Clean Water Project',
    charityDescription:
      'Installing sustainable water systems in communities without access to clean drinking water.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop',
    bio: 'James Okonkwo uses storytelling to drive change, funding water projects that serve over 200,000 people.',
    merchandiseCount: 12,
    campaignGoal: 600000,
    campaignRaised: 445000,
    participants: 9200,
    daysRemaining: 31,
    meetGreetDetails:
      'Exclusive film screening with Q&A and dinner with James at a private venue.',
  },
];

export const products: LegacyProduct[] = [
  {
    id: 'p1',
    slug: 'maya-signature-tee',
    name: 'Maya Chen Signature Tee',
    category: 't-shirt',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
    celebrityId: '1',
    celebrityName: 'Maya Chen',
    charity: 'Children\'s Education Foundation',
    description: 'Premium cotton tee with embroidered signature. Includes 5 campaign entries.',
  },
  {
    id: 'p2',
    slug: 'marcus-tour-hoodie',
    name: 'Marcus Rivers Tour Hoodie',
    category: 'hoodie',
    price: 85,
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop',
    celebrityId: '2',
    celebrityName: 'Marcus Rivers',
    charity: 'Music Therapy Alliance',
    description: 'Limited tour edition hoodie. Includes 10 campaign entries.',
    limited: true,
  },
  {
    id: 'p3',
    slug: 'elena-signed-jersey',
    name: 'Elena Voss Signed Jersey',
    category: 'signed',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50?w=600&h=600&fit=crop',
    celebrityId: '3',
    celebrityName: 'Elena Voss',
    charity: 'Youth Sports Initiative',
    description: 'Authentic Olympic jersey hand-signed by Elena. Includes 25 entries.',
    limited: true,
  },
  {
    id: 'p4',
    slug: 'james-directors-cut',
    name: 'Director\'s Cut Box Set',
    category: 'limited',
    price: 149,
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=600&fit=crop',
    celebrityId: '4',
    celebrityName: 'James Okonkwo',
    charity: 'Global Clean Water Project',
    description: 'Collector\'s edition with behind-the-scenes content. 15 entries included.',
    limited: true,
  },
  {
    id: 'p5',
    slug: 'maya-charity-hoodie',
    name: 'Maya Chen Charity Hoodie',
    category: 'hoodie',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1620799140408-edc46dcb4f76?w=600&h=600&fit=crop',
    celebrityId: '1',
    celebrityName: 'Maya Chen',
    charity: 'Children\'s Education Foundation',
    description: 'Cozy fleece hoodie supporting education initiatives. 8 entries.',
  },
  {
    id: 'p6',
    slug: 'marcus-vinyl-bundle',
    name: 'Signed Vinyl Bundle',
    category: 'signed',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1619983081563-430f63602796?w=600&h=600&fit=crop',
    celebrityId: '2',
    celebrityName: 'Marcus Rivers',
    charity: 'Music Therapy Alliance',
    description: 'Limited pressing with hand-signed sleeve and digital extras.',
    limited: true,
  },
  {
    id: 'p7',
    slug: 'elena-training-tee',
    name: 'Train Like Elena Tee',
    category: 't-shirt',
    price: 42,
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
    celebrityId: '3',
    celebrityName: 'Elena Voss',
    charity: 'Youth Sports Initiative',
    description: 'Performance fabric tee with motivational design. 5 entries.',
  },
  {
    id: 'p8',
    slug: 'james-film-poster',
    name: 'Limited Edition Film Poster',
    category: 'limited',
    price: 89,
    image:
      'https://images.unsplash.com/photo-1598899134739-24c46f58a8a0?w=600&h=600&fit=crop',
    celebrityId: '4',
    celebrityName: 'James Okonkwo',
    charity: 'Global Clean Water Project',
    description: 'Archival-quality poster from James\'s latest production. 12 entries.',
    limited: true,
  },
];

export const campaigns: LegacyCampaign[] = celebrities.map((c) => ({
  id: `camp-${c.id}`,
  slug: c.slug,
  celebrityId: c.id,
  title: `${c.name} Charity Campaign 2026`,
  goal: c.campaignGoal,
  raised: c.campaignRaised,
  participants: c.participants,
  daysRemaining: c.daysRemaining,
  meetGreetDate: 'June 15, 2026',
  meetGreetLocation: 'Los Angeles, CA',
  image: c.heroImage,
}));

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    type: 'fan',
    name: 'Sarah Mitchell',
    role: 'Fan & Campaign Winner',
    quote:
      'I never imagined I\'d meet Maya Chen while supporting education. FanForGood made it seamless, transparent, and genuinely life-changing.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
  {
    id: 't2',
    type: 'charity',
    name: 'Dr. Amara Osei',
    role: 'Director, Children\'s Education Foundation',
    quote:
      'FanForGood\'s platform has transformed how we receive funding. Every dollar is tracked, verified, and makes a measurable impact.',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
  },
  {
    id: 't3',
    type: 'celebrity',
    name: 'Marcus Rivers',
    role: 'Platinum Recording Artist',
    quote:
      'Partnering with FanForGood lets me connect with fans authentically while funding music therapy programs that matter deeply to me.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    id: 't4',
    type: 'fan',
    name: 'David Park',
    role: 'Fan & Supporter',
    quote:
      'The transparency dashboard shows exactly where my money goes. I shop with confidence knowing my purchase creates real change.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  },
];

export const winnerStories: WinnerStory[] = [
  {
    id: 'w1',
    slug: 'sarah-meets-maya',
    fanName: 'Sarah Mitchell',
    celebrityName: 'Maya Chen',
    charity: 'Children\'s Education Foundation',
    quote:
      'Meeting Maya was a dream. Knowing my hoodie purchase helped fund scholarships made the moment even more special.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
    videoThumbnail:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=450&fit=crop',
    highlights: ['30-minute private meet-and-greet', 'Signed memorabilia', 'Charity gala attendance'],
  },
  {
    id: 'w2',
    slug: 'michael-studio-session',
    fanName: 'Michael Torres',
    celebrityName: 'Marcus Rivers',
    charity: 'Music Therapy Alliance',
    quote:
      'Marcus played my favorite song acoustically in the studio. An experience I\'ll never forget.',
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
    videoThumbnail:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
    highlights: ['VIP studio session', 'Acoustic performance', 'Backstage tour access'],
  },
  {
    id: 'w3',
    slug: 'jessica-training-clinic',
    fanName: 'Jessica Wu',
    celebrityName: 'Elena Voss',
    charity: 'Youth Sports Initiative',
    quote:
      'Elena coached us through her actual training routine. I left inspired to give back to my community.',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    videoThumbnail:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=450&fit=crop',
    highlights: ['Olympic training clinic', 'Signed gear', 'Professional photo session'],
  },
];

export const faqs: FAQ[] = [
  {
    id: 'f1',
    category: 'entries',
    question: 'How do I earn chances to meet a celebrity?',
    answer:
      'Every qualifying merchandise purchase earns campaign entries. Entry amounts vary by product—check each product page for details. More purchases mean more entries, increasing your odds while supporting charity.',
  },
  {
    id: 'f2',
    category: 'charity',
    question: 'How much of my purchase goes to charity?',
    answer:
      'A minimum of 25% of every purchase goes directly to the featured charity. Premium and limited items may contribute up to 40%. View real-time breakdowns on our Charity Impact page.',
  },
  {
    id: 'f3',
    category: 'winners',
    question: 'How are winners selected?',
    answer:
      'Winners are selected through a certified random drawing conducted by an independent third-party auditor. All entries are logged transparently, and results are published on our platform.',
  },
  {
    id: 'f4',
    category: 'shipping',
    question: 'When will my merchandise ship?',
    answer:
      'Official merchandise ships within 5–7 business days. Limited edition items may require 10–14 days. You\'ll receive tracking information via email once your order ships.',
  },
  {
    id: 'f5',
    category: 'experiences',
    question: 'What does a meet-and-greet experience include?',
    answer:
      'Experiences vary by celebrity but typically include a private meeting, photo opportunity, signed memorabilia, and sometimes event access. Full details are listed on each campaign page.',
  },
  {
    id: 'f6',
    category: 'entries',
    question: 'Can I support multiple celebrities?',
    answer:
      'Yes! Each campaign operates independently. Purchases earn entries only for the associated celebrity campaign, so you can participate in as many as you like.',
  },
];

export const trustBadges = [
  'Verified Charity Partner',
  'PCI DSS Compliant',
  'Independent Audit Certified',
  '100% Donation Tracking',
];

export const charityReports = [
  { quarter: 'Q1 2026', raised: 3200000, distributed: 2980000, overhead: 6.9 },
  { quarter: 'Q4 2025', raised: 2850000, distributed: 2710000, overhead: 4.9 },
  { quarter: 'Q3 2025', raised: 3100000, distributed: 2950000, overhead: 4.8 },
];

export function getCelebrityBySlug(slug: string) {
  return celebrities.find((c) => c.slug === slug);
}

export function getProductsByCelebrity(celebrityId: string) {
  return products.filter((p) => p.celebrityId === celebrityId);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}
