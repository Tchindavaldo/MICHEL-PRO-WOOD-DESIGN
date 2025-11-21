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

export default function AboutView() {
  return (
    <>
      <MarketingAbout />

      <HomeAbout />

      <MarketingAboutOurVision />

      <MarketingAboutCoreValues />

      <MarketingAboutStory />

      <OurClientsMarketingAbout brands={_brandsColor} />

      <HomeTestimonials />

      <HomeGetQuote />
    </>
  );
}
