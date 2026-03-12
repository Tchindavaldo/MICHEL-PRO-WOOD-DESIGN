// next
import NextLink from 'next/link';
// @mui
import { Stack, Box, StackProps, Fab, Link } from '@mui/material';
// routes
// types
import { IShopProduct } from 'src/types/shop';

// components
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
//
import { ProductRating, ProductPrice } from '../../components';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  product: IShopProduct;
}


export default function EcommerceProductViewGridItem({ product, sx, ...other }: Props) {
    return (
    <Stack
      sx={{
        position: 'relative',
        height: '100%', // Ensure equal height
        '&:hover .add-to-cart': {
          opacity: 1,
        },
        ...sx,
      }}
      {...other}
    >
      {product.label === 'new' && (
        <Label variant="filled" color="primary" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          NEW
        </Label>
      )}

      <Box sx={{ position: 'relative', mb: 2 }}>
        <Fab
          component={NextLink}
          href={`/e-commerce/product/${product.id}`}
          className="add-to-cart"
          color="primary"
          size="medium"
          sx={{
            right: 8,
            zIndex: 9,
            bottom: 8,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.shortest,
              }),
          }}
        >
          <Iconify icon="carbon:shopping-cart-plus" />
        </Fab>

        <Image
          src={product.coverImg}
          ratio="1/1"
          sx={{
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
          {product.category}
        </TextMaxLine>

        <Link component={NextLink} href={`/e-commerce/product/${product.id}`} color="inherit">
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.name}
          </TextMaxLine>
        </Link>

        <ProductPrice price={product.price} priceSale={product.priceSale} expiresAt={product.hot_deal_expires_at} />

        <ProductRating rating={product.rating} label={`${product.sold} vendus`} />
      </Stack>
    </Stack>
  );
}
