import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// next
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Stack,
  Divider,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
import { supabase } from 'src/lib/supabase';
// _mock
import { _products } from 'src/_mock';
// components
import FormProvider from 'src/components/hook-form';
//
import { EcommerceHeader } from '../layout';
import {
  EcommerceCheckoutNewCardForm,
  EcommerceCheckoutMobileMoneyForm,
  EcommerceCheckoutOrderSummary,
  EcommerceCheckoutPaymentMethod,
  EcommerceCheckoutShippingMethod,
  EcommerceCheckoutPersonalDetails,
  EcommerceCheckoutShippingDetails,
} from '../checkout';

// ----------------------------------------------------------------------

// context
import { useCart } from 'src/context/CartContext';

// ----------------------------------------------------------------------

const SHIPPING_OPTIONS = [
  {
    label: 'Free',
    value: 'free',
    description: '5-7 Days delivery',
    price: 0,
  },
  {
    label: 'Standard',
    value: 'standard',
    description: '3-5 Days delivery',
    price: 10,
  },
  {
    label: 'Express',
    value: 'express',
    description: '2-3 Days delivery',
    price: 20,
  },
];

const PAYMENT_OPTIONS = [
  {
    label: 'Carte Visa',
    value: 'visa',
    description: 'Paiement sécurisé par carte',
  },
  {
    label: 'Carte MasterCard',
    value: 'mastercard',
    description: 'Paiement sécurisé par carte',
  },
  {
    label: 'Orange Money',
    value: 'orange-money',
    description: 'Paiement mobile Orange',
  },
  {
    label: 'MTN Mobile Money',
    value: 'mtn-money',
    description: 'Paiement mobile MTN',
  },
];

// ----------------------------------------------------------------------

export default function EcommerceCheckoutView() {
  const { replace } = useRouter();
  const { cart, subtotal, totalItems, clearCart } = useCart();

  const EcommerceCheckoutSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string(), // Optional
    phoneNumber: Yup.string().required('Phone number is required'),
    streetAddress: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
  });

  const defaultValues = {
    firstName: 'Jayvion',
    lastName: 'Simon',
    emailAddress: '',
    phoneNumber: '365-374-4961',
    password: '',
    confirmPassword: '',
    streetAddress: '',
    city: '',
    country: 'United States',
    zipCode: '',
    shipping: 'free',
    paymentMethods: 'visa',
    newCard: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      ccv: '',
    },
    mobileMoneyPhone: '',
    mobileMoneyName: '',
  };

  const methods = useForm<typeof defaultValues>({
    resolver: yupResolver(EcommerceCheckoutSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const paymentMethod = watch('paymentMethods');
  const shippingMethod = watch('shipping');

  const shippingCost = SHIPPING_OPTIONS.find(option => option.value === shippingMethod)?.price || 0;
  const tax = subtotal * 0.07;
  const discount = 0;
  const total = subtotal + tax + shippingCost - discount;

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const orderPayload = {
        customer_name: `${data.firstName} ${data.lastName}`,
        customer_email: data.emailAddress,
        customer_phone: data.phoneNumber,
        customer_country: data.country,
        customer_address: `${data.streetAddress}, ${data.city}, ${data.zipCode}, ${data.country}`,
        total_amount: total,
        status: 'pending',
        delivery_status: 'pending',
        payment_method: data.paymentMethods,
        shipping_method: data.shipping,
        items: cart // Storing the cart items directly as JSONB
      };

      console.log('Submitting Order Payload to Supabase:', orderPayload);

      const { data: orderData, error: orderError } = await supabase
        .from('wood_orders')
        .insert(orderPayload)
        .select()
        .single();

      if (orderError) {
        console.error('Order creation failed:', orderError);
      } else {
        console.log('Order created:', orderData);
        
        // Update sold_count for each product in the cart
        const updatePromises = cart.map((item: any) => 
          supabase.rpc('increment_sold_count', { 
            product_id: item.id, 
            row_count: item.quantity || 1 
          })
        );

        await Promise.all(updatePromises);

        // Clear the cart after successful order
        clearCart();
      }


      reset();
      replace(paths.eCommerce.orderCompleted);
    } catch (error) {
      console.error(error);
    }
  };

  const renderPaymentForm = () => {
    if (paymentMethod === 'visa' || paymentMethod === 'mastercard') {
      return <EcommerceCheckoutNewCardForm />;
    }

    if (paymentMethod === 'orange-money') {
      return <EcommerceCheckoutMobileMoneyForm provider="orange" />;
    }

    if (paymentMethod === 'mtn-money') {
      return <EcommerceCheckoutMobileMoneyForm provider="mtn" />;
    }

    return null;
  };

  return (
    <>
      <EcommerceHeader />

      <Container
        sx={{
          overflow: 'hidden',
          pt: 5,
          pb: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h3" sx={{ mb: 5 }}>
          Checkout
        </Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid xs={12} md={8}>
              <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
                <div>
                  <StepLabel title="Personal Details" step="1" />
                  <EcommerceCheckoutPersonalDetails />
                </div>

                <div>
                  <StepLabel title="Shipping Details" step="2" />
                  <EcommerceCheckoutShippingDetails />
                </div>

                <div>
                  <StepLabel title="Shipping Method" step="3" />
                  <EcommerceCheckoutShippingMethod options={SHIPPING_OPTIONS} />
                </div>

                <div>
                  <StepLabel title="Payment Method" step="4" />

                  <EcommerceCheckoutPaymentMethod options={PAYMENT_OPTIONS} />

                  {renderPaymentForm()}
                </div>
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <EcommerceCheckoutOrderSummary
                tax={tax}
                total={total}
                subtotal={subtotal}
                shipping={shippingCost}
                discount={discount}
                products={cart}
                loading={isSubmitting}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

type StepLabelProps = {
  step: string;
  title: string;
};

function StepLabel({ step, title }: StepLabelProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h6' }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: 'flex',
          typography: 'h6',
          borderRadius: '50%',
          alignItems: 'center',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          color: 'primary.contrastText',
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}
