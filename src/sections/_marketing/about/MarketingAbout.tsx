// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Button, Unstable_Grid2 as Grid } from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// theme
import { ColorSchema } from 'src/theme/palette';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CountUp from 'src/components/count-up';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'warning', 'success'] as const;

const SUMMARY = [
  { title: "Années d'expérience", total: 10, icon: 'carbon:increase-level' },
  { title: 'Projets réalisés', total: 250, icon: 'carbon:data-vis-4' },
  { title: 'Clients satisfaits', total: 180, icon: 'carbon:user-certification' },
  { title: 'Formations dispensées', total: 50, icon: 'carbon:trophy' },
];

// ----------------------------------------------------------------------

type StyledIconProps = {
  color: ColorSchema;
};

const StyledIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<StyledIconProps>(({ color, theme }) => ({
  width: 160,
  height: 160,
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  color: theme.palette[color].darker,
  border: `dashed 2px ${alpha(theme.palette[color].main, 0.24)}`,
  '&:before': {
    zIndex: 8,
    content: '""',
    borderRadius: '50%',
    position: 'absolute',
    width: 'calc(100% - 48px)',
    height: 'calc(100% - 48px)',
    background: `conic-gradient(from 0deg at 50% 50%, ${theme.palette[color].main} 0deg, ${theme.palette[color].light} 360deg)`,
  },
  '& svg': {
    zIndex: 9,
  },
}));

// ----------------------------------------------------------------------

export default function MarketingAbout() {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: 10,
      }}
    >
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        {isMdUp && (
          <Grid xs={12} md={6} lg={5}>
            <Image alt="teams" src="/assets/illustrations/illustration_teams.svg" />
          </Grid>
        )}

        <Grid
          xs={12}
          md={6}
          lg={6}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">Qui Sommes-Nous ?</Typography>

          <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
            Michel Pro Wood Design est une entreprise spécialisée dans la menuiserie, l'ébénisterie, 
            la conception et la fabrication assistée par ordinateur (CFAO), les constructions bois 
            et la formation professionnelle.
            <br />
            <br />
            Notre mission est de transformer le secteur bois camerounais en intégrant l'artisanat 
            traditionnel, la technologie numérique, la modélisation 3D, l'usinage CNC et un système 
            de gestion moderne pour produire des ouvrages en bois de haute qualité, durables, 
            esthétiques et personnalisés.
          </Typography>

          <Button
            variant="outlined"
            color="inherit"
            size="large"
            endIcon={<Iconify icon="carbon:chevron-right" />}
          >
            Découvrir Nos Réalisations
          </Button>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 10,
          textAlign: 'center',
          display: 'grid',
          gap: { xs: 5, md: 8 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {SUMMARY.map((value, index) => (
          <div key={value.title}>
            <StyledIcon color={COLORS[index]}>
              <Iconify icon={value.icon} width={48} />
            </StyledIcon>

            <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
              <CountUp
                start={value.total / 5}
                end={value.total}
                formattingFn={(newValue: number) => fShortenNumber(newValue)}
              />
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>{value.title}</Typography>
          </div>
        ))}
      </Box>
    </Container>
  );
}
