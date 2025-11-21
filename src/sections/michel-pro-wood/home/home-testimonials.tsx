import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box, Unstable_Grid2 as Grid } from '@mui/material';
// components
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
// _mock
import _mock from 'src/_mock';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    id: _mock.id(1),
    name: 'Sophie M.',
    role: 'Propriétaire',
    avatar: _mock.image.avatar(1),
    rating: 5,
    review:
      'J\'ai commandé une cuisine sur mesure et le résultat est époustouflant. La qualité du bois et la finition sont impeccables. Merci à toute l\'équipe pour leur professionnalisme.',
  },
  {
    id: _mock.id(2),
    name: 'Jean-Pierre K.',
    role: 'Ancien Apprenant',
    avatar: _mock.image.avatar(2),
    rating: 5,
    review:
      'La formation en menuiserie m\'a permis d\'acquérir des compétences solides. Les formateurs sont passionnés et très pédagogues. Je recommande vivement !',
  },
  {
    id: _mock.id(3),
    name: 'Paul D.',
    role: 'Architecte',
    avatar: _mock.image.avatar(3),
    rating: 5,
    review:
      'Service de découpe CNC précis et rapide. Idéal pour nos prototypes. Une collaboration fructueuse depuis plusieurs mois.',
  },
  {
    id: _mock.id(4),
    name: 'Marie L.',
    role: 'Décoratrice',
    avatar: _mock.image.avatar(4),
    rating: 4,
    review:
      'Des pièces uniques qui ont sublimé mon intérieur. Le bois est travaillé avec un véritable savoir-faire artistique.',
  },
];

// ----------------------------------------------------------------------

export default function HomeTestimonials() {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        mt: { xs: 8, md: 10 },
      },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ bgcolor: 'background.neutral', overflow: 'hidden' }}>
      <Container
        sx={{
          position: 'relative',
          py: { xs: 10, md: 15 },
        }}
      >
        <Stack spacing={2} sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Témoignages
          </Typography>

          <Typography variant="h2">Ils aiment notre travail</Typography>
        </Stack>

        <CarouselArrows
          onNext={handleNext}
          onPrev={handlePrev}
          leftButtonProps={{ sx: { display: { xs: 'none', md: 'block' } } }}
          rightButtonProps={{ sx: { display: { xs: 'none', md: 'block' } } }}
        >
          <Grid container spacing={10} justifyContent="center">
            <Grid xs={12} md={8}>
              <Carousel ref={carouselRef} {...carouselSettings}>
                {TESTIMONIALS.map((testimonial) => (
                  <TestimonialItem key={testimonial.id} testimonial={testimonial} />
                ))}
              </Carousel>
            </Grid>
          </Grid>
        </CarouselArrows>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TestimonialItemProps = {
  testimonial: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    review: string;
  };
};

function TestimonialItem({ testimonial }: TestimonialItemProps) {
  const { name, role, rating, review, avatar } = testimonial;

  return (
    <Stack
      spacing={5}
      sx={{
        textAlign: 'center',
        mx: 'auto',
        maxWidth: { xs: 1, md: 0.8 },
      }}
    >
      <Stack direction="row" justifyContent="center">
        {[...Array(5)].map((_, index) => (
          <Iconify
            key={index}
            icon="carbon:star-filled"
            sx={{
              color: index < rating ? 'warning.main' : 'text.disabled',
            }}
          />
        ))}
      </Stack>

      <Typography variant="h4" sx={{ lineHeight: 1.5 }}>
        {review}
      </Typography>

      <Stack alignItems="center" spacing={2}>
        <Image
          alt={name}
          src={avatar}
          sx={{ width: 64, height: 64, borderRadius: '50%' }}
        />

        <Stack spacing={0.5}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {role}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
