// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Container, Typography, Stack, Box, Unstable_Grid2 as Grid } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

const StyledRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'imageUrl',
})<{ imageUrl?: string }>(({ theme, imageUrl }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: imageUrl || '/assets/images/michel-pro-wood/hero/878ebad3-fa90-4a0b-b0d1-0054159bf4f4.jpg',
  }),
  position: 'relative',
  height: '50vh',
  maxHeight: '500px',
  minHeight: '500px',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const StyledCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  height: '100%',
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

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  overline?: string;
  imageUrl?: string;
  features?: {
    label: string;
    icon: string;
    color: string;
  }[];
};

export default function RealizationsHero({ 
  title, 
  subtitle, 
  description, 
  overline, 
  imageUrl, 
  features 
}: Props) {
  const theme = useTheme();

  const DEFAULT_FEATURES = [
    { label: 'Menuiserie & Ébénisterie d\'excellence', icon: '🪵', color: 'primary' },
    { label: 'Construction bois innovante', icon: '🏗️', color: 'success' },
    { label: 'Finitions artisanales premium', icon: '⭐', color: 'warning' },
    { label: 'Solutions 100% personnalisées', icon: '🎯', color: 'info' },
  ];

  const displayFeatures = features && features.length > 0 ? features : DEFAULT_FEATURES;

  return (
    <StyledRoot imageUrl={imageUrl}>
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
              {overline || 'NOS EXPERTISES'}
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
              {title || 'Nos Réalisations'}
            </Typography>
            {(subtitle || description) && (
               <Typography sx={{ mt: 2, opacity: 0.8, whiteSpace: 'pre-line' }}>
                 {subtitle || description}
               </Typography>
            )}
          </Box>

          <Grid container spacing={2}>
            {displayFeatures.map((feature, index) => (
               <Grid key={index} xs={6} sm={6}>
               <StyledCard>
                 <Stack
                   direction={{ xs: 'column', md: 'row' }}
                   spacing={2}
                   alignItems={{ xs: 'flex-start', md: 'center' }}
                 >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: (theme) => {
                          const color = (theme.palette as any)[feature.color]?.main || theme.palette.primary.main;
                          const darkColor = (theme.palette as any)[feature.color]?.dark || theme.palette.primary.dark;
                          return `linear-gradient(135deg, ${color} 0%, ${darkColor} 100%)`;
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        overflow: "hidden",
                        color: "common.white",
                      }}
                    >
                      {feature.icon && (feature.icon.includes("/") || feature.icon.includes("http")) ? (
                        feature.icon.endsWith(".svg") ? (
                          <Box
                            component="span"
                            sx={{
                              width: 28,
                              height: 28,
                              display: "block",
                              bgcolor: "currentColor",
                              mask: `url(${feature.icon}) no-repeat center / contain`,
                              WebkitMask: `url(${feature.icon}) no-repeat center / contain`,
                            }}
                          />
                        ) : (
                          <Box
                            component="img"
                            src={feature.icon}
                            sx={{ width: 28, height: 28, objectFit: "contain" }}
                          />
                        )
                      ) : (
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                          {feature.icon || '🪵'}
                        </Typography>
                      )}
                    </Box>
                   <Typography sx={{ fontWeight: 500, typography: { xs: 'caption', md: 'body1' } }}>
                     {feature.label}
                   </Typography>
                 </Stack>
               </StyledCard>
             </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
