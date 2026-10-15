// DEMO admin page — only exists when NEXT_PUBLIC_DEMO=1 (404 otherwise).
import { DEMO_MODE } from 'src/demo/config';
import AdminShell from 'src/sections/admin-demo/AdminShell';
import { ProductsView } from 'src/sections/admin-demo/AdminViews';

export const getStaticProps = async () => (DEMO_MODE ? { props: {} } : { notFound: true });

export default function Page() {
  return (
    <AdminShell title="Produits">
      <ProductsView />
    </AdminShell>
  );
}
