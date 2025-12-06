// sections
import {
  MarketingServicesHero,
  MarketingServicesInclude,
  MarketingServicesBenefits,
  MarketingServicesHowItWork,
} from 'src/sections/_marketing/services';
//
import HomeTestimonials from '../../home/home-testimonials';
import HomeLatestPosts from '../../home/home-latest-posts';
import HomeGetQuote from '../../home/home-get-quote';
import HomeServices from '../../home/home-services';
import HomePricing from '../../home/home-pricing';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  services?: any[];
  serviceIncludes?: any[];
  serviceBenefits?: any[];
  plans?: any[];
  processSteps?: any[];
  testimonials?: any[];
  posts?: any[];
  pageContent?: any;
};

export default function ServicesView({
  services = [],
  serviceIncludes = [],
  serviceBenefits = [],
  plans = [],
  processSteps = [],
  testimonials = [],
  posts = [],
  pageContent
}: Props) {
  return (
    <>
      <MarketingServicesHero pageContent={pageContent} />

      <HomeServices services={services} />

      <MarketingServicesInclude serviceIncludes={serviceIncludes} />

      <HomePricing plans={plans} />

      <MarketingServicesBenefits serviceBenefits={serviceBenefits} />

      <MarketingServicesHowItWork processSteps={processSteps} />

      <HomeTestimonials testimonials={testimonials} />

      <HomeLatestPosts posts={posts} />

      <HomeGetQuote />
    </>
  );
}
