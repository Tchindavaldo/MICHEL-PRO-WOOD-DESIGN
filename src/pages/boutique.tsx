// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ShopView } from 'src/sections/michel-pro-wood/shop/view';

// ----------------------------------------------------------------------

ShopPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ShopPage() {
  return <ShopView />;
}
