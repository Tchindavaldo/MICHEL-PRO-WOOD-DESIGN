// @mui
import { Stack, Box, StackProps } from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  price: number;
  priceSale?: number;
  expiresAt?: string | null | Date;
}

export default function ProductPrice({ price, priceSale = 0, expiresAt, sx, ...other }: Props) {
  let hasSale = priceSale > 0;

  if (hasSale && expiresAt) {
    const expiryDate = typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt;
    if (expiryDate instanceof Date && !isNaN(expiryDate.getTime())) {
      if (expiryDate.getTime() < Date.now()) {
        hasSale = false;
      }
    }
  }


  return (
    <Stack direction="row" sx={{ typography: 'subtitle1', ...sx }} {...other}>
      {/* Prix Principal (Promo ou prix de base) */}
      <Box component="span" sx={{ fontWeight: '600' }}>
        {hasSale ? fCurrency(priceSale) : fCurrency(price)}
      </Box>


      {/* Ancien Prix barré si promo */}
      {hasSale && (
        <Box
          component="span"
          sx={{
            ml: 1,
            color: 'text.disabled',
            textDecoration: 'line-through',
            fontWeight: 'fontWeightRegular',
            typography: 'body2',
            alignSelf: 'center'
          }}
        >
          {fCurrency(price)}
        </Box>
      )}
    </Stack>
  );
}
