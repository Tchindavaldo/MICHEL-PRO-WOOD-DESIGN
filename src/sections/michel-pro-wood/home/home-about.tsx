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
// next
import NextLink from 'next/link';
// routes
import { paths } from 'src/routes/paths';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { HERO_IMAGES } from 'src/assets/data/michel-pro-wood/images-link';
import { getHomeAboutStats, getPageContent } from 'src/lib/supabaseData';
import { useState, useEffect } from 'react';

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

const DEFAULT_CONTENT = {
  subtitle: 'À propos de nous',
  title: 'Qui Sommes-Nous ?',
  description: 'Michel Pro Wood Design est une entreprise spécialisée dans la menuiserie, l’ébénisterie, la conception et la fabrication assistée par ordinateur (CFAO), les constructions bois et la formation professionnelle.',
  button_text: 'En savoir plus'
};

export default function HomeAbout() {
  const [stats, setStats] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const [statsData, contentData] = await Promise.all([
        getHomeAboutStats(),
        getPageContent('home', 'about')
      ]);

      // Set stats from DB or fallback to defaults
      if (statsData && statsData.length > 0) {
        setStats(statsData);
      } else {
        setStats(ROWS);
      }

      // Set content from DB or fallback to defaults
      if (contentData) {
        setContent({
          title: contentData.title || DEFAULT_CONTENT.title,
          subtitle: contentData.subtitle || DEFAULT_CONTENT.subtitle,
          description: contentData.description || contentData.content || DEFAULT_CONTENT.description,
          button_text: contentData.button_text || DEFAULT_CONTENT.button_text
        });
      } else {
        setContent(DEFAULT_CONTENT);
      }
    }
    fetchData();
  }, []);

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
            {content?.subtitle || DEFAULT_CONTENT.subtitle}
          </Typography>

          <Typography variant="h2" sx={{ my: 3 }}>
            {content?.title || DEFAULT_CONTENT.title}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            {content?.description || DEFAULT_CONTENT.description}
          </Typography>

          <Button
            component={NextLink}
            href={paths.michelProWood.about}
            size="large"
            color="inherit"
            endIcon={<Iconify icon="carbon:chevron-right" />}
            sx={{ my: 5 }}
          >
            {content?.button_text || DEFAULT_CONTENT.button_text}
          </Button>
        </Grid>

        <Grid xs={12} md={6}>
          <Stack spacing={5}>
            {stats.map((row) => (
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
