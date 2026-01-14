// @mui
import { Box, Typography, Container, Unstable_Grid2 as Grid, Button } from '@mui/material';
import NextLink from 'next/link';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
// _mock
import { _products } from 'src/_mock';
//
import { EcommerceProductItemHot, EcommerceProductItemCountDown } from '../product/item';

// ----------------------------------------------------------------------

// types
import { IProductItemProps } from 'src/types/product';

// ----------------------------------------------------------------------

type Props = {
  products: IProductItemProps[];
};

export default function EcommerceLandingFeaturedProducts({ products }: Props) {
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
        Produits Vedettes
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} lg={8}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            {products.slice(1, 3).map((product, index) => (
              <EcommerceProductItemCountDown
                key={product.id}
                product={product}
                color={index === 0 ? 'primary' : 'secondary'}
              />
            ))}
          </Box>
        </Grid>

        <Grid xs={12} lg={4}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
          >
            {products.slice(4, 8).map((product) => (
              <EcommerceProductItemHot key={product.id} product={product} />
            ))}
          </Box>
        </Grid>
      </Grid>


    </Container>
  );
}
