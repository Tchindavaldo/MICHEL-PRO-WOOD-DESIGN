// ... imports
import { useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Stack, Container, Typography, Button, Fab, Unstable_Grid2 as Grid, Box } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/iconify';
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
// assets
import { HERO_IMAGES } from 'src/assets/data/michel-pro-wood/images-link';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    ...CarouselDots({
      sx: {
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 64,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
      },
    }),
  };

  const slides = [
    {
      id: 1,
      title: 'Michel Pro Wood Design – Des créations en bois uniques',
      description:
        'Michel Pro Wood Design est une entreprise spécialisée dans la menuiserie, l’ébénisterie, la conception et la fabrication assistée par ordinateur (CFAO), les constructions bois et la formation professionnelle.',
      image: HERO_IMAGES[0],
      hasVideo: true,
    },
    {
      id: 2,
      title: 'Notre Mission',
      description:
        'Transformer le secteur bois camerounais en intégrant : l’artisanat traditionnel, la technologie numérique, la modélisation 3D, l’usinage CNC, et un système de gestion moderne.',
      image: HERO_IMAGES[1],
      hasVideo: false,
    },
    {
      id: 3,
      title: 'Production & Formation',
      description:
        'Nous produisons des ouvrages en bois de haute qualité, durables, esthétiques et personnalisés, tout en formant une nouvelle génération de jeunes artisans qualifiés à travers notre centre de formation technique en menuiserie, ébénisterie, construction bois et usinage CNC.',
      image: HERO_IMAGES[2],
      hasVideo: false,
    },
  ];

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <StyledRoot>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              ...bgGradient({
                color: alpha(theme.palette.common.black, 0.6), // Reduced opacity
                imgUrl: slide.image,
              }),
            }}
          >
            <Container
              sx={{
                height: { md: '100vh' },
                display: { md: 'flex' },
                alignItems: { md: 'center' },
              }}
            >
              <Grid container columnSpacing={{ xs: 0, md: 10 }}>
                <Grid
                  xs={12}
                  md={6}
                  lg={5}
                  sx={{
                    textAlign: { xs: 'center', md: 'left' },
                    color: 'common.white',
                  }}
                >
                  <Typography variant="overline" sx={{ color: 'secondary.light' }}>
                    Michel Pro Wood Design
                  </Typography>

                  <Typography variant="h2" sx={{ my: 3, color: 'common.white' }}>
                    {slide.title}
                  </Typography>

                  <Typography sx={{ color: 'common.white', mb: 5, opacity: 0.8 }}>
                    {slide.description}
                  </Typography>

                  <Stack
                    spacing={3}
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'center', md: 'unset' }}
                    justifyContent={{ xs: 'center', md: 'unset' }}
                  >
                    <Button variant="contained" color="primary" size="large">
                      Obtenir un devis
                    </Button>

                    {slide.hasVideo && (
                      <Stack direction="row" alignItems="center" sx={{ typography: 'h6', cursor: 'pointer', color: 'common.white' }}>
                        <Fab size="medium" color="info" sx={{ mr: 1 }}>
                          <Iconify width={24} icon="carbon:play" />
                        </Fab>
                        See Our Work
                      </Stack>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Box>
        ))}
      </Carousel>

      <CarouselArrows
        onNext={handleNext}
        onPrev={handlePrev}
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
          position: 'absolute',
          width: '100%',
          justifyContent: 'space-between',
          px: 2,
          '& .MuiIconButton-root': {
            mt: -5,
            width: 48,
            height: 48,
            opacity: 0.48,
            color: 'common.white',
            cursor: 'pointer',
            borderRadius: '50%',
            bgcolor: 'action.hover',
            transition: theme.transitions.create('opacity'),
            '&:hover': { opacity: 1, bgcolor: 'action.selected' },
          },
        }}
      />
    </StyledRoot>
  );
}
