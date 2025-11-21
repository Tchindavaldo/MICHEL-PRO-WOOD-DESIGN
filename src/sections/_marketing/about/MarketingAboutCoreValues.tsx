// @mui
import { Typography, Container, Box } from '@mui/material';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  {
    title: 'Excellence Artisanale',
    description: 'Fabrication de haute précision avec bois sélectionné premium et finitions irréprochables.',
    icon: '/assets/icons/ic_agreement.svg',
  },
  {
    title: 'Innovation Technologique',
    description: 'CFAO, modélisation 3D et usinage CNC pour des réalisations modernes et précises.',
    icon: '/assets/icons/ic_transparency.svg',
  },
  {
    title: 'Personnalisation Totale',
    description: 'Chaque projet est unique et adapté aux besoins spécifiques de nos clients.',
    icon: '/assets/icons/ic_reputation.svg',
  },
  {
    title: 'Formation & Transmission',
    description: 'Former la nouvelle génération d\'artisans qualifiés pour l\'avenir du secteur bois.',
    icon: '/assets/icons/ic_popularity.svg',
  },
];

// ----------------------------------------------------------------------

export default function MarketingAboutCoreValues() {
  return (
    <Container
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 5, md: 15 },
      }}
    >
      <Typography variant="h2" sx={{ mb: { xs: 8, md: 10 } }}>
        Nos Valeurs Fondamentales
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {CORE_VALUES.map((value) => (
          <Box key={value.title}>
            <SvgColor
              src={value.icon}
              sx={{ width: 64, height: 64, mx: 'auto', color: 'primary.main' }}
            />

            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
              {value.title}
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}> {value.description} </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
