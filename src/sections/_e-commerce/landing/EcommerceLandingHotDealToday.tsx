import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
import { EcommerceProductItemHot } from '../product/item';
// types
import { IShopProduct } from 'src/types/shop';

// ----------------------------------------------------------------------

type Props = {
  products: IShopProduct[];
};

export default function EcommerceLandingHotDealToday({ products }: Props) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const carouselRef = useRef<Carousel | null>(null);

  const slidesToShow = Math.min(products.length, 6);

  const carouselSettings = {
    dots: true,
    arrows: false,
    infinite: products.length > 6,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: slidesToShow || 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: { mt: 8, ...(isMdUp && { display: 'none' }) },
    }),
    responsive: [
      { 
        breakpoint: theme.breakpoints.values.md, 
        settings: { 
          slidesToShow: Math.min(products.length, 3), 
          slidesToScroll: Math.min(products.length, 3) 
        } 
      },
      { 
        breakpoint: theme.breakpoints.values.sm, 
        settings: { 
          slidesToShow: Math.min(products.length, 2), 
          slidesToScroll: Math.min(products.length, 2) 
        } 
      },
    ],
  };

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={3}
        sx={{ mb: 8 }}
      >
        <Typography variant="h3" sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
          Offres Spéciales du Jour
        </Typography>

        {isMdUp && products.length > 6 && (
          <CarouselArrows
            onNext={() => carouselRef.current?.slickNext()}
            onPrev={() => carouselRef.current?.slickPrev()}
            flexGrow={1}
            spacing={2}
            justifyContent="flex-end"
          />
        )}
      </Stack>

      <Carousel ref={carouselRef} {...carouselSettings}>
        {products.map((product) => (
          <Box key={product.id} sx={{ py: 0.5, px: { xs: 1, md: 1.5 } }}>
            <EcommerceProductItemHot product={product} hotProduct />
          </Box>
        ))}
      </Carousel>

      {!products.length && (
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', py: 5 }}>
          Aucune offre flash disponible pour le moment.
        </Typography>
      )}
    </Container>
  );
}
