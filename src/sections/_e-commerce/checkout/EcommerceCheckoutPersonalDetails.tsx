// @mui
import { Box } from '@mui/material';
// components
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPersonalDetails() {
  return (
    <Box
      rowGap={2.5}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
    >
      <RHFTextField name="firstName" label="Prénom" />

      <RHFTextField name="lastName" label="Nom" />

      <RHFTextField name="emailAddress" label="Adresse Email (Optionnel)" />

      <RHFTextField name="phoneNumber" label="Numéro de téléphone" />
    </Box>
  );
}
