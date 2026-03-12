import { _products, _testimonials, _productsCarousel } from 'src/_mock';
import { IShopPageData } from 'src/types/shop';
import TestimonialEcommerce from '../../testimonial/e-commerce';
import { EcommerceHeader } from '../layout';
import {
  EcommerceLandingHero,
  EcommerceLandingCategories,
  EcommerceLandingTopProducts,
  EcommerceLandingHotDealToday,
  EcommerceLandingSpecialOffer,
  EcommerceLandingFeaturedBrands,
  EcommerceLandingPopularProducts,
  EcommerceLandingFeaturedProducts,
} from '../landing';

// ----------------------------------------------------------------------

type Props = {
  data?: IShopPageData;
};

export default function EcommerceLandingView({ data }: Props) {
  // Check if we have backend data
  const hasBanners = !!(data?.banners?.length);
  const hasHotDeal = !!(data?.hotDealProducts?.length);
  const hasFeatured = !!(data?.featuredProducts?.length);
  const hasCollection = !!(data?.collectionProducts?.length);
  const hasSpecialOffer = !!(data?.specialOfferProducts?.length);
  const hasPopular = !!(data?.popularProducts?.length);
  const hasTestimonials = !!(data?.testimonials?.length);
  const hasCategories = !!(data?.categories?.length);

  // Adapt products from DB to the shape expected by existing components
  const adaptProductsForComponent = (products: IShopPageData['hotDealProducts']) =>
    products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      priceSale: p.priceSale,
      coverImg: p.coverImg,
      category: p.category,
      sold: p.sold,
      inStock: p.inStock,
      rating: p.rating,
      label: p.label,
      caption: p.caption,
      description: p.description,
      images: p.images,
      // Pass-through section-specific fields
      hot_deal_expires_at: p.hot_deal_expires_at,
      special_offer_label: p.special_offer_label,
      special_offer_price_text: p.special_offer_price_text,
      special_offer_description: p.special_offer_description,
    }));

  const allBackendProducts = hasPopular ? adaptProductsForComponent(data!.popularProducts) : _products;

  return (
    <>
      <EcommerceHeader />

      <EcommerceLandingHero
        banners={hasBanners ? data!.banners : _productsCarousel.map(p => ({ ...p, btnText: 'Voir la collection', btnLink: '#' }))}
      />

      <EcommerceLandingCategories
        categories={hasCategories ? data!.categories : undefined}
      />

      <EcommerceLandingHotDealToday
        products={hasHotDeal ? adaptProductsForComponent(data!.hotDealProducts) : _products}
      />

      <EcommerceLandingFeaturedProducts
        products={hasFeatured ? adaptProductsForComponent(data!.featuredProducts) : _products}
      />

      <EcommerceLandingSpecialOffer
        products={hasSpecialOffer ? adaptProductsForComponent(data!.specialOfferProducts) : undefined}
        content={data?.specialOfferContent || undefined}
      />

      <EcommerceLandingFeaturedBrands
        products={hasCollection ? adaptProductsForComponent(data!.collectionProducts) : _products}
        content={data?.collectionContent || undefined}
      />

      <EcommerceLandingPopularProducts 
        products={allBackendProducts} 
      />

      <EcommerceLandingTopProducts 
        products={allBackendProducts} 
      />

      <TestimonialEcommerce
        testimonials={hasTestimonials ? data!.testimonials : _testimonials}
      />
    </>
  );
}
