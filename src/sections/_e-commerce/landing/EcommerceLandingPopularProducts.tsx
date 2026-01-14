import { useState } from 'react';
// @mui
import { Box, Typography, Container, Tabs, Tab, Button } from '@mui/material';
import NextLink from 'next/link';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
// _mock
import { _products } from 'src/_mock';
//
import { EcommerceProductItemBestSellers } from '../product/item';

// ----------------------------------------------------------------------

const TABS = ['Produits Vedettes', 'Mieux Notés', 'En Promotion'];

// ----------------------------------------------------------------------

// types
import { IProductItemProps } from 'src/types/product';

type Props = {
  products: IProductItemProps[];
};

export default function EcommerceLandingPopularProducts({ products }: Props) {
  const [tab, setTab] = useState('Produits Vedettes');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Produits Populaires
      </Typography>

      <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
        sx={{ my: 5 }}
      >
        {TABS.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
      >
        {products.slice(0, 8).map((product) => (
          <EcommerceProductItemBestSellers key={product.id} product={product} />
        ))}
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
