// @mui
import { Typography, Stack, Link } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

type Props = {
  contactData?: {
    address: string;
    phones: string[];
    email: string;
    openingHours: string[];
  };
};

export default function ContactMarketingInfo({ contactData }: Props) {
  const isMdUp = useResponsive('up', 'md');

  const address = contactData?.address || 'Yaoundé, Cameroun';
  const phones = contactData?.phones || ['+237 6 96 50 34 39', '+237 6 50 34 39 96'];
  const email = contactData?.email || 'contact@michelprowood.com';
  const openingHours = contactData?.openingHours || ['Lun-Ven : 8h00 — 18h00', 'Sam : 8h00 — 14h00'];

  return (
    <Stack spacing={3}>
      {isMdUp && (
        <Image
          alt="marketing contact"
          src="/assets/illustrations/illustration_marketing_contact.svg"
          sx={{ maxWidth: 380 }}
        />
      )}

      <Stack spacing={2} direction="row" alignItems="flex-start">
        <Iconify icon="carbon:location" width={28} />

        <Stack spacing={0.5}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h6">Visitez-nous</Typography>

            <Link sx={{ lineHeight: 0 }}>
              <Iconify icon="carbon:launch" width={18} />
            </Link>
          </Stack>

          <Typography variant="body2">{address}</Typography>
        </Stack>
      </Stack>

      <Stack spacing={2} alignItems="flex-start" direction="row">
        <Iconify width={28} icon="carbon:mobile" />
        <Stack spacing={0.5}>
          <Typography variant="h6">Appelez-nous</Typography>
          {phones.map((phone, index) => (
             <Typography key={index} variant="body2">{phone}</Typography>
          ))}
        </Stack>
      </Stack>

      <Stack spacing={2} alignItems="flex-start" direction="row">
        <Iconify width={28} icon="carbon:email" />
        <Stack spacing={0.5}>
          <Typography variant="h6">Écrivez-nous</Typography>
          <Link color="inherit" variant="body2" href={`mailto:${email}`}>
            {email}
          </Link>
        </Stack>
      </Stack>

      <Stack spacing={2} alignItems="flex-start" direction="row">
        <Iconify width={28} icon="carbon:time" />
        <Stack spacing={0.5}>
          <Typography variant="h6">Horaires d'Ouverture</Typography>
          {openingHours.map((hour, index) => (
             <Typography key={index} variant="body2">{hour}</Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
