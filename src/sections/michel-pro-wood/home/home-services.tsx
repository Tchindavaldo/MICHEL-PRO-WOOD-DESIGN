// next
import NextLink from 'next/link';
// @mui
import { Stack, Container, Typography, Card, Box, IconButton } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

const SERVICES = [
  {
    name: 'Travaux CNC / CFAO',
    icon: '/assets/icons/ic_chip.svg',
    content: 'Découpes précises, Gravures artistiques, Panneaux décoratifs, Pièces techniques.',
    path: '#',
    color: 'primary',
  },
  {
    name: 'Constructions bois',
    icon: '/assets/icons/ic_creativity.svg',
    content: 'Charpentes, Abris et petites structures, Ossatures bois.',
    path: '#',
    color: 'secondary',
  },
  {
    name: 'Menuiserie & Ébénisterie',
    icon: '/assets/icons/ic_sketch_design.svg',
    content: 'Conception et fabrication de mobilier sur mesure, Agencement intérieur.',
    path: '#',
    color: 'success',
  },
  {
    name: 'Formation professionnelle',
    icon: '/assets/icons/ic_marketing_bullhorn.svg',
    content: 'Menuiserie, CFAO, Constructions bois, Stages pratiques et apprentissages.',
    path: '#',
    color: 'warning',
  },
] as const;

// ----------------------------------------------------------------------

export default function HomeServices() {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: 480,
          mb: { xs: 8, md: 5 },
          mx: { xs: 'auto', md: 'unset' },
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Typography variant="overline" sx={{ color: 'text.disabled' }}>
          Nos Services
        </Typography>

        <Typography variant="h2">Ce que nous offrons</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Des solutions complètes allant de la conception à la réalisation, en passant par la formation.
        </Typography>
      </Stack>

      <Box
        sx={{
          gap: 4,
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {SERVICES.map((service, index) => (
          <ServiceItem key={service.name} service={service} index={index} />
        ))}
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

type ServiceItemProps = {
  service: {
    name: string;
    content: string;
    path: string;
    icon: string;
    color: 'primary' | 'secondary' | 'success' | 'warning';
  };
  index: number;
};

function ServiceItem({ service, index }: ServiceItemProps) {
  const { name, icon, content, path, color } = service;

  return (
    <Card
      sx={{
        px: 4,
        py: 5,
        textAlign: 'center',
        ...(index === 1 && {
          py: { xs: 5, md: 8 },
        }),
        ...(index === 2 && {
          py: { xs: 5, md: 10 },
          boxShadow: (theme) => ({ md: theme.customShadows.z24 }),
        }),
      }}
    >
      <SvgColor
        src={icon}
        sx={{
          width: 88,
          height: 88,
          mx: 'auto',
          color: (theme) => theme.palette[color].main,
        }}
      />

      <Stack spacing={1} sx={{ my: 5 }}>
        <TextMaxLine variant="h6">{name}</TextMaxLine>
        <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
          {content}
        </TextMaxLine>
      </Stack>

      <IconButton
        component={NextLink}
        href={path}
        color={color}
      >
        <Iconify icon="carbon:direction-straight-right" />
      </IconButton>
    </Card>
  );
}
