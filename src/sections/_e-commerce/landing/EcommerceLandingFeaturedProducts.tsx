import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Container, Unstable_Grid2 as Grid } from '@mui/material';
// components
import Carousel, { CarouselArrows } from 'src/components/carousel';
import { EcommerceProductItemHot, EcommerceProductItemCountDown } from '../product/item';
// types
import { IShopProduct } from 'src/types/shop';

// ----------------------------------------------------------------------

type Props = {
  products: IShopProduct[];
};

// Fonction utilitaire pour grouper les produits par 4
function chunkArray(array: any[], size: number) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

export default function EcommerceLandingFeaturedProducts({ products }: Props) {
  const theme = useTheme();
  const carouselRef = useRef<Carousel | null>(null);

  const featuredLarge = products.slice(0, 2); 
  const featuredSmall = products.slice(2); 
  
  // On groupe les produits restants par packs de 4 pour le carrousel
  const chunkedSmall = chunkArray(featuredSmall, 4);

  const carouselSettings = {
    arrows: false,
    dots: chunkedSmall.length > 1,
    slidesToShow: 1, // On slide pack par pack
    slidesToScroll: 1,
    infinite: chunkedSmall.length > 1,
    adaptiveHeight: true,
    rtl: Boolean(theme.direction === 'rtl'),
  };

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
        <Typography variant="h3" sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
          Produits Vedettes
        </Typography>

        {chunkedSmall.length > 1 && (
          <CarouselArrows
            onNext={() => carouselRef.current?.slickNext()}
            onPrev={() => carouselRef.current?.slickPrev()}
          />
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Colonne de gauche : 2 Grands produits (fixes) */}
        <Grid xs={12} lg={8}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            {featuredLarge.map((product, index) => (
              <EcommerceProductItemCountDown
                key={product.id}
                product={product}
                color={index === 0 ? 'primary' : 'secondary'}
                hideCountdown
              />
            ))}
          </Box>
        </Grid>

        {/* Colonne de droite : Grille de 4 qui slide s'il y en a plus */}
        <Grid xs={12} lg={4}>
          <Carousel ref={carouselRef} {...carouselSettings}>
            {chunkedSmall.map((chunk, chunkIndex) => (
              <Box key={chunkIndex} sx={{ pb: 1 }}>
                <Box
                  gap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(2, 1fr)',
                  }}
                >
                  {chunk.map((product) => (
                    <EcommerceProductItemHot key={product.id} product={product} />
                  ))}
                </Box>
              </Box>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Container>
  );
}
