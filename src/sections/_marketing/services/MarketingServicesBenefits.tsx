// @mui
import { Box, Container, Typography, Stack } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const BENEFITS = [
  {
    title: 'Fabrication Artisanale',
    description: 'Haute précision avec bois sélectionné premium et finitions irréprochables.',
    iconColor: 'primary',
  },
  {
    title: 'Technologie CFAO',
    description: 'Conception et fabrication assistée par ordinateur pour des réalisations modernes.',
    iconColor: 'success',
  },
  {
    title: 'Personnalisation Totale',
    description: 'Chaque projet est unique et adapté à vos besoins spécifiques.',
    iconColor: 'secondary',
  },
  {
    title: 'Durabilité Garantie',
    description: 'Matériaux de qualité supérieure pour des ouvrages durables dans le temps.',
    iconColor: 'secondary',
  },
  {
    title: 'Savoir-faire Local',
    description: 'Expertise camerounaise combinée à la technologie moderne.',
    iconColor: 'success',
  },
  {
    title: 'Service Professionnel',
    description: 'Accompagnement complet de la conception à la livraison.',
    iconColor: 'primary',
  },
];

// ----------------------------------------------------------------------

export default function MarketingServicesBenefits() {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: { xs: 10, md: 15 },
      }}
    >
      <Container>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Nos Caractéristiques
        </Typography>

        <Typography
          sx={{
            mt: 3,
            mx: 'auto',
            opacity: 0.72,
            maxWidth: 480,
            textAlign: 'center',
            mb: { xs: 8, md: 10 },
          }}
        >
          Ce qui nous distingue et fait notre réputation d'excellence dans le secteur bois.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
            gridTemplateColumns: { md: 'repeat(3, 1fr)' },
          }}
        >
          <Stack spacing={{ xs: 4, md: 10 }}>
            {BENEFITS.slice(0, 3).map((benefit, index) => (
              <BenefitItem key={benefit.title} benefit={benefit} index={index} reverse />
            ))}
          </Stack>

          {isMdUp && <Image alt="benefits" src="/assets/illustrations/illustration_benefits.svg" />}

          <Stack spacing={{ xs: 4, md: 10 }}>
            {BENEFITS.slice(-3).map((benefit, index) => (
              <BenefitItem key={benefit.title} benefit={benefit} index={index} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type BenefitItemProps = {
  index: number;
  reverse?: boolean;
  benefit: {
    title: string;
    description: string;
    iconColor: string;
  };
};

function BenefitItem({ benefit, reverse, index }: BenefitItemProps) {
  const { title, description, iconColor } = benefit;

  return (
    <Stack
      spacing={1}
      direction={{ xs: 'row', md: reverse ? 'row-reverse' : 'row' }}
      sx={{
        ...(reverse && {
          textAlign: { md: 'right' },
        }),
        ...(index === 1 && {
          pl: { md: 6 },
          ...(reverse && {
            pl: { md: 0 },
            pr: { md: 6 },
          }),
        }),
      }}
    >
      <Box
        sx={{
          m: 1,
          width: 16,
          height: 16,
          flexShrink: 0,
          borderRadius: '50%',
          background: (theme) =>
            `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          ...(iconColor === 'secondary' && {
            background: (theme) =>
              `linear-gradient(to bottom, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
          }),
          ...(iconColor === 'success' && {
            background: (theme) =>
              `linear-gradient(to bottom, ${theme.palette.success.light}, ${theme.palette.success.main})`,
          }),
        }}
      />

      <Stack spacing={1}>
        <Typography variant="h5">{title}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}
