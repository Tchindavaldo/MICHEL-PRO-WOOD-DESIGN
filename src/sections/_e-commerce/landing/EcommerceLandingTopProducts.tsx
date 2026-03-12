// @mui
import { Box, Typography, Container, Button } from '@mui/material';
import NextLink from 'next/link';
import Iconify from 'src/components/iconify';
// types
import { IShopProduct } from 'src/types/shop';
//
import { EcommerceProductItemHot, EcommerceProductItemTop } from '../product/item';

// ----------------------------------------------------------------------

type Props = {
  products: IShopProduct[];
};

export default function EcommerceLandingTopProducts({ products }: Props) {
  // On trie par ventes pour cette section
  const topSellers = [...products].sort((a, b) => b.sold - a.sold);
  
  const gridProducts = topSellers.slice(0, 4);
  const largeProduct = topSellers[4] || products[0];
  const sideProduct1 = topSellers[5] || products[1];
  const sideProduct2 = topSellers[6] || products[2];

  if (!products.length) return null;

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Meilleures Ventes
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        sx={{ mb: { xs: 3, md: 8 } }}
      >
        {gridProducts.map((product) => (product ? (
          <EcommerceProductItemHot key={product.id} product={product} />
        ) : null))}
      </Box>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {largeProduct && <EcommerceProductItemTop variant="large" product={largeProduct} />}

        <Box
          gap={3}
          display="grid"
          gridTemplateRows={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {sideProduct1 && <EcommerceProductItemTop product={sideProduct1} />}
          {sideProduct2 && <EcommerceProductItemTop product={sideProduct2} />}
        </Box>
      </Box>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Button
          component={NextLink}
          href="/e-commerce/products"
          size="large"
          variant="contained"
          color="primary"
          endIcon={<Iconify icon="carbon:arrow-right" />}
        >
          Voir tous les produits
        </Button>
      </Box>
    </Container>
  );
}
