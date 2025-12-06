// @mui
import { Stack } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  provider: 'orange' | 'mtn';
};

export default function EcommerceCheckoutMobileMoneyForm({ provider }: Props) {
  const providerName = provider === 'orange' ? 'Orange Money' : 'MTN Mobile Money';
  
  return (
    <Stack spacing={2.5} sx={{ pt: 3 }}>
      <RHFTextField
        name="mobileMoneyPhone"
        label={`Numéro ${providerName}`}
        placeholder="6XX XX XX XX"
        InputLabelProps={{ shrink: true }}
      />

      <RHFTextField
        name="mobileMoneyName"
        label="Nom du titulaire"
        placeholder="Nom complet"
        InputLabelProps={{ shrink: true }}
      />

      <Stack
        direction="row"
        alignItems="center"
        sx={{ typography: 'caption', color: 'text.disabled' }}
      >
        <Iconify icon="carbon:locked" sx={{ mr: 0.5 }} />
        Votre transaction est sécurisée avec {providerName}
      </Stack>
    </Stack>
  );
}
