// layouts
import MainLayout from 'src/layouts/main';
// sections
import { AboutView } from 'src/sections/michel-pro-wood/about/view';

// ----------------------------------------------------------------------

AboutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return <AboutView />;
}
