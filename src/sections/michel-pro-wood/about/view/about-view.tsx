// _mock
import { _brandsColor } from 'src/_mock';
// sections
import { OurClientsMarketingAbout } from 'src/sections/our-clients/marketing';
import HomeAbout from '../../home/home-about';
import HomeTestimonials from '../../home/home-testimonials';
import HomeGetQuote from '../../home/home-get-quote';
import {
  MarketingAbout,
  MarketingAboutStory,
  MarketingAboutOurVision,
  MarketingAboutCoreValues,
} from 'src/sections/_marketing/about';

// ----------------------------------------------------------------------

type Props = {
  testimonials?: any[];
  partners?: any[];
};

export default function AboutView({ testimonials = [], partners = [] }: Props) {
  // Use provided partners or fallback to default brands
  const displayBrands = partners.length > 0 ? partners : _brandsColor;

  return (
    <>
      <MarketingAbout />

      <HomeAbout />

      <MarketingAboutOurVision />

      <MarketingAboutCoreValues />

      <MarketingAboutStory />

      <OurClientsMarketingAbout brands={displayBrands} />

      <HomeTestimonials testimonials={testimonials} />

      <HomeGetQuote />
    </>
  );
}
