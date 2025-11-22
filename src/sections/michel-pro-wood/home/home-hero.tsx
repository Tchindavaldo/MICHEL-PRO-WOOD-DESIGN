// ... imports
import { useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Stack, Container, Typography, Button, Fab, Unstable_Grid2 as Grid, Box, IconButton } from '@mui/material';
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
        mx: 2, // Margin for dots
      },
    }),
    appendDots: (dots: any) => (
      <Box
        component="ul"
        sx={{
          zIndex: 9,
          bottom: 64,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          color: 'primary.main',
          '& li': {
            width: 18,
            height: 18,
            opacity: 0.32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&.slick-active': {
              opacity: 1,
            },
          },
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            width: 40,
            height: 40,
            color: 'common.white',
            bgcolor: alpha(theme.palette.grey[900], 0.48),
            '&:hover': { bgcolor: theme.palette.grey[900] },
          }}
        >
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>

        {dots}

        <IconButton
          onClick={handleNext}
          sx={{
            width: 40,
            height: 40,
            color: 'common.white',
            bgcolor: alpha(theme.palette.grey[900], 0.48),
            '&:hover': { bgcolor: theme.palette.grey[900] },
          }}
        >
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </IconButton>
      </Box>
    ),
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
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid container columnSpacing={{ xs: 0, md: 10 }}>
                <Grid
                  xs={12}
                  md={8}
                  lg={6}
                  sx={{
                    textAlign: 'left',
                    color: 'common.white',
                  }}
                >
                  <Typography variant="overline" sx={{ color: 'secondary.light' }}>
                    Michel Pro Wood Design
                  </Typography>

                  <Typography variant="h2" sx={{ my: 3, color: 'common.white', fontSize: { xs: '2rem', md: '3.75rem' } }}>
                    {slide.title}
                  </Typography>

                  <Typography sx={{ color: 'common.white', mb: 5, opacity: 0.8, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                    {slide.description}
                  </Typography>

                  <Stack
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Button variant="contained" color="primary" size="large">
                      Obtenir un devis
                    </Button>

                    {slide.hasVideo && (
                      <Stack direction="row" alignItems="center" sx={{ typography: 'h6', cursor: 'pointer', color: 'common.white' }}>
                        <Fab size="medium" color="info" sx={{ mr: 1 }}>
                          <Iconify width={24} icon="carbon:play" />
                        </Fab>
                        Voir Vidéo
                      </Stack>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Box>
        ))}
      </Carousel>
    </StyledRoot>
  );
}
