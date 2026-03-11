import { Container, Typography } from '@mui/material';
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

type Props = {
  services?: any[];
  testimonials?: any[];
  partners?: any[];
  realizations?: any[];
  products?: any[];
  posts?: any[];
  jobs?: any[];
  plans?: any[];
  slides?: any[];
  processSteps?: any[];
  videoSlides?: any[];
  servicesHeader?: any;
  pricingHeader?: any;
  processHeader?: any;
};

export default function HomeView({ 
  services = [], 
  testimonials = [], 
  partners = [], 
  realizations = [], 
  products = [],
  posts = [],
  jobs = [],
  plans = [],
  slides = [],
  processSteps = [],
  videoSlides = [],
  servicesHeader,
  pricingHeader,
  processHeader,
}: Props) {
  // Use provided partners or fallback to default brands
  const displayBrands = partners.length > 0 ? partners : _brands;

  return (
    <>
      <HomeHero slides={slides} />
      
      <Container sx={{ mt: 10, mb: 5, textAlign: 'center' }}>
        <Typography variant="h2">Nos Partenaires</Typography>
      </Container>

      <OurClientsMarketing brands={displayBrands} />

      <HomeVideoCarousel videoSlides={videoSlides} />

      <HomeAbout />

      <HomeServices 
        services={services} 
        title={servicesHeader?.title}
        subtitle={servicesHeader?.subtitle}
        description={servicesHeader?.content}
      />

      <HomeProcess 
        processSteps={processSteps} 
        title={processHeader?.title}
        subtitle={processHeader?.subtitle}
        description={processHeader?.content}
      />

      <HomeRealizations realizations={realizations} />

      <HomeShop products={products} />

      <HomePricing 
        plans={plans} 
        title={pricingHeader?.title}
        subtitle={pricingHeader?.subtitle}
        description={pricingHeader?.content}
      />

      <HomeJobs jobs={jobs} />

      <HomeTestimonials testimonials={testimonials} />

      <HomeLatestPosts posts={posts} />

      <HomeGetQuote />
    </>
  );
}
