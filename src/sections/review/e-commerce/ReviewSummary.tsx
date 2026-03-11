// @mui
import {
  Box,
  Stack,
  Rating,
  Button,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// components
import Iconify from 'src/components/iconify';
//
import { ReviewProgress } from '../components';

// ----------------------------------------------------------------------

type Props = {
  reviewsNumber: number;
  ratingsNumber: number;
  onOpenForm: VoidFunction;
  ratingsDistribution: {
    value: string;
    number: number;
  }[];
};

export default function ReviewSummary({ reviewsNumber, ratingsNumber, onOpenForm, ratingsDistribution }: Props) {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        py: { xs: 8, md: 10 },
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={4}>
            <Typography variant="h3">Avis</Typography>

            <Stack spacing={2} direction="row" alignItems="center" sx={{ my: 3 }}>
              <Typography variant="h2"> {ratingsNumber}</Typography>

              <Stack spacing={0.5}>
                <Rating
                  value={ratingsNumber}
                  readOnly
                  precision={0.1}
                />
                <Typography variant="body2">{fShortenNumber(reviewsNumber)} avis</Typography>
              </Stack>
            </Stack>

            <Button
              size="large"
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon="carbon:edit" />}
              onClick={onOpenForm}
            >
              Écrire un avis
            </Button>
          </Grid>

          <Grid xs={12} md={4}>
            <ReviewProgress ratings={ratingsDistribution} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
