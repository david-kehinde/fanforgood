import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { celebrities, getCelebrityBySlug, getProductsByCelebrity } from '@/lib/data';
import { CampaignContent } from '@/components/campaigns/CampaignContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return celebrities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const celebrity = getCelebrityBySlug(slug);
  if (!celebrity) return { title: 'Campaign Not Found' };
  return {
    title: `${celebrity.name} Charity Campaign`,
    description: celebrity.bio,
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { slug } = await params;
  const celebrity = getCelebrityBySlug(slug);

  if (!celebrity) notFound();

  const campaignProducts = getProductsByCelebrity(celebrity.id);

  return <CampaignContent celebrity={celebrity} products={campaignProducts} />;
}
