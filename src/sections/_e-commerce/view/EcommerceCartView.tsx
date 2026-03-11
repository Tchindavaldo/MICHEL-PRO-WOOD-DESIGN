// next
import NextLink from 'next/link';
// @mui
import { Container, Typography, Button, Unstable_Grid2 as Grid } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
// context
import { useCart } from 'src/context/CartContext';
//
import { EcommerceHeader } from '../layout';
import { EcommerceCartList, EcommerceCartSummary } from '../cart';

// ----------------------------------------------------------------------

export default function EcommerceCartView() {
  const { cart, subtotal } = useCart();

  const tax = subtotal * 0.07;
  const shipping = 0;
  const discount = 0;
  const total = subtotal + tax + shipping - discount;

  return (
    <>
      <EcommerceHeader />

      <Container
        sx={{
          overflow: 'hidden',
          pt: 5,
          pb: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h3" sx={{ mb: 5 }}>
          Shopping Cart
        </Typography>

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={8}>
            <EcommerceCartList products={cart} />
          </Grid>

          <Grid xs={12} md={4}>
            <EcommerceCartSummary
              tax={tax}
              total={total}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
            />
          </Grid>
        </Grid>

        <Button
          component={NextLink}
          href={paths.eCommerce.products}
          color="inherit"
          startIcon={<Iconify icon="carbon:chevron-left" />}
          sx={{ mt: 3 }}
        >
          Continue Shopping
        </Button>
      </Container>
    </>
  );
}
