// _mock
import { useState, useEffect } from 'react';
import { supabase } from 'src/lib/supabase';
import { _products, _testimonials } from 'src/_mock';
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
  useEffect(() => {
    const fetchProductsLog = async () => {
      const { data, error } = await supabase.from('wood_products').select('*');
      if (error) {
        console.error('Error fetching products from backend:', error);
      } else {
        console.log('Products fetched from Backend (wood_products):', data);
      }
    };
    fetchProductsLog();
  }, []);

  return (
    <>
      <EcommerceHeader />

      <EcommerceLandingHero />

      <EcommerceLandingCategories />

      <EcommerceLandingHotDealToday />


      <EcommerceLandingFeaturedProducts products={_products} />

      <EcommerceLandingSpecialOffer />

      <EcommerceLandingFeaturedBrands />

      <EcommerceLandingPopularProducts products={_products} />

      <EcommerceLandingTopProducts products={_products} />

      <TestimonialEcommerce testimonials={_testimonials} />

      <HomeGetQuote />
    </>
  );
}
