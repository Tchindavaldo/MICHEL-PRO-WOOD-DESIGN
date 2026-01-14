import { GetServerSideProps } from 'next';
import Head from 'next/head';
import MainLayout from 'src/layouts/main';
import { getProductBySlug, getProductReviews } from 'src/lib/supabaseData';
import EcommerceProductView from 'src/sections/_e-commerce/view/EcommerceProductView';

interface PageProps {
  product: any | null;
  reviews: any[];
}

export default function ProductSlugPage({ product, reviews }: PageProps) {
  if (!product) {
    return <div>Produit introuvable</div>;
  }
  return (
    <>
      <Head>
        <title>{product.name} | Boutique WoodPro</title>
      </Head>

      <EcommerceProductView product={product} reviews={reviews} />
    </>
  );
}

ProductSlugPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const product = await getProductBySlug(slug);
  if (!product) {
    return { props: { product: null, reviews: [] } };
  }
  const reviews = await getProductReviews(product.id);
  return { props: { product, reviews } };
};
