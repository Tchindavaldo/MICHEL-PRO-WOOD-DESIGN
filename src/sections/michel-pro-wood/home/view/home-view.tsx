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
  MarketingLandingHero,
  MarketingLandingAbout,
  MarketingLandingFreeSEO,
  MarketingLandingProcess,
  MarketingLandingServices,
  MarketingLandingCaseStudies,
} from 'src/sections/_marketing/landing';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <MarketingLandingHero />

      <OurClientsMarketing brands={_brands} />

      <MarketingLandingAbout />

      <MarketingLandingServices />

      <MarketingLandingProcess />

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
