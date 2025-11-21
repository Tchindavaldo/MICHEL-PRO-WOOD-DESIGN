import { useState, useRef } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Container, Typography, Stack, Fab } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Iconify from 'src/components/iconify';
// data
import { HOME_VIDEOS } from 'src/assets/data/michel-pro-wood/videos-link';
import { HERO_IMAGES } from 'src/assets/data/michel-pro-wood/images-link';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 100%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  maxWidth: 564,
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    left: 0,
    right: 0,
    zIndex: 9,
    position: 'absolute',
    color: theme.palette.common.white,
  },
}));

const StyledVideo = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

// ----------------------------------------------------------------------

export default function MarketingAboutOurVision() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <Container>
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <StyledTypography
          variant="h2"
          sx={{
            mb: 5,
            top: { md: 80 },
          }}
        >
          Notre Vision
        </StyledTypography>

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'relative', width: 1, borderRadius: 2, overflow: 'hidden' }}
        >
          <Fab
            color="primary"
            onClick={handlePlayPause}
            sx={{
              zIndex: 9,
              position: 'absolute',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Iconify icon={isPlaying ? 'carbon:pause' : 'carbon:play'} width={24} />
          </Fab>

          <StyledOverlay />

          <StyledVideo
            ref={videoRef}
            src={HOME_VIDEOS.entreprise}
            poster={HERO_IMAGES[2]}
            loop
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            style={{
              aspectRatio: '16/9',
            }}
          />
        </Stack>

        <StyledTypography
          variant="h5"
          sx={{
            mt: 5,
            bottom: { md: 80 },
            opacity: { md: 0.72 },
          }}
        >
          Former une nouvelle génération de jeunes artisans qualifiés et transformer le secteur bois 
          camerounais par l'excellence, l'innovation et le savoir-faire.
        </StyledTypography>
      </Stack>
    </Container>
  );
}
