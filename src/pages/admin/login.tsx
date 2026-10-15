// DEMO admin login — simulated auth, prefilled with the demo account. No backend.
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { DEMO_ADMIN, DEMO_MODE } from 'src/demo/config';
import { demoSession } from 'src/demo/store';

export const getStaticProps = async () => (DEMO_MODE ? { props: {} } : { notFound: true });

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_ADMIN.email);
  const [password, setPassword] = useState(DEMO_ADMIN.password);
  const [error, setError] = useState('');

  const submit = () => {
    if (email.trim() === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      demoSession.login();
      router.push('/admin');
    } else setError('Identifiants incorrects (utilisez le compte de démonstration).');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Box sx={{ backgroundImage: 'url("/assets/images/michel-pro-wood/vente/table salon.JPG")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(43,29,20,0.2), rgba(43,29,20,0.85))', p: 6, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
          <Typography variant="h3">Michel Pro Wood Design</Typography>
          <Typography sx={{ color: '#E8D6C2', mt: 1 }}>Menuiserie, ébénisterie et mobilier sur mesure — Bafoussam, Cameroun</Typography>
        </Box>
      </Box>
      <Stack justifyContent="center" alignItems="center" sx={{ bgcolor: '#F6F4F1', p: 4 }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h4">Espace administrateur</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Connectez-vous pour gérer la boutique et l&apos;atelier.</Typography>
          <Alert severity="info" sx={{ mb: 3 }}>Démo : le compte ci-dessous est pré-rempli. Toutes les données sont fictives.</Alert>
          <Stack spacing={2.5}>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} />
            {error && <Alert severity="error">{error}</Alert>}
            <Button size="large" variant="contained" onClick={submit} sx={{ bgcolor: '#8B5E3C', '&:hover': { bgcolor: '#6F4A2F' } }}>Se connecter</Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
