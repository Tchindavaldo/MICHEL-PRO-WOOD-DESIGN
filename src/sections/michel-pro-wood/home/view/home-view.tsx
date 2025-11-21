// _mock
import {
  _brands,
  _members,
  _blogMarketingPosts,
  _caseStudies,
  _testimonials,
  _pricingMarketing,
} from 'src/_mock';
//
import PricingMarketing from 'src/sections/pricing/marketing';
import TeamMarketing from 'src/sections/team/marketing';
import NewsletterMarketing from 'src/sections/newsletter/marketing';
import { BlogMarketingLatestPosts } from 'src/sections/blog/marketing';
import TestimonialMarketing from 'src/sections/testimonial/marketing';
import OurClientsMarketing from 'src/sections/our-clients/marketing';
import {
  MarketingLandingFaqs,
  MarketingLandingFreeSEO,
  MarketingLandingCaseStudies,
} from 'src/sections/_marketing/landing';
import HomeHero from '../home-hero';
import HomeVideoCarousel from '../home-video-carousel';
import HomeAbout from '../home-about';
import HomeServices from '../home-services';
import HomeProcess from '../home-process';

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

      <MarketingLandingCaseStudies caseStudies={_caseStudies.slice(-6)} />

      <TeamMarketing members={_members} />

      <PricingMarketing plans={_pricingMarketing} />

      <MarketingLandingFaqs />

      <TestimonialMarketing testimonials={_testimonials} />

      <BlogMarketingLatestPosts posts={_blogMarketingPosts.slice(0, 4)} />

      <MarketingLandingFreeSEO />

      <NewsletterMarketing />
    </>
  );
}
