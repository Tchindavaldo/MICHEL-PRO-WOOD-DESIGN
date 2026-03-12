import { useState, useMemo } from 'react';
// @mui
import { Box, Typography, Container, Tabs, Tab, Button } from '@mui/material';
import NextLink from 'next/link';
import Iconify from 'src/components/iconify';
// types
import { IShopProduct } from 'src/types/shop';
//
import { EcommerceProductItemBestSellers } from '../product/item';

// ----------------------------------------------------------------------

const TABS = ['Produits Vedettes', 'Mieux Notés', 'En Promotion'];

// ----------------------------------------------------------------------

type Props = {
  products: IShopProduct[];
};

export default function EcommerceLandingPopularProducts({ products }: Props) {
  const [tab, setTab] = useState('Produits Vedettes');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const filteredProducts = useMemo(() => {
    if (tab === 'Mieux Notés') {
      return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
    }
    if (tab === 'En Promotion') {
      return products.filter((p) => p.priceSale && p.priceSale > 0).slice(0, 8);
    }
    // Par défaut : Vedettes (ordre du backend ou meilleures ventes)
    return products.slice(0, 8);
  }, [products, tab]);

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
        {filteredProducts.map((product) => (
          <EcommerceProductItemBestSellers key={product.id} product={product} />
        ))}
        
        {filteredProducts.length === 0 && (
          <Typography variant="body1" sx={{ color: 'text.secondary', gridColumn: '1/-1', textAlign: 'center', py: 5 }}>
            Pas de produits disponibles dans cette catégorie pour le moment.
          </Typography>
        )}
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
