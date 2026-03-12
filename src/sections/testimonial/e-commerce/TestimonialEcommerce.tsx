import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Box, Stack } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// types
import { ITestimonialProps } from 'src/types/testimonial';
// components
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
//
import TestimonialItem from './TestimonialItem';

// ----------------------------------------------------------------------

type Props = {
  testimonials: ITestimonialProps[];
};

export default function TestimonialEcommerce({ testimonials }: Props) {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: !isMdUp,
    arrows: false,
    slidesToShow: Math.min(testimonials.length, 4),
    slidesToScroll: 1,
    infinite: false,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        mt: 8,
      },
    }),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { 
          slidesToShow: Math.min(testimonials.length, 2), 
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { 
          slidesToShow: 1, 
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container
      sx={{
        pt: 8,
        pb: { xs: 8, md: 10 },
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ textAlign: { xs: 'center', md: 'unset' }, flexGrow: 1 }}>
          Avis Clients
        </Typography>

        {isMdUp && testimonials.length > 4 && (
          <CarouselArrows
            spacing={2}
            justifyContent="center"
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </Stack>

      <Carousel ref={carouselRef} {...carouselSettings}>
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id} sx={{ px: 1.5 }}>
            <TestimonialItem testimonial={testimonial} />
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}

