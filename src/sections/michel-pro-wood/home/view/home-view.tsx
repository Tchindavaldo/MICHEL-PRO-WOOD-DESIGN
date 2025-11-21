// _mock
import {
  _brands,
  _caseStudies,
  _pricingMarketing,
} from 'src/_mock';
//
import PricingMarketing from 'src/sections/pricing/marketing';
import OurClientsMarketing from 'src/sections/our-clients/marketing';
import HomeHero from '../home-hero';
import HomeVideoCarousel from '../home-video-carousel';
import HomeAbout from '../home-about';
import HomeServices from '../home-services';
import HomeProcess from '../home-process';
import HomeRealizations from '../home-realizations';
import HomeShop from '../home-shop';
import HomePricing from '../home-pricing';
import HomeJobs from '../home-jobs';
import HomeTestimonials from '../home-testimonials';
import HomeLatestPosts from '../home-latest-posts';
import HomeGetQuote from '../home-get-quote';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <HomeHero />

      <OurClientsMarketing brands={_brands} />

      <HomeVideoCarousel />

      <HomeAbout />

      <HomeServices />

      <HomeProcess />

      <HomeRealizations />

      <HomeShop />

      <HomePricing />

      <HomeJobs />

      <HomeTestimonials />

      <HomeLatestPosts />

      <HomeGetQuote />
    </>
  );
}
