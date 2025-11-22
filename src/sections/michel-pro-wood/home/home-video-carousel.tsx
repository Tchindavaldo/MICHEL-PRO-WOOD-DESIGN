import { useRef, useState } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Stack, Container, Typography, Button, Fab, Box, IconButton } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
// assets
import { HOME_VIDEOS } from 'src/assets/data/michel-pro-wood/videos-link';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

type SlideProps = {
  slide: {
    id: number;
    title: string;
    description: string;
    video: string;
    ctaText: string;
    ctaLink: string;
  };
};

function VideoSlide({ slide }: SlideProps) {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', mx: 2 }}>
      <Box
        component="video"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        sx={{
          width: '100%',
          height: '100%',
          minHeight: { xs: 400, md: 600 },
          objectFit: 'cover',
          display: 'block',
        }}
      >
        <source src={slide.video} type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: alpha(theme.palette.common.black, 0.4),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          p: { xs: 3, md: 5 },
        }}
      >
        <Stack spacing={2} sx={{ color: 'common.white', maxWidth: 600, textAlign: 'left', alignItems: 'flex-start' }}>
          <Typography variant="h3" sx={{ color: 'common.white', fontSize: { xs: '1.5rem', md: '3rem' } }}>
            {slide.title}
          </Typography>

          <Typography sx={{ color: 'common.white', opacity: 0.8, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
            {slide.description}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
            <Button variant="contained" color="primary" href={slide.ctaLink}>
              {slide.ctaText}
            </Button>
            
            <IconButton onClick={handlePlayPause} sx={{ color: 'common.white' }}>
              <Iconify icon={isPlaying ? 'carbon:pause-filled' : 'carbon:play-filled'} width={32} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default function HomeVideoCarousel() {
  const theme = useTheme();
  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...CarouselDots({
      sx: {
        mt: 3,
      },
    }),
  };

  const slides = [
    {
      id: 1,
      title: 'Fabrication',
      description: 'Découvrez nos processus de fabrication assistée par ordinateur et notre savoir-faire artisanal.',
      video: HOME_VIDEOS.fabrication,
      ctaText: 'Voir toutes les vidéos',
      ctaLink: '#',
    },
    {
      id: 2,
      title: 'Entreprise',
      description: 'Plongez au cœur de Michel Pro Wood Design et découvrez notre vision et notre équipe.',
      video: HOME_VIDEOS.entreprise,
      ctaText: 'En savoir plus',
      ctaLink: '#',
    },
    {
      id: 3,
      title: 'Formations',
      description: 'Formez-vous aux métiers du bois avec nos programmes complets en menuiserie et CFAO.',
      video: HOME_VIDEOS.formation,
      ctaText: 'Voir toutes les vidéos',
      ctaLink: '#',
    },
    {
      id: 4,
      title: 'Tutos',
      description: 'Apprenez des techniques et astuces avec nos tutoriels vidéos exclusifs.',
      video: HOME_VIDEOS.tutos,
      ctaText: 'Voir toutes les vidéos',
      ctaLink: '#',
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
      <Container>
        <Box sx={{ position: 'relative' }}>
          <Carousel ref={carouselRef} {...carouselSettings}>
            {slides.map((slide) => (
              <VideoSlide key={slide.id} slide={slide} />
            ))}
          </Carousel>

          <CarouselArrows
            onNext={handleNext}
            onPrev={handlePrev}
            sx={{
              top: 'auto',
              bottom: -8,
              transform: 'none',
              position: 'absolute',
              width: '100%',
              justifyContent: 'center',
              gap: 10, // Gap to fit dots (approx 80px)
              zIndex: 9,
              pointerEvents: 'none',
              '& .MuiIconButton-root': {
                pointerEvents: 'auto',
                width: 32,
                height: 32,
                color: 'common.white',
                bgcolor: alpha(theme.palette.grey[900], 0.48),
                '&:hover': { bgcolor: theme.palette.grey[900] },
              },
            }}
          />
        </Box>
      </Container>
    </StyledRoot>
  );
}
