//
import HomeTestimonials from '../../home/home-testimonials';
import HomeLatestPosts from '../../home/home-latest-posts';
import HomeGetQuote from '../../home/home-get-quote';
import {
  MarketingServices,
  MarketingServicesHero,
  MarketingServicesInclude,
  MarketingServicesBenefits,
  MarketingServicesHowItWork,
} from 'src/sections/_marketing/services';
import HomeServices from '../../home/home-services';
import HomePricing from '../../home/home-pricing';

// ----------------------------------------------------------------------

export default function ServicesView() {
  return (
    <>
      <MarketingServicesHero />

      <HomeServices />

      <MarketingServicesInclude />

      <HomePricing />

      <MarketingServicesBenefits />

      <MarketingServicesHowItWork />

      <HomeTestimonials />

      <HomeLatestPosts />

      <HomeGetQuote />
    </>
  );
}
