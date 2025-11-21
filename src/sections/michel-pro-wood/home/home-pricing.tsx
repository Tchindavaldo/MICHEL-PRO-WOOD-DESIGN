import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Container, Typography, Card, Button } from '@mui/material';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';

// ----------------------------------------------------------------------

const PLANS = [
  {
    license: 'Menuiserie Ébénisterie',
    duration: '1 an',
    price: '200 000',
    options: [
      'Certificat de Qualification Professionnelle (CQP)',
      'Formation pratique en atelier',
      'Stage en entreprise garanti',
      'Suivi personnalisé par un mentor',
      'Accès aux outils de base',
    ],
    icon: '/assets/icons/pricing/ic_plan_basic01.svg',
    color: 'primary',
  },
  {
    license: 'Menuiserie Ébénisterie',
    duration: '2 ans',
    price: '300 000',
    options: [
      'Diplôme de Qualification Professionnelle (DQP)',
      'Formation approfondie en design',
      'Projet de fin de formation encadré',
      'Techniques d\'assemblage complexes',
      'Initiation à la gestion d\'atelier',
    ],
    icon: '/assets/icons/pricing/ic_plan_starter01.svg',
    color: 'secondary',
  },
  {
    license: 'Menuiserie Ébénisterie',
    duration: '3 ans',
    price: '350 000',
    options: [
      'Maîtrise complète du métier',
      'Gestion de projet avancée',
      'Formation à l\'entrepreneuriat',
      'Création d\'une collection personnelle',
      'Réseautage professionnel étendu',
    ],
    icon: '/assets/icons/pricing/ic_plan_premium01.svg',
    color: 'warning',
  },
  {
    license: 'Construction Bois',
    duration: '1 an',
    price: '250 000',
    options: [
      'Bases de la charpente traditionnelle',
      'Conception d\'escaliers simples',
      'Éléments de décoration intérieure',
      'Lecture de plans techniques',
      'Sécurité sur les chantiers',
    ],
    icon: '/assets/icons/pricing/ic_plan_basic02.svg',
    color: 'info',
  },
  {
    license: 'Construction Bois',
    duration: '2 ans',
    price: '350 000',
    options: [
      'Techniques de charpente avancées',
      'Conception 3D sur ordinateur',
      'Suivi de chantier et métré',
      'Isolation et étanchéité',
      'Rénovation de structures anciennes',
    ],
    icon: '/assets/icons/pricing/ic_plan_starter02.svg',
    color: 'success',
  },
  {
    license: 'Construction Bois',
    duration: '3 ans',
    price: '400 000',
    options: [
      'Expertise en architecture bois',
      'Eco-construction et matériaux durables',
      'Calcul de structures complexes',
      'Management d\'équipe chantier',
      'Droit de la construction',
    ],
    icon: '/assets/icons/pricing/ic_plan_premium02.svg',
    color: 'error',
  },
  {
    license: 'Usinage CNC',
    duration: '1 an',
    price: '270 000',
    options: [
      'Initiation à la commande numérique',
      'Programmation de base (G-code)',
      'Maintenance 1er niveau des machines',
      'Dessin technique assisté par ordinateur',
      'Contrôle qualité des pièces',
    ],
    icon: '/assets/icons/pricing/ic_plan_basic03.svg',
    color: 'primary',
  },
  {
    license: 'Usinage CNC',
    duration: '2 ans',
    price: '370 000',
    options: [
      'Usinage de formes complexes 3D',
      'Maîtrise des logiciels CAO/FAO',
      'Optimisation des processus de production',
      'Choix des outils et matériaux',
      'Prototypage rapide',
    ],
    icon: '/assets/icons/pricing/ic_plan_starter03.svg',
    color: 'secondary',
  },
  {
    license: 'Usinage CNC',
    duration: '3 ans',
    price: '480 000',
    options: [
      'Expertise en programmation avancée',
      'Gestion de parc machines automatisé',
      'Innovation technologique et R&D',
      'Maintenance préventive et curative',
      'Supervision de production industrielle',
    ],
    icon: '/assets/icons/pricing/ic_plan_premium03.svg',
    color: 'warning',
  },
  {
    license: 'Formation Complète',
    duration: '3 ans',
    price: '800 000',
    options: [
      'Polyvalence totale (Menuiserie, Charpente, CNC)',
      'Excellence artisanale et technologique',
      'Double diplôme possible',
      'Accompagnement à la création d\'entreprise',
      'Accès illimité au FabLab',
    ],
    icon: '/assets/icons/pricing/ic_plan_premium01.svg',
    color: 'error',
  },
];

// ----------------------------------------------------------------------

export default function HomePricing() {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        mt: 8,
      },
    }),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container
      sx={{
        pt: 10,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Stack
        spacing={5}
        alignItems={{ xs: 'center', md: 'flex-end' }}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ md: 'space-between' }}
        sx={{ mb: { xs: 5, md: 10 } }}
      >
        <Stack
          spacing={3}
          sx={{
            maxWidth: 480,
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Nos Tarifs
          </Typography>

          <Typography variant="h2">Plans de Formation</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            À l’issue de la formation et après validation, l’entreprise délivrera : CQP, AQP, DQP ou Attestation de fin de formation.
            <br />
            <br />
            Moyens de paiement : Mobile Money (MTN, Orange), Espèces, Virement bancaire.
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
            <CarouselArrows
              spacing={2}
              onNext={handleNext}
              onPrev={handlePrev}
              leftButtonProps={{ color: 'primary', sx: { color: 'primary.main', opacity: 1 } }}
              rightButtonProps={{ color: 'primary', sx: { color: 'primary.main', opacity: 1 } }}
            />
        </Stack>
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <Carousel ref={carouselRef} {...carouselSettings}>
          {PLANS.map((plan, index) => (
            <Box key={index} sx={{ px: 2, py: 5 }}>
                <PlanCard plan={plan} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

type PlanCardProps = {
  plan: {
    license: string;
    duration: string;
    price: string;
    options: string[];
    icon: string;
    color: string;
  };
};

function PlanCard({ plan }: PlanCardProps) {
  const { license, duration, price, options, icon, color } = plan;

  return (
    <Card
      sx={{
        p: 5,
        pt: 8,
        boxShadow: (theme) => theme.customShadows.z24,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <div>
          <Typography variant="h5" component="div" sx={{ color: 'primary.main', mb: 2, minHeight: 64 }}>
            {license}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="h4" component="span">{`${price} FCFA`}</Typography>
          </Stack>
           <Typography variant="subtitle1" component="span" sx={{ color: 'text.secondary' }}>
              / {duration}
            </Typography>
        </div>

        <Image alt="icon" src={icon} sx={{ width: 64, height: 64 }} />
      </Stack>

      <Stack spacing={2} sx={{ my: 5, flexGrow: 1 }}>
        {options.map((option) => (
          <Stack key={option} direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:checkmark" sx={{ mr: 2, color: 'primary.main' }} /> {option}
          </Stack>
        ))}
      </Stack>

      <Button
        fullWidth
        size="large"
        variant="contained"
        color={color as any}
      >
        S'inscrire
      </Button>
    </Card>
  );
}
