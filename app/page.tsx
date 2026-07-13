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

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedCelebrities />
      <CharityImpact />
      <MerchandiseMarketplace />
      <CurrentCampaigns />
      <Testimonials />
      <TrustSection />
      <FAQ />
      <Newsletter />
    </>
  );
}
