// @mui
import { alpha, styled } from '@mui/material/styles';
import { Container, Typography, Stack, Box, Unstable_Grid2 as Grid } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import HomeVideoCarousel from '../home/home-video-carousel';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: '/assets/images/michel-pro-wood/hero/878ebad3-fa90-4a0b-b0d1-0054159bf4f4.jpg',
  }),
  position: 'relative',
  height: '50vh',
  maxHeight: '500px',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const StyledCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  background: alpha(theme.palette.common.white, 0.08),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(theme.palette.common.white, 0.12),
    transform: 'translateX(8px)',
    borderColor: alpha(theme.palette.primary.main, 0.5),
  },
}));

// ----------------------------------------------------------------------

export default function RealizationsHero() {
  return (
    <StyledRoot>
      <Container>
        <Stack spacing={4} sx={{ color: 'common.white', maxWidth: 800 }}>
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                letterSpacing: 2,
                mb: 2,
                display: 'block',
              }}
            >
              PORTFOLIO
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.common.white} 0%, ${alpha(
                    theme.palette.primary.light,
                    0.8
                  )} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Nos Réalisations
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <StyledCard>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      🪵
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Menuiserie & Ébénisterie d'excellence
                  </Typography>
                </Stack>
              </StyledCard>
            </Grid>

            <Grid xs={12} sm={6}>
              <StyledCard>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      🏗️
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Construction bois innovante
                  </Typography>
                </Stack>
              </StyledCard>
            </Grid>

            <Grid xs={12} sm={6}>
              <StyledCard>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      ⭐
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Finitions artisanales premium
                  </Typography>
                </Stack>
              </StyledCard>
            </Grid>

            <Grid xs={12} sm={6}>
              <StyledCard>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      🎯
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Solutions 100% personnalisées
                  </Typography>
                </Stack>
              </StyledCard>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
