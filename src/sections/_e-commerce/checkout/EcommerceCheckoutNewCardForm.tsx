// @mui
import { Stack } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function EcommerceCheckoutNewCardForm() {
  return (
    <Stack spacing={2.5} sx={{ pt: 3 }}>
      <RHFTextField
        name="newCard.cardNumber"
        label="Numéro de carte"
        placeholder="XXXX XXXX XXXX XXXX"
        InputLabelProps={{ shrink: true }}
      />

      <RHFTextField
        name="newCard.cardHolder"
        label="Titulaire de la carte"
        placeholder="NOM PRENOM"
        InputLabelProps={{ shrink: true }}
      />

      <Stack spacing={2} direction="row">
        <RHFTextField
          name="newCard.expirationDate"
          label="Date d'expiration"
          placeholder="MM/AA"
          InputLabelProps={{ shrink: true }}
        />
        <RHFTextField
          name="newCard.ccv"
          label="CVV/CVC"
          placeholder="***"
          InputLabelProps={{ shrink: true }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        sx={{ typography: 'caption', color: 'text.disabled' }}
      >
        <Iconify icon="carbon:locked" sx={{ mr: 0.5 }} />
        Votre transaction est sécurisée avec cryptage SSL
      </Stack>
    </Stack>
  );
}
