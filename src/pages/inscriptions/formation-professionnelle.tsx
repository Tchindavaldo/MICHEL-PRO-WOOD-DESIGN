// layouts
import MainLayout from 'src/layouts/main';
// sections
import { FormationProfessionnelleForm } from 'src/sections/michel-pro-wood/inscriptions/formation-professionnelle';
// @mui
import { Box, Container } from '@mui/material';

// ----------------------------------------------------------------------

export default function FormationProfessionnellePage() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <FormationProfessionnelleForm />
      </Container>
    </Box>
  );
}

FormationProfessionnellePage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);
