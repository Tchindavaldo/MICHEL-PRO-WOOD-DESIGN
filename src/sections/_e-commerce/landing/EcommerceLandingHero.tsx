import { useRef } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { bgGradient } from 'src/utils/cssStyles';
import Carousel, { CarouselDots } from 'src/components/carousel';
import { EcommerceProductItemHero } from '../product/item';

// ----------------------------------------------------------------------

type Banner = {
  id: string;
  title: string;
  caption: string;
  label: string;
  coverImg: string;
  btnText?: string;
  btnLink?: string;
};

type Props = {
  banners: Banner[];
};

export default function EcommerceLandingHero({ banners }: Props) {
  const theme = useTheme();
  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    fade: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 40,
        mx: 'auto',
        position: 'absolute',
      },
    }),
  };

  return (
    <Container sx={{ pt: { xs: 5, md: 8 } }}>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_1.jpg',
          }),
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Carousel ref={carouselRef} {...carouselSettings}>
          {banners.map((banner) => (
            <EcommerceProductItemHero key={banner.id} product={banner} />
          ))}
        </Carousel>
      </Box>
    </Container>
  );
}
