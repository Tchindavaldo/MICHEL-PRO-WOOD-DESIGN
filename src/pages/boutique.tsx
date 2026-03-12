// next
import Head from 'next/head';
import { GetStaticProps } from 'next';
// layouts
import MainLayout from 'src/layouts/main';
// supabase
import { createClient } from '@supabase/supabase-js';
// sections
import { EcommerceLandingView } from 'src/sections/_e-commerce/view';
// types
import { IShopPageData } from 'src/types/shop';

// ----------------------------------------------------------------------

ShopPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ShopPage({ data }: { data: IShopPageData }) {
  return (
    <>
      <Head>
        <title>Boutique | Michel Pro Wood</title>
      </Head>

      <EcommerceLandingView data={data} />
    </>
  );
}

// ----------------------------------------------------------------------

export const getStaticProps: GetStaticProps = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    // 1. Fetch segmented products (Hot Deals, Featured, Special)
    // 2. Fetch overall products for Popularity/Top Sellers (order by sold/rating)
    const [
      { data: hotDealProducts },
      { data: featuredProducts },
      { data: collectionProducts },
      { data: specialOfferProducts },
      { data: allActiveProducts },
      { data: pageContent },
      { data: banners },
      { data: categories },
      { data: testimonials },
    ] = await Promise.all([
      supabase
        .from('wood_products')
        .select('*')
        .eq('is_hot_deal', true)
        .order('name'),

      supabase
        .from('wood_products')
        .select('*')
        .eq('is_featured', true)
        .order('name'),

      supabase
        .from('wood_products')
        .select('*')
        .eq('is_collection', true)
        .order('name'),

      supabase
        .from('wood_products')
        .select('*')
        .eq('is_special_offer', true)
        .order('name'),

      supabase
        .from('wood_products')
        .select('*')
        .order('sold_count', { ascending: false })
        .limit(20),



      supabase.from('wood_page_content').select('*').eq('page_slug', 'shop'),
      supabase.from('wood_banners').select('*').order('display_order', { ascending: true }),
      supabase.from('wood_shop_categories').select('*').order('display_order', { ascending: true }),
      supabase.from('wood_testimonials').select('*').order('display_order', { ascending: true }),

    ]);

    const contentMap: Record<string, any> = {};
    (pageContent || []).forEach((item: any) => {
      contentMap[item.section_key] = item;
    });

    const normalizeProduct = (p: any) => ({
      id: p.id,
      name: p.name || '',
      price: Number(p.price) || 0,
      priceSale: Number(p.price_sale) || 0,
      coverImg: p.image_url || '', // Frontend expects coverImg
      category: p.category || '',
      sold: Number(p.sold_count) || 0,
      inStock: 100,
      rating: Number(p.rating) || 0,
      label: p.is_hot_deal ? 'HOT' : '',
      caption: 'Création Wood Pro',
      description: p.description || '',
      images: [p.image_url || ''],
      hot_deal_expires_at: p.hot_deal_expires_at || null,
      special_offer_label: p.special_offer_label || null,
      special_offer_price_text: p.special_offer_price_text || null,
      special_offer_description: p.special_offer_description || null,
    });

    return {
      props: {
        data: {
          banners: (banners || []).map((b: any) => ({
            id: b.id,
            title: b.title,
            caption: b.subtitle || '',
            label: b.badge_text || '',
            coverImg: b.image_url || '',
            btnText: b.btn_text || 'Voir la collection',
            btnLink: b.btn_link || '#',
          })),
          categories: (categories || []).map((c: any) => ({
            id: c.id,
            label: c.name,
            icon: c.icon || 'carbon:home',
            path: c.path || '#',
          })),
          hotDealProducts: (hotDealProducts || []).map(normalizeProduct),
          featuredProducts: (featuredProducts || []).map(normalizeProduct),
          collectionProducts: (collectionProducts || []).map(normalizeProduct),
          specialOfferProducts: (specialOfferProducts || []).map(normalizeProduct),
          // For popular and top sellers we use the general pool ordered by sales
          popularProducts: (allActiveProducts || []).map(normalizeProduct),
          testimonials: (testimonials || []).map((t: any) => ({
            id: t.id,
            name: t.client_name || '',
            role: t.client_role || '',
            avatar: t.client_avatar_url || '',
            postDate: t.created_at || new Date().toISOString(),
            rating: Number(t.rating) || 5,
            review: t.testimonial_text || '',
          })),
          heroContent: contentMap['hero'] || null,
          collectionContent: contentMap['collection'] || null,
          specialOfferContent: contentMap['special_offer'] || null,
        } as IShopPageData,
      },
      revalidate: 30,
    };
  } catch (error) {
    console.error('CRITICAL: Error fetching boutique data from Supabase:', error);
    return {

      props: { data: {} },
      revalidate: 30,
    };
  }
};
