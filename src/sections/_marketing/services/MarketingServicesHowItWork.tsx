// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from '@mui/lab';
import { Typography, Container } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// hooks
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    step: 'ÉTAPE 1',
    title: 'Consultation & Conception',
    description:
      'Échange sur vos besoins, prise de mesures et création de plans 3D personnalisés pour visualiser votre projet.',
  },
  {
    step: 'ÉTAPE 2',
    title: 'Devis & Validation',
    description:
      'Établissement d\'un devis détaillé, choix des matériaux et validation du projet avant fabrication.',
  },
  {
    step: 'ÉTAPE 3',
    title: 'Fabrication',
    description:
      'Réalisation artisanale avec usinage CNC pour une précision optimale et des finitions impeccables.',
  },
  {
    step: 'ÉTAPE 4',
    title: 'Livraison & Installation',
    description:
      'Livraison soignée et installation professionnelle avec contrôle qualité final pour votre satisfaction.',
  },
];

const COLORS = ['primary', 'secondary', 'warning', 'success'] as const;

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  padding: theme.spacing(10, 0),
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  description?: string;
  processSteps?: {
    id: string;
    stepNumber?: string;
    step_number?: string;
    title: string;
    description: string;
  }[];
};

export default function MarketingServicesHowItWork({ title, description, processSteps = [] }: Props) {
  const isMdUp = useResponsive('up', 'md');

  const displayTimelines = processSteps.length > 0 
    ? processSteps.map((step: any) => ({
        step: step.step_number || step.stepNumber,
        title: step.title,
        description: step.description,
      }))
    : TIMELINES;

  return (
    <StyledRoot>
      <Container>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          {title || 'Comment Ça Marche'}
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
          {description || 'De la conception à la livraison, découvrez notre processus de travail éprouvé pour des résultats exceptionnels.'}
        </Typography>

        <Timeline position={isMdUp ? 'alternate' : 'right'}>
          {displayTimelines.map((value, index) => (
            <TimelineItem
              key={value.title}
              sx={{
                '&:before': {
                  ...(!isMdUp && { display: 'none' }),
                },
              }}
            >
              <TimelineSeparator>
                <TimelineDot color={COLORS[index % COLORS.length]} />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent sx={{ pb: { xs: 3, md: 5 } }}>
                <Typography variant="overline" sx={{ color: `${COLORS[index % COLORS.length]}.main` }}>
                  {value.step}
                </Typography>

                <Typography variant="h4" sx={{ mt: 0.5, mb: 1 }}>
                  {value.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.72,
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
    </StyledRoot>
  );
}
