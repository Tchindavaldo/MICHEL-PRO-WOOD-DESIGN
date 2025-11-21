// _mock
import { _testimonials } from 'src/_mock';
//
import TestimonialEcommerce from 'src/sections/testimonial/e-commerce';
import { EcommerceHeader } from 'src/sections/_e-commerce/layout';
import {
  EcommerceLandingHero,
  EcommerceLandingCategories,
  EcommerceLandingTopProducts,
  EcommerceLandingHotDealToday,
  EcommerceLandingSpecialOffer,
  EcommerceLandingFeaturedBrands,
  EcommerceLandingPopularProducts,
  EcommerceLandingFeaturedProducts,
} from 'src/sections/_e-commerce/landing';
import HomeGetQuote from '../../home/home-get-quote';

// ----------------------------------------------------------------------

export default function ShopView() {
  return (
    <>
      <EcommerceHeader />

      <EcommerceLandingHero />

      <EcommerceLandingCategories />

      <EcommerceLandingHotDealToday />


      <EcommerceLandingFeaturedProducts />

      <EcommerceLandingSpecialOffer />

      <EcommerceLandingFeaturedBrands />

      <EcommerceLandingPopularProducts />

      <EcommerceLandingTopProducts />

      <TestimonialEcommerce testimonials={_testimonials} />

      <HomeGetQuote />
    </>
  );
}
