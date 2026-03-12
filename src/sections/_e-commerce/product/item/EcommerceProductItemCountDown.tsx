import { parseISO, isValid } from 'date-fns';
// next
import NextLink from 'next/link';
// @mui
import { Theme, alpha, useTheme } from '@mui/material/styles';
import { Typography, Stack, SxProps, Link, Box } from '@mui/material';
// utils
import { filterStyles } from 'src/utils/cssStyles';
import { fCurrency } from 'src/utils/formatNumber';
// types
import { IShopProduct } from 'src/types/shop';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
//
import { ProductCountdownBlock, ProductPrice } from '../../components';


// ----------------------------------------------------------------------

type Props = {
  product: IShopProduct;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  hideCountdown?: boolean;
  sx?: SxProps<Theme>;
};

export default function EcommerceProductItemCountDown({ 
  product, 
  color = 'primary', 
  hideCountdown = false,
  sx 
}: Props) {
  const theme = useTheme();

  const expiryDate = product.hot_deal_expires_at ? parseISO(product.hot_deal_expires_at) : null;
  const showCountdown = !hideCountdown && expiryDate && isValid(expiryDate);

  return (
    <Link component={NextLink} href={`/e-commerce/product/${product.id}`} color="inherit" underline="none">
      <Stack
        spacing={3}
        sx={{
          p: 3,
          borderRadius: 2,
          color: `${color}.darker`,
          bgcolor: `${color}.lighter`,
          transition: theme.transitions.create(['background-color', 'color'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.shortest,
          }),
          '&:hover': {
            color: `${color}.lighter`,
            bgcolor: `${color}.main`,
            '& .price-text': { color: 'inherit' }
          },
          ...sx,
        }}
      >
        <Image
          ratio="1/1"
          src={product.coverImg}
          sx={{
            ...filterStyles(
              `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`
            ),
          }}
        />

        <Stack spacing={1} sx={{ textAlign: 'center' }}>
          <TextMaxLine variant="subtitle2" sx={{ opacity: 0.72 }}>
            {product.name}
          </TextMaxLine>

          <ProductPrice 
            price={product.price} 
            priceSale={product.priceSale} 
            expiresAt={product.hot_deal_expires_at}
            sx={{ typography: 'h5', justifyContent: 'center' }} 
          />

          <Typography variant="caption" sx={{ opacity: 0.64 }}>
            {product.sold} vendus
          </Typography>



        </Stack>

        {showCountdown && (
          <ProductCountdownBlock 
            expired={expiryDate!} 
            sx={{
              '& .value': { bgcolor: 'background.paper', color: 'text.primary' },
              '& .label': { color: 'inherit', opacity: 0.8 }
            }}
          />
        )}
      </Stack>
    </Link>
  );
}

