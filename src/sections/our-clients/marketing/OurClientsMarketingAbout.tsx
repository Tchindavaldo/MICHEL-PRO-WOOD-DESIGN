// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Stack, Container, Box } from '@mui/material';
// types
import { IBrandProps } from 'src/types/brand';
// components
import Image from 'src/components/image';
import Carousel from 'src/components/carousel';

// ----------------------------------------------------------------------

type Props = {
  brands: IBrandProps[];
};

export default function OurClientsMarketingAbout({ brands }: Props) {
  const theme = useTheme();

  const carouselSettings = {
    speed: 5000,
    arrows: false,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: 'linear',
    autoplaySpeed: 5000,
    infinite: brands.length > 4,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1, centerMode: true },
      },
    ],
  };

  return (
    <Container
      sx={{
        pb: { xs: 7, md: 11 },
      }}
    >
      <Stack alignItems="center" spacing={5}>
        <Typography variant="h2">Nos Partenaires</Typography>

        <Box sx={{ width: '100%' }}>
          <Carousel {...carouselSettings}>
            {brands.map((brand) => (
              <Box 
                key={brand.id} 
                sx={{ 
                  display: 'flex !important',
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
        </Box>
      </Stack>
    </Container>
  );
}
