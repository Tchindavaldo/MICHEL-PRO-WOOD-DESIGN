// layouts
import MainLayout from 'src/layouts/main';
// sections
import { RealizationsView } from 'src/sections/michel-pro-wood/realizations/view';

// ----------------------------------------------------------------------

RealizationsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function RealizationsPage() {
  return <RealizationsView />;
}
