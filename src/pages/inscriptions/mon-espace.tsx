// layouts
import MainLayout from 'src/layouts/main';
// sections
import MonEspaceInscription from 'src/sections/michel-pro-wood/inscriptions/mon-espace/MonEspaceInscription';
// @mui
import { Box, Container } from '@mui/material';

export default function MonEspacePage() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <MonEspaceInscription />
      </Container>
    </Box>
  );
}

MonEspacePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
