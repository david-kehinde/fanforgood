import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCelebrityBySlug, getProductsByCelebrity, getCelebrities } from '@/lib/queries';
import { CampaignContent } from '@/components/campaigns/CampaignContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const celebrities = await getCelebrities();
  return celebrities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const celebrity = await getCelebrityBySlug(slug);
  if (!celebrity) return { title: 'Campaign Not Found' };
  return {
    title: `${celebrity.name} Charity Campaign`,
    description: celebrity.bio,
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { slug } = await params;
  const celebrity = await getCelebrityBySlug(slug);

  if (!celebrity) notFound();

  const campaignProducts = await getProductsByCelebrity(celebrity.id);

  return <CampaignContent celebrity={celebrity} products={campaignProducts} />;
}
