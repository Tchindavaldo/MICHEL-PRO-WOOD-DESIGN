import { useRef } from 'react';
import NextLink from 'next/link';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Button,
  Container,
  Typography,
  StackProps,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import Carousel, { CarouselArrows } from 'src/components/carousel';
import { EcommerceProductItemFeaturedByBrand } from '../product/item';

// ----------------------------------------------------------------------

type Product = {
  id: string;
  name: string;
  price: number;
  priceSale?: number;
  coverImg: string;
  category: string;
  [key: string]: any;
};

type ContentData = {
  title?: string;
  subtitle?: string;
  content?: string;
};

type Props = {
  products: Product[];
  content?: ContentData;
};

function chunkArray(array: any[], size: number) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

// ----------------------------------------------------------------------

export default function EcommerceLandingFeaturedBrands({ products, content }: Props) {
  const theme = useTheme();
  const carouselRef = useRef<Carousel | null>(null);

  const collectionName = content?.title || 'Collection Prestige';
  const collectionDescription = content?.content || "Découvrez notre collection la plus exclusive, alliant bois rares et finitions d'exception.";

  const chunkedProducts = chunkArray(products, 4);

  const carouselSettings = {
    arrows: false,
    dots: chunkedProducts.length > 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: chunkedProducts.length > 1,
    rtl: Boolean(theme.direction === 'rtl'),
  };

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
          Nos Collections
        </Typography>

        {chunkedProducts.length > 1 && (
          <CarouselArrows
            onNext={() => carouselRef.current?.slickNext()}
            onPrev={() => carouselRef.current?.slickPrev()}
          />
        )}
      </Stack>

      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <BrandInfo
            name={collectionName}
            description={collectionDescription}
            path={paths.eCommerce.products}
            sx={{ height: 1 }}
          />
        </Grid>

        <Grid xs={12} md={8}>
          <Carousel ref={carouselRef} {...carouselSettings}>
            {chunkedProducts.map((chunk, index) => (
              <Box key={index} sx={{ pb: 1 }}>
                <Box
                  gap={3}
                  display="grid"
                  gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
                >
                  {chunk.map((product) => (
                    <EcommerceProductItemFeaturedByBrand key={product.id} product={product} />
                  ))}
                </Box>
              </Box>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Container>
  );
}

// ─── Brand Info Block ───

interface BrandInfoProps extends StackProps {
  name?: string;
  path: string;
  description?: string;
}

function BrandInfo({ name, description, path, sx, ...other }: BrandInfoProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 5,
        borderRadius: 2,
        textAlign: 'center',
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="carbon:crown" width={40} />

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{name}</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{description}</Typography>

      <Button
        component={NextLink}
        href={path}
        color="inherit"
        endIcon={<Iconify icon="carbon:chevron-right" />}
        sx={{ mt: 5 }}
      >
        Plus de Détails
      </Button>
    </Stack>
  );
}

