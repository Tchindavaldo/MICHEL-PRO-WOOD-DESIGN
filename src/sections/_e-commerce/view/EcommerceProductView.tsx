// @mui
import { Container, Unstable_Grid2 as Grid } from '@mui/material';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ReviewEcommerce from '../../review/e-commerce';
import { EcommerceHeader } from '../layout';
import {
  EcommerceProductDetailsInfo,
  EcommerceProductDetailsCarousel,
  EcommerceProductDetailsDescription,
} from '../product/details';

// ----------------------------------------------------------------------


interface Props { product: any; reviews: any[]; }

export default function EcommerceProductView({ product, reviews }: Props) {

  return (
    <>
      <EcommerceHeader />

      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Accueil',
            },
            {
              name: 'Mobilier',
            },
            {
              name: product.name,
            },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsCarousel images={product.images} />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <EcommerceProductDetailsInfo
              name={product.name}
              price={product.price}
              rating={product.rating}
              review={reviews.length}
              priceSale={product.sale_price}
              caption={product.caption}
              woodType={product.wood_type}
              finish={product.finish}
              id={product.id}
              coverUrl={product.image_url || product.images[0]}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsDescription
              description={product.description}
              specifications={[
                { label: 'Catégorie', value: product.category || 'Mobilier' },
                { label: 'Fabricant', value: product.manufacturer || 'Wood Pro' },
                { label: 'Garantie', value: product.warranty || '2 Ans' },
                { label: 'Référence', value: product.reference || 'WP-2023-001' },
                { label: 'Origine', value: product.origin || 'Cameroun' },
                { label: 'Finition', value: product.finish || 'Vernis' },
                { label: 'Essence de Bois', value: product.wood_type || 'Chêne' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>

      <ReviewEcommerce productId={product.id} reviews={reviews} />
    </>
  );
}
