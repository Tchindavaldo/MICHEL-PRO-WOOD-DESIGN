// @mui
import { Box, Stack, Pagination } from '@mui/material';
// types
import { IShopProduct } from 'src/types/shop';

//
import {
  EcommerceProductViewListItem,
  EcommerceProductViewGridItem,
  EcommerceProductViewListItemSkeleton,
  EcommerceProductViewGridItemSkeleton,
} from '../item';

// ----------------------------------------------------------------------

type Props = {
  products: IShopProduct[];
  viewMode: string;

  loading?: boolean;
  page?: number;
  count?: number;
  onPageChange?: (event: React.ChangeEvent<unknown>, newPage: number) => void;
};

export default function EcommerceProductList({ 
  loading, 
  viewMode, 
  products,
  page = 1,
  count = 10,
  onPageChange 
}: Props) {
  const skeletonCount = viewMode === 'grid' ? 16 : 8;

  return (
    <>
      {viewMode === 'grid' ? (
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
        >
          {loading
            ? [...Array(skeletonCount)].map((_, index) => (
                <EcommerceProductViewGridItemSkeleton key={index} />
              ))
            : products.map((product) => (
                <EcommerceProductViewGridItem key={product.id} product={product} />
              ))}
        </Box>
      ) : (
        <Stack spacing={4}>
          {loading
            ? [...Array(skeletonCount)].map((_, index) => (
                <EcommerceProductViewListItemSkeleton key={index} />
              ))
            : products.map((product) => (
                <EcommerceProductViewListItem key={product.id} product={product} />
              ))}
        </Stack>
      )}

      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        color="primary"
        size="large"
        sx={{
          mt: 10,
          mb: 5,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
