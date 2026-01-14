import { useState } from 'react';
// @mui
import { Container } from '@mui/material';
//
import ReviewNewForm from '../components/ReviewNewForm';
import ReviewList from './ReviewList';
import ReviewSummary from './ReviewSummary';

// ----------------------------------------------------------------------

interface Props { productId: string; reviews: any[]; }
export default function ReviewEcommerce({ productId, reviews }: Props) {
  const [openForm, setOpenForm] = useState(false);
  const [list, setList] = useState(reviews);

  return (
    <>
      <ReviewSummary
        ratingsNumber={Number((list.reduce((a,b)=>a+b.rating,0)/ Math.max(list.length,1)).toFixed(1))}
        reviewsNumber={list.length}
        onOpenForm={() => setOpenForm(true)}
      />

      <Container>
        <ReviewList reviews={list} />
      </Container>

      <ReviewNewForm
          productId={productId}
          open={openForm}
          onClose={() => setOpenForm(false)}
          onReviewAdded={(r)=>setList([r,...list])}
        />
    </>
  );
}
