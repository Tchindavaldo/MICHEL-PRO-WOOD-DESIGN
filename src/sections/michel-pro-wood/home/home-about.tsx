// @mui
import {
  Stack,
  Container,
  Typography,
  Button,
  Divider,
  Box,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { HERO_IMAGES } from 'src/assets/data/michel-pro-wood/images-link';

// ----------------------------------------------------------------------

const ROWS = [
  {
    label: 'Projets Réalisés',
    total: 150,
    content: 'Des réalisations uniques pour des clients satisfaits.',
  },
  {
    label: "Années d'expérience",
    total: 10,
    content: 'Une expertise reconnue dans le travail du bois.',
  },
  {
    label: 'Étudiants Formés',
    total: 500,
    content: 'Transmission du savoir-faire et des techniques modernes.',
  },
];

// ----------------------------------------------------------------------

export default function HomeAbout() {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      {/* <Image
        alt="landing about"
        src={HERO_IMAGES[1]}
        ratio="16/9"
        sx={{
          borderRadius: 1.5,
          mb: { xs: 5, md: 10 },
        }}
      /> */}

      <Grid
        container
        columnSpacing={{ xs: 0, md: 3 }}
        rowSpacing={{ xs: 5, md: 0 }}
        justifyContent="space-between"
      >
        <Grid
          xs={12}
          md={5}
          sx={{
            textAlign: { xs: 'center', md: 'right' },
          }}
        >
          <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            À propos de nous
          </Typography>

          <Typography variant="h2" sx={{ my: 3 }}>
            Qui Sommes-Nous ?
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Michel Pro Wood Design est une entreprise spécialisée dans la menuiserie, l’ébénisterie,
            la conception et la fabrication assistée par ordinateur (CFAO), les constructions bois
            et la formation professionnelle.
          </Typography>

          <Button
            size="large"
            color="inherit"
            endIcon={<Iconify icon="carbon:chevron-right" />}
            sx={{ my: 5 }}
          >
            En savoir plus
          </Button>
        </Grid>

        <Grid xs={12} md={6}>
          <Stack spacing={5}>
            {ROWS.map((row) => (
              <Stack
                key={row.label}
                direction="row"
                alignItems="center"
                divider={
                  <Divider
                    flexItem
                    orientation="vertical"
                    sx={{ ml: 3, mr: 5, borderStyle: 'dashed' }}
                  />
                }
              >
                <Stack spacing={1} sx={{ width: 1, maxWidth: 100 }}>
                  <Stack direction="row">
                    <Typography variant="h2">{fShortenNumber(row.total)}</Typography>
                    <Box component="span" sx={{ color: 'primary.main', typography: 'h4' }}>
                      +
                    </Box>
                  </Stack>

                  <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                    {row.label}
                  </Typography>
                </Stack>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {row.content}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
