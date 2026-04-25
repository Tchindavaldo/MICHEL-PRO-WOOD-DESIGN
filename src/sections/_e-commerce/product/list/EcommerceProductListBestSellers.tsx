// @mui
import { Stack, Typography } from '@mui/material';
// types
import { IShopProduct } from 'src/types/shop';
//
import { EcommerceProductItemBestSellers } from '../item';

// ----------------------------------------------------------------------

type Props = {
  products: IShopProduct[];
};

export default function EcommerceProductListBestSellers({ products }: Props) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Best Sellers</Typography>

      {products.slice(0, 8).map((product) => (
        <EcommerceProductItemBestSellers key={product.id} product={product} />
      ))}
    </Stack>
  );
}
