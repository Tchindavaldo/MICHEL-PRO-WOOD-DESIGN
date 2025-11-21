// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ContactView } from 'src/sections/michel-pro-wood/contact/view';

// ----------------------------------------------------------------------

ContactPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ContactPage() {
  return <ContactView />;
}
