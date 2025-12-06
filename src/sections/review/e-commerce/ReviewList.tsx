import { useState } from 'react';
// @mui
import { Pagination, Box } from '@mui/material';
// types
import { IReviewItemProp } from 'src/types/review';
//
import ReviewItem from './ReviewItem';

// ----------------------------------------------------------------------

type Props = {
  reviews: IReviewItemProp[];
};

const REVIEWS_PER_PAGE = 3;

export default function ReviewList({ reviews }: Props) {
  const [page, setPage] = useState(1);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const startIndex = (page - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const currentReviews = reviews.slice(startIndex, endIndex);

  return (
    <Box sx={{ pt: 5 }}>
      {currentReviews.map((review) => (
        <ReviewItem
          key={review.id}
          name={review.name}
          avatarUrl={review.avatarUrl}
          postedAt={review.postedAt}
          message={review.message}
          rating={review.rating}
          helpful={review.helpful}
        />
      ))}

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          size="large"
          sx={{
            mt: 5,
            mb: 10,
            '& .MuiPagination-ul': {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </Box>
  );
}
