// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Stack, Typography, Box } from '@mui/material';
// types
import { IBrandProps } from 'src/types/brand';
// components
import Image from 'src/components/image';
import Carousel from 'src/components/carousel';

// ----------------------------------------------------------------------

type Props = {
  brands: IBrandProps[];
};

export default function OurClientsMarketing({ brands }: Props) {
  const theme = useTheme();

  const carouselSettings = {
    speed: 5000,
    arrows: false,
    autoplay: true,
    slidesToShow: 4, // Reduced from 6 to 4 to give more space for text
    slidesToScroll: 1,
    cssEase: 'linear',
    autoplaySpeed: 5000,
    infinite: brands.length > 4, // Only loop if there are enough items
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 3 }, // 3 on tablet
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1, centerMode: true }, // 1 on mobile with center mode
      },
    ],
  };

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
      }}
    >
      <Carousel {...carouselSettings}>
        {brands.map((brand) => (
          <Box 
            key={brand.id} 
            sx={{ 
              display: 'flex !important', // Force flex to override slick carousel styles
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              px: 1, 
              height: '100%',
              width: '100%'
            }}
          >
            <Box sx={{ width: 40, height: 40, flexShrink: 0 }}>
              <Image
                src={brand.image}
                alt={brand.name}
                sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'text.secondary',
                whiteSpace: 'nowrap',
              }}
            >
              {brand.name}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}
