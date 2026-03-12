import { useRef } from 'react';
import { add, parseISO, isValid } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
import { ProductCountdownBlock } from '../components';
import { EcommerceProductItemHot } from '../product/item';

// ----------------------------------------------------------------------

type Product = {
  id: string;
  name: string;
  price: number;
  priceSale?: number;
  coverImg: string;
  sold: number;
  inStock: number;
  hot_deal_expires_at?: string | null;
  [key: string]: any;
};

type Props = {
  products: Product[];
};

// Parse expiry from any product (look for the earliest, or use default)
function getSharedExpiry(products: Product[]): Date {
  for (const p of products) {
    if (p.hot_deal_expires_at) {
      const d = parseISO(p.hot_deal_expires_at);
      if (isValid(d)) return d;
    }
  }
  return add(new Date(), { hours: 1, minutes: 30 });
}

export default function EcommerceLandingHotDealToday({ products }: Props) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const carouselRef = useRef<Carousel | null>(null);

  const slidesToShow = Math.min(products.length, 6);

  const carouselSettings = {
    dots: true,
    arrows: false,
    infinite: products.length > 6, // Désactive le loop si peu de produits
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


  const expiry = getSharedExpiry(products);

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

        {isMdUp && (

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
    </Container>
  );
}
