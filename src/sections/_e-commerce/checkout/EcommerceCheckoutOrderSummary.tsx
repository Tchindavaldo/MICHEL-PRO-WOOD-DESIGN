// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  StackProps,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fCurrency, fPercent } from 'src/utils/formatNumber';
// types
import { CartItem } from 'src/context/CartContext';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

type Props = {
  tax: number;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  products?: CartItem[];
  loading?: boolean;
};

export default function EcommerceCheckoutOrderSummary({
  tax,
  total,
  subtotal,
  shipping,
  discount,
  products,
  loading,
}: Props) {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Order Summary </Typography>

      {!!products?.length && (
        <>
          {products.map((product) => (
            <ProductItem key={product.cartId} product={product} />
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(subtotal)} />

        <Row label="Shipping" value={fCurrency(shipping)} />

        <Row label="Discount (15%)" value={`-${fCurrency(discount)}`} />

        <Row label="Tax" value={fPercent(tax)} />
      </Stack>

      <TextField
        hiddenLabel
        placeholder="Discount Code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Apply</Button>
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(total)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <LoadingButton
        size="large"
        variant="contained"
        color="inherit"
        type="submit"
        loading={loading}
      >
        Order Now
      </LoadingButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type ProductItemProps = StackProps & {
  product: CartItem;
};

function ProductItem({ product, ...other }: ProductItemProps) {
  return (
    <Stack direction="row" alignItems="flex-start" {...other}>
      <Image
        src={product.coverUrl}
        sx={{
          mr: 2,
          width: 64,
          height: 64,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
        }}
      />

      <Stack flexGrow={1}>
        <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
          {product.name}
        </TextMaxLine>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {product.woodType} - {product.finish}
        </Typography>

        <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
          {fCurrency(product.price)} (x{product.quantity})
        </Typography>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RowProps = StackProps & {
  label: string;
  value: string;
};

function Row({ label, value, sx, ...other }: RowProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: 'subtitle2', ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'body2' }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}
