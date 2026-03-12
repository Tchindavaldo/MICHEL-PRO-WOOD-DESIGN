import NextLink from 'next/link';
import { alpha } from '@mui/material/styles';
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

// ----------------------------------------------------------------------

export default function EcommerceLandingFeaturedBrands({ products, content }: Props) {
  const collectionName = content?.title || 'Collection Prestige';
  const collectionDescription = content?.content || "Découvrez notre collection la plus exclusive, alliant bois rares et finitions d'exception.";

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Typography variant="h3" sx={{ mb: 8, textAlign: { xs: 'center', md: 'unset' } }}>
        Nos Collections
      </Typography>

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
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            {products.slice(0, 4).map((product) => (
              <EcommerceProductItemFeaturedByBrand key={product.id} product={product} />
            ))}
          </Box>
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
