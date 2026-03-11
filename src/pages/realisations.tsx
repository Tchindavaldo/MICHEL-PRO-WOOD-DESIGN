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
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.wood_realization_categories?.name || 'Projet',
    coverImg: item.image_url,
    slug: item.slug,
  }));

  // Map features to component format
  const mappedFeatures = features.map((item: any) => ({
    label: item.title,
    icon: item.emoji || '🪵',
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
