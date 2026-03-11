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

  const ratingsDistribution = [5, 4, 3, 2, 1].map((star) => ({
    value: `${star}star`,
    number: list.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <>
      <ReviewSummary
        ratingsNumber={Number((list.reduce((a,b)=>a+b.rating,0)/ Math.max(list.length,1)).toFixed(1))}
        reviewsNumber={list.length}
        onOpenForm={() => setOpenForm(true)}
        ratingsDistribution={ratingsDistribution}
      />

      <Container>
      <ReviewList reviews={list.map((item: any) => ({
        id: item.id,
        name: item.author || item.name,
        avatarUrl: item.avatarUrl || '',
        postedAt: item.created_at || item.postedAt,
        message: item.comment || item.message,
        rating: item.rating,
        helpful: item.helpful || 0,
      }))} />
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
