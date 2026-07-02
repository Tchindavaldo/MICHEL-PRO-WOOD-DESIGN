// layouts
import MainLayout from 'src/layouts/main';
// sections
import { FormationProfessionnelleForm } from 'src/sections/michel-pro-wood/inscriptions/formation-professionnelle';
// @mui
import { Box, Container } from '@mui/material';
// seo
import { Seo, breadcrumbJsonLd } from 'src/components/seo';
import { INDEXED_PAGES } from 'src/config-seo';

const SEO = INDEXED_PAGES.find((p) => p.path === '/inscriptions/formation-professionnelle')!;

// ----------------------------------------------------------------------

export default function FormationProfessionnellePage() {
  return (
    <>
      <Seo
        title={SEO.title}
        description={SEO.description}
        canonical="/inscriptions/formation-professionnelle"
        jsonLd={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Formation professionnelle', path: '/inscriptions/formation-professionnelle' },
        ])}
      />
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <FormationProfessionnelleForm />
        </Container>
      </Box>
    </>
  );
}

FormationProfessionnellePage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);
