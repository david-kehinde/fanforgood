import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FeaturedCelebrities } from '@/components/home/FeaturedCelebrities';
import { CharityImpact } from '@/components/home/CharityImpact';
import { MerchandiseMarketplace } from '@/components/home/MerchandiseMarketplace';
import { CurrentCampaigns } from '@/components/home/CurrentCampaigns';
import { Testimonials } from '@/components/home/Testimonials';
import { TrustSection } from '@/components/home/TrustSection';
import { FAQ } from '@/components/home/FAQ';
import { Newsletter } from '@/components/layout/Newsletter';
import { LeaderboardSection } from '@/components/home/LeaderboardSection';
import {
  getCelebrities,
  getProducts,
  getCampaigns,
  getImpactStats,
  getLeaderboard,
  getLeaderboardSettings,
} from '@/lib/queries';

export default async function HomePage() {
  const [celebrities, products, campaigns, impactStats, leaderboard, leaderboardSettings] =
    await Promise.all([
      getCelebrities(),
      getProducts(),
      getCampaigns(),
      getImpactStats(),
      getLeaderboard(undefined, 10),
      getLeaderboardSettings(),
    ]);

  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedCelebrities celebrities={celebrities} />
      <CharityImpact stats={impactStats} />
      {leaderboardSettings.showOnHomepage && (
        <LeaderboardSection entries={leaderboard} settings={leaderboardSettings} />
      )}
      <MerchandiseMarketplace products={products} />
      <CurrentCampaigns campaigns={campaigns} />
      <Testimonials />
      <TrustSection />
      <FAQ />
      <Newsletter />
    </>
  );
}
