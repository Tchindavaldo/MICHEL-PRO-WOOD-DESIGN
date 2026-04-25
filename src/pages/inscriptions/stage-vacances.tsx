// layouts
import MainLayout from 'src/layouts/main';
// sections
import { StageVacancesForm } from 'src/sections/michel-pro-wood/inscriptions/stage-vacances';
// @mui
import { Box, Container } from '@mui/material';

// ----------------------------------------------------------------------

export default function StageVacancesPage() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <StageVacancesForm />
      </Container>
    </Box>
  );
}

StageVacancesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
