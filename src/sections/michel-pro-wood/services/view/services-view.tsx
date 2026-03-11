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

type Props = {
  services?: any[];
  serviceIncludes?: any[];
  serviceBenefits?: any[];
  plans?: any[];
  processSteps?: any[];
  testimonials?: any[];
  posts?: any[];
  pageContent?: any[];
};

export default function ServicesView({
  services = [],
  serviceIncludes = [],
  serviceBenefits = [],
  plans = [],
  processSteps = [],
  testimonials = [],
  posts = [],
  pageContent = []
}: Props) {
  const heroContent = pageContent?.find(item => item.section_key === 'hero');
  const servicesHeaderContent = pageContent?.find(item => item.section_key === 'services_header');
  const includeContent = pageContent?.find(item => item.section_key === 'include');
  const pricingHeaderContent = pageContent?.find(item => item.section_key === 'pricing_header');
  const benefitsContent = pageContent?.find(item => item.section_key === 'benefits');
  const howItWorkContent = pageContent?.find(item => item.section_key === 'how_it_work');

  return (
    <>
      <MarketingServicesHero pageContent={heroContent} />

      <HomeServices 
        services={services} 
        title={servicesHeaderContent?.title}
        subtitle={servicesHeaderContent?.subtitle}
        description={servicesHeaderContent?.content}
      />

      <MarketingServicesInclude 
        title={includeContent?.title}
        description={includeContent?.content}
        serviceIncludes={serviceIncludes} 
      />

      <HomePricing 
        plans={plans} 
        title={pricingHeaderContent?.title}
        subtitle={pricingHeaderContent?.subtitle}
        description={pricingHeaderContent?.content}
      />

      <MarketingServicesBenefits 
        title={benefitsContent?.title}
        description={benefitsContent?.content}
        serviceBenefits={serviceBenefits} 
      />

      <MarketingServicesHowItWork 
        title={howItWorkContent?.title}
        description={howItWorkContent?.content}
        processSteps={processSteps} 
      />

      <HomeTestimonials testimonials={testimonials} />

      <HomeLatestPosts posts={posts} />

      <HomeGetQuote />
    </>
  );
}
