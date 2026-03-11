// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { EcommerceLandingView } from 'src/sections/_e-commerce/view';

// ----------------------------------------------------------------------

ShopPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ShopPage() {
  return (
    <>
      <Head>
        <title>Boutique | Michel Pro Wood</title>
      </Head>

      <EcommerceLandingView />
    </>
  );
}
