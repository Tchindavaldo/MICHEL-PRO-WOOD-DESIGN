// DEMO admin shell: sidebar + top bar. Only rendered when NEXT_PUBLIC_DEMO=1.
import { ReactNode, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { DEMO_ADMIN } from 'src/demo/config';
import { demoSession, resetDemoDB } from 'src/demo/store';

const NAV = [
  { href: '/admin', label: 'Tableau de bord', icon: 'carbon:dashboard' },
  { href: '/admin/produits', label: 'Produits', icon: 'carbon:catalog' },
  { href: '/admin/commandes', label: 'Commandes', icon: 'carbon:shopping-cart' },
  { href: '/admin/devis', label: 'Devis', icon: 'carbon:document' },
  { href: '/admin/clients', label: 'Clients', icon: 'carbon:user-multiple' },
  { href: '/admin/projets', label: 'Projets atelier', icon: 'carbon:tools' },
];

export default function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!demoSession.isLoggedIn()) router.replace('/admin/login');
    else setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F6F4F1' }}>
      <Box
        component="nav"
        sx={{ width: 260, flexShrink: 0, bgcolor: '#2B1D14', color: '#F3E9DD', p: 3, display: 'flex', flexDirection: 'column' }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: '#C9A27A', color: '#2B1D14', display: 'grid', placeItems: 'center', fontWeight: 800 }}>MW</Box>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#fff', lineHeight: 1.2 }}>Michel Pro Wood</Typography>
            <Typography variant="caption" sx={{ color: '#C9A27A' }}>Administration</Typography>
          </Box>
        </Stack>
        <Stack spacing={0.5} sx={{ flex: 1 }}>
          {NAV.map((item) => {
            const active = router.pathname === item.href;
            return (
              <Box
                key={item.href}
                component={NextLink}
                href={item.href}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5, px: 1.5, py: 1.2, borderRadius: 1,
                  color: active ? '#fff' : '#D8C7B4', textDecoration: 'none', fontWeight: active ? 700 : 500, fontSize: 14,
                  bgcolor: active ? 'rgba(201,162,122,0.22)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(201,162,122,0.12)' },
                }}
              >
                <Iconify icon={item.icon} width={20} />
                {item.label}
              </Box>
            );
          })}
        </Stack>
        <Button
          size="small"
          onClick={() => { resetDemoDB(); window.location.reload(); }}
          sx={{ color: '#C9A27A', justifyContent: 'flex-start' }}
          startIcon={<Iconify icon="carbon:reset" />}
        >
          Réinitialiser la démo
        </Button>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 4, py: 2, bgcolor: '#fff', borderBottom: '1px solid #EAE3DA' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5">{title}</Typography>
            <Chip size="small" label="Mode démo — données fictives" color="warning" variant="outlined" />
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle2">{DEMO_ADMIN.name}</Typography>
              <Typography variant="caption" color="text.secondary">{DEMO_ADMIN.email}</Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#8B5E3C' }}>AD</Avatar>
            <Button size="small" color="inherit" onClick={() => { demoSession.logout(); router.push('/admin/login'); }}>
              Déconnexion
            </Button>
          </Stack>
        </Stack>
        <Box sx={{ p: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
}
