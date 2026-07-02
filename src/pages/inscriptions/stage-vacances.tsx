// layouts
import MainLayout from 'src/layouts/main';
// sections
import { StageVacancesForm } from 'src/sections/michel-pro-wood/inscriptions/stage-vacances';
// @mui
import { Box, Container } from '@mui/material';
// seo
import { Seo, breadcrumbJsonLd } from 'src/components/seo';
import { INDEXED_PAGES } from 'src/config-seo';

const SEO = INDEXED_PAGES.find((p) => p.path === '/inscriptions/stage-vacances')!;

// ----------------------------------------------------------------------

export default function StageVacancesPage() {
  return (
    <>
      <Seo
        title={SEO.title}
        description={SEO.description}
        canonical="/inscriptions/stage-vacances"
        jsonLd={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Stage de vacances', path: '/inscriptions/stage-vacances' },
        ])}
      />
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <StageVacancesForm />
        </Container>
      </Box>
    </>
  );
}

StageVacancesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
