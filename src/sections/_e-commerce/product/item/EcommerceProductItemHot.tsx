// next
import NextLink from 'next/link';
import { parseISO, isValid } from 'date-fns';
// @mui
import { Theme } from '@mui/material/styles';
import { Stack, Paper, Typography, LinearProgress, SxProps, Link, Box } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// types
import { IShopProduct } from 'src/types/shop';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
//
import { ProductPrice, ProductCountdownBlock } from '../../components';

// ----------------------------------------------------------------------

type Props = {
  product: IShopProduct;
  hotProduct?: boolean;
  sx?: SxProps<Theme>;
};

export default function EcommerceProductItemHot({ product, hotProduct = false, sx }: Props) {
  // Check for individual expiry date
  const expiryDate = product.hot_deal_expires_at ? parseISO(product.hot_deal_expires_at) : null;
  const showCountdown = hotProduct && expiryDate && isValid(expiryDate);

  return (
    <Link component={NextLink} href={`/e-commerce/product/${product.id}`} color="inherit" underline="none">
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.default',
          transition: (theme) =>
            theme.transitions.create('background-color', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.shortest,
            }),
          '&:hover': {
            bgcolor: 'background.neutral',
          },
          ...sx,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Image
            ratio="1/1"
            src={product.coverImg}
            sx={{
              mb: 2,
              borderRadius: 1.5,
              bgcolor: 'background.neutral',
            }}
          />
          
          {showCountdown && (
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 16, 
                left: 8, 
                right: 8,
                bgcolor: (theme) => `rgba(0,0,0,0.6)`,
                borderRadius: 1,
                p: 0.5,
              }}
            >
              <ProductCountdownBlock 
                expired={expiryDate!} 
                sx={{ 
                  justifyContent: 'center',
                  '& .value': { color: '#FFF', typography: 'caption', width: 20, height: 20 },
                  '& .separator': { color: '#FFF', typography: 'caption', mx: 0.2 },
                  '& .label': { display: 'none' }
                }} 
              />
            </Box>
          )}
        </Box>

        <Stack spacing={0.5}>
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.name}
          </TextMaxLine>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ProductPrice
              price={product.price}
              priceSale={product.priceSale}
              sx={{
                ...(hotProduct && {
                  color: 'error.main',
                }),
              }}
            />
            {product.rating > 0 && (
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                ⭐ {product.rating}
              </Typography>
            )}
          </Stack>
        </Stack>

        {hotProduct && (
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <LinearProgress
              color="inherit"
              variant="determinate"
              value={(product.sold / (product.inStock || 100)) * 100}
              sx={{ width: 1, height: 4 }}
            />

            <Typography
              variant="caption"
              sx={{ flexShrink: 0, color: 'text.disabled' }}
            >{`${product.sold} Vendu`}</Typography>
          </Stack>
        )}
      </Paper>
    </Link>
  );
}
