// @mui
import { Stack, RadioGroup, StackProps } from '@mui/material';
//
import ReviewProgressItem from './ReviewProgressItem';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

interface Props extends StackProps {
  ratings: {
    value: string;
    number: number;
  }[];
}

export default function ReviewProgress({ ratings, ...other }: Props) {
  const totals = ratings.map((rating) => rating.number).reduce(
    (accumulator: number, curr: number) => accumulator + curr, 0
  );

  return (
    <RadioGroup>
      <Stack spacing={2} {...other}>
        {ratings.map((rating, index) => (
          <ReviewProgressItem key={rating.value} rating={rating} index={index} totals={totals} />
        ))}
      </Stack>
    </RadioGroup>
  );
}
