import { GetServerSideProps } from 'next';
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// data helpers
import { getProductById, getProductReviews } from 'src/lib/supabaseData';
// view
import EcommerceProductView from 'src/sections/_e-commerce/view/EcommerceProductView';

interface PageProps {
  product: any | null;
  reviews: any[];
}

export default function EcommerceProductByIdPage({ product, reviews }: PageProps) {
  if (!product) {
    return <div>Produit introuvable</div>;
  }
  return (
    <>
      <Head>
        <title>{product.name} | Boutique</title>
      </Head>
      <EcommerceProductView product={product} reviews={reviews} />
    </>
  );
}

EcommerceProductByIdPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const product = await getProductById(id);
  if (!product) {
    return { props: { product: null, reviews: [] } };
  }
  const reviews = await getProductReviews(product.id);
  return { props: { product, reviews } };
};
