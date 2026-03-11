// @mui
import { alpha } from '@mui/material/styles';
import { Stack, Container, Typography, Card, Box } from '@mui/material';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'warning', 'success'] as const;

const STEPS = [
  {
    name: 'Conception',
    icon: '/assets/icons/ic_sketch_design.svg',
  },
  {
    name: 'Fabrication',
    icon: '/assets/icons/ic_creativity.svg',
  },
  {
    name: 'Finition',
    icon: '/assets/icons/ic_optimization.svg',
  },
  {
    name: 'Livraison',
    icon: '/assets/icons/ic_checklist.svg',
  },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  processSteps?: {
    id: string;
    stepNumber: string;
    title: string;
    description?: string;
    imageUrl?: string;
  }[];
};

export default function HomeProcess({ processSteps = [], title, subtitle, description }: Props) {
  // Use provided processSteps or fallback to default
  const displaySteps = processSteps.length > 0 ? processSteps : STEPS.map((step, index) => ({
    id: `step-${index}`,
    stepNumber: `ÉTAPE ${index + 1}`,
    title: step.name,
    description: '',
    imageUrl: step.icon,
  }));

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
          {subtitle || 'Notre Processus'}
        </Typography>

        <Typography variant="h2">{title || 'Comment nous travaillons'}</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          {description || "Une méthodologie rigoureuse pour garantir la qualité de chaque projet, de l'idée à la pose."}
        </Typography>
      </Stack>

      <Box
        sx={{
          gap: 4,
          display: 'grid',
          alignItems: 'flex-end',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {displaySteps.map((step, index) => (
          <StepItem key={step.id} step={step} index={index} />
        ))}
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

type StepItemProps = {
  step: {
    id: string;
    stepNumber: string;
    title: string;
    description?: string;
    imageUrl?: string;
  };
  index: number;
};

function StepItem({ step, index }: StepItemProps) {
  const { stepNumber, title, description, imageUrl } = step;

  return (
    <Card
      sx={{
        p: 2,
        color: (theme) => theme.palette[COLORS[index % COLORS.length]].darker,
        bgcolor: (theme) => theme.palette[COLORS[index % COLORS.length]].light,
        boxShadow: (theme) => `-8px 12px 32px 0px ${alpha(theme.palette[COLORS[index % COLORS.length]].main, 0.2)}`,
        ...(index === 1 && {
          mb: { md: 2.5 },
        }),
        ...(index === 2 && {
          mb: { md: 5 },
        }),
        ...(index === 3 && {
          mb: { md: 7.5 },
        }),
      }}
    >
      {imageUrl && <SvgColor src={imageUrl} sx={{ width: 64, height: 64, opacity: 0.48 }} />}

      <Typography variant="overline" sx={{ mt: 2, display: 'block', opacity: 0.7 }}>
        {stepNumber}
      </Typography>

      <Typography variant="h5" sx={{ mt: 1, textAlign: 'right' }}>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.7, textAlign: 'right' }}>
          {description}
        </Typography>
      )}
    </Card>
  );
}
