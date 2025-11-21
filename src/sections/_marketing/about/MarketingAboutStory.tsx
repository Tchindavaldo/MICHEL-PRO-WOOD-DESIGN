// @mui
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from '@mui/lab';
import { Box, Stack, Typography, Container } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    year: '2024',
    title: 'Expansion & Formation',
    description:
      'Lancement de notre centre de formation professionnelle en menuiserie, ébénisterie et usinage CNC pour former la nouvelle génération.',
  },
  {
    year: '2022',
    title: 'Technologie CNC',
    description:
      'Intégration de la CFAO et de l\'usinage CNC pour des réalisations de haute précision et des designs innovants.',
  },
  {
    year: '2018',
    title: 'Croissance & Diversification',
    description:
      'Expansion de nos services vers la construction bois et les cuisines modernes personnalisées.',
  },
  {
    year: '2015',
    title: 'Création de l\'Entreprise',
    description:
      'Fondation de Michel Pro Wood Design avec la vision de transformer le secteur bois camerounais.',
  },
];

const COLORS = ['primary', 'secondary', 'warning', 'success'] as const;

// ----------------------------------------------------------------------

export default function MarketingAboutStory() {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: { xs: 10, md: 15 },
      }}
    >
      <Container>
        <Stack
          spacing={3}
          sx={{
            maxWidth: 480,
            mx: 'auto',
            textAlign: 'center',
            mb: { xs: 8, md: 10 },
          }}
        >
          <Typography variant="h2">Notre Histoire</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Une aventure débutée en 2015 avec la passion du bois et la volonté de transformer 
            l'artisanat traditionnel par l'innovation technologique.
          </Typography>
        </Stack>

        <Timeline position={isMdUp ? 'alternate' : 'right'}>
          {TIMELINES.map((value, index) => (
            <TimelineItem
              key={value.title}
              sx={{
                '&:before': {
                  ...(!isMdUp && { display: 'none' }),
                },
              }}
            >
              <TimelineSeparator>
                <TimelineDot color={COLORS[index]} />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent sx={{ pb: { xs: 3, md: 5 } }}>
                <Typography variant="overline" sx={{ color: `${COLORS[index]}.main` }}>
                  {value.year}
                </Typography>

                <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                  {value.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: { md: 360 },
                    ...(index % 2 && {
                      ml: 'auto',
                    }),
                  }}
                >
                  {value.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
}
