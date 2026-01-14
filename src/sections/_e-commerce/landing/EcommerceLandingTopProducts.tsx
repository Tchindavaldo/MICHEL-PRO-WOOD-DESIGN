// @mui
import { Box, Typography, Container, Button } from '@mui/material';
import NextLink from 'next/link';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
// _mock
import { _products } from 'src/_mock';
//
import { EcommerceProductItemHot, EcommerceProductItemTop } from '../product/item';

// ----------------------------------------------------------------------

// types
import { IProductItemProps } from 'src/types/product';

type Props = {
  products: IProductItemProps[];
};

export default function EcommerceLandingTopProducts({ products }: Props) {
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
        {products.slice(4, 8).map((product) => (
          <EcommerceProductItemHot key={product.id} product={product} />
        ))}
      </Box>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <EcommerceProductItemTop variant="large" product={products[6]} />

        <Box
          gap={3}
          display="grid"
          gridTemplateRows={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <EcommerceProductItemTop product={products[4]} />
          <EcommerceProductItemTop product={products[10]} />
        </Box>
      </Box>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Button
          component={NextLink}
          href={paths.eCommerce.products}
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
