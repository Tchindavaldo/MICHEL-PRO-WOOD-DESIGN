// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ServicesView } from 'src/sections/michel-pro-wood/services/view';

// ----------------------------------------------------------------------

ServicesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicesPage() {
  return <ServicesView />;
}
