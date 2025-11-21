// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Link,
  Stack,
  Button,
  Container,
  TextField,
  Typography,
  TextFieldProps,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: '/assets/images/michel-pro-wood/hero/878ebad3-fa90-4a0b-b0d1-0054159bf4f4.jpg',
  }),
  padding: theme.spacing(10, 0),
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const StyledInput = styled((props: TextFieldProps) => <TextField fullWidth {...props} />)(
  ({ theme }) => ({
    '& .MuiInputBase-input': {
      color: theme.palette.common.white,
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.grey[500],
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.common.white,
    },
    '& .MuiFilledInput-root': {
      backgroundColor: alpha(theme.palette.grey[500], 0.16),
      '&:hover': {
        backgroundColor: alpha(theme.palette.grey[500], 0.24),
      },
      '&.Mui-focused': {
        backgroundColor: alpha(theme.palette.grey[500], 0.24),
      },
    },
  })
);

// ----------------------------------------------------------------------

export default function HomeGetQuote() {
  return (
    <StyledRoot>
      <Container>
        <Grid
          container
          spacing={{
            xs: 5,
            md: 3,
          }}
          justifyContent="space-between"
        >
          <Grid xs={12} md={5}>
            <Typography
              variant="h1"
              component="h2"
              sx={{
                color: 'primary.main',
                mb: { xs: 3, md: 8 },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Obtenir un
              <br /> Devis Gratuit
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ color: 'common.white', mb: 2 }}
            >
              <Iconify icon="carbon:email" width={24} sx={{ mr: 2 }} />

              <Link color="inherit" href="mailto:michelprowooddesign@gmail.com">
                michelprowooddesign@gmail.com
              </Link>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ color: 'common.white', mb: 2 }}
            >
              <Iconify icon="carbon:location" width={24} sx={{ mr: 2 }} />
              Bafoussam (Foyer Lagouenne, Ouest Cameroun)
            </Stack>

             <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ color: 'common.white' }}
            >
              <Iconify icon="carbon:phone" width={24} sx={{ mr: 2 }} />
              696 10 36 72 / 683 69 64 62
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            <Stack alignItems={{ xs: 'center', md: 'flex-start' }}>
              <StyledInput variant="filled" label="Nom complet" sx={{ mb: 2.5 }} />

              <StyledInput variant="filled" label="Email" sx={{ mb: 2.5 }} />

              <StyledInput variant="filled" label="Téléphone" sx={{ mb: 2.5 }} />

              <StyledInput 
                variant="filled" 
                label="Description du projet" 
                multiline 
                rows={4} 
                sx={{ mb: 5 }} 
              />

              <Button size="large" variant="contained" color="primary">
                Envoyer la demande
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
