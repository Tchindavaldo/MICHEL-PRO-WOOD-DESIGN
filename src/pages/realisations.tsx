// layouts
import MainLayout from 'src/layouts/main';
// lib
import { 
  getRealizations, 
  getRealizationFeatures, 
  getPageContent 
} from 'src/lib/supabaseData';
// sections
import { RealizationsView } from 'src/sections/michel-pro-wood/realizations/view';

// ----------------------------------------------------------------------

export async function getStaticProps() {
  const [
    realizations,
    features,
    pageContent
  ] = await Promise.all([
    getRealizations(),
    getRealizationFeatures(),
    getPageContent('realizations')
  ]);

  // Map realizations to component format
  const mappedRealizations = realizations.map((item: any) => ({
    id: item.id || null,
    title: item.title || null,
    description: item.description || null,
    category: item.wood_realization_categories?.name || 'Projet',
    coverImg: item.cover_image_url || null,
    slug: item.slug || null,
  }));

  // Map features to component format
  const mappedFeatures = features.map((item: any) => ({
    label: item.title || null,
    icon: item.icon_url || null,
    color: item.color || 'primary',
  }));

  return {
    props: {
        realizations: mappedRealizations,
        features: mappedFeatures,
        pageContent
    },
    revalidate: 60,
  };
}

export default function RealizationsPage({ realizations, features, pageContent }: any) {
  return <RealizationsView realizations={realizations} features={features} pageContent={pageContent} />;
}

RealizationsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
