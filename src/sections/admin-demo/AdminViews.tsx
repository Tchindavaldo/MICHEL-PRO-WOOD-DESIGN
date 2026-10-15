// DEMO admin views. All reads/writes go through useDemoDB (browser only).
import { useState } from 'react';
import {
  Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton,
  LinearProgress, MenuItem, Select, Stack, Switch, Table, TableBody, TableCell, TableHead, TableRow,
  TextField, Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { DEMO_MONTHLY_REVENUE, DemoOrder, DemoProduct, DemoQuote } from 'src/demo/fixtures';
import { fcfa, useDemoDB } from 'src/demo/store';

const fmtDate = (d: string) => new Date(d).toLocaleDateString('fr-FR');

export const ORDER_LABEL: Record<DemoOrder['status'], string> = {
  pending: 'En attente', processing: 'En fabrication', shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée',
};
const ORDER_COLOR: Record<DemoOrder['status'], any> = {
  pending: 'warning', processing: 'info', shipped: 'primary', delivered: 'success', cancelled: 'error',
};
const QUOTE_COLOR: Record<DemoQuote['status'], any> = { nouveau: 'warning', envoyé: 'info', accepté: 'success', refusé: 'error' };

function Kpi({ label, value, hint, icon }: { label: string; value: string; hint: string; icon: string }) {
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
          <Typography variant="h4" sx={{ my: 0.5 }}>{value}</Typography>
          <Typography variant="caption" sx={{ color: 'success.main' }}>{hint}</Typography>
        </Box>
        <Box sx={{ width: 44, height: 44, borderRadius: 1.5, bgcolor: '#F3E9DD', color: '#8B5E3C', display: 'grid', placeItems: 'center' }}>
          <Iconify icon={icon} width={24} />
        </Box>
      </Stack>
    </Card>
  );
}

function OrdersTable({ orders, onStatus }: { orders: DemoOrder[]; onStatus?: (id: string, s: DemoOrder['status']) => void }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Réf.</TableCell><TableCell>Client</TableCell><TableCell>Ville</TableCell>
          <TableCell>Articles</TableCell><TableCell align="right">Montant</TableCell><TableCell>Paiement</TableCell>
          <TableCell>Date</TableCell><TableCell>Statut</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((o) => (
          <TableRow key={o.id} hover>
            <TableCell sx={{ fontWeight: 600 }}>{o.ref}</TableCell>
            <TableCell>{o.customer_name}</TableCell>
            <TableCell>{o.city}</TableCell>
            <TableCell sx={{ maxWidth: 260 }}>{o.items.map((i) => `${i.quantity} x ${i.name}`).join(', ')}</TableCell>
            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{fcfa(o.total_amount)}</TableCell>
            <TableCell>{o.payment_method}</TableCell>
            <TableCell>{fmtDate(o.created_at)}</TableCell>
            <TableCell>
              {onStatus ? (
                <Select size="small" value={o.status} onChange={(e) => onStatus(o.id, e.target.value as DemoOrder['status'])} sx={{ minWidth: 150 }}>
                  {Object.entries(ORDER_LABEL).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
                </Select>
              ) : (
                <Chip size="small" label={ORDER_LABEL[o.status]} color={ORDER_COLOR[o.status]} variant="outlined" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ----------------------------------------------------------------------

export function OverviewView() {
  const { db } = useDemoDB();
  const revenue = db.orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total_amount, 0);
  const max = Math.max(...DEMO_MONTHLY_REVENUE.map((m) => m.value));
  const open = db.orders.filter((o) => ['pending', 'processing', 'shipped'].includes(o.status)).length;
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={3}><Kpi label="Chiffre d'affaires (30 j)" value={fcfa(revenue)} hint="+12 % vs mois précédent" icon="carbon:currency" /></Grid>
        <Grid item xs={3}><Kpi label="Commandes en cours" value={String(open)} hint={`${db.orders.length} commandes au total`} icon="carbon:shopping-cart" /></Grid>
        <Grid item xs={3}><Kpi label="Devis à traiter" value={String(db.quotes.filter((q) => q.status === 'nouveau' || q.status === 'envoyé').length)} hint={`${db.quotes.length} demandes ce mois`} icon="carbon:document" /></Grid>
        <Grid item xs={3}><Kpi label="Clients" value={String(db.customers.length)} hint="Bafoussam, Douala, Yaoundé..." icon="carbon:user-multiple" /></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6">Ventes mensuelles (FCFA)</Typography>
            <Stack direction="row" alignItems="flex-end" spacing={3} sx={{ height: 220, mt: 3 }}>
              {DEMO_MONTHLY_REVENUE.map((m) => (
                <Stack key={m.month} alignItems="center" sx={{ flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                  <Typography variant="caption" color="text.secondary">{(m.value / 1e6).toFixed(1)} M</Typography>
                  <Box sx={{ width: '100%', maxWidth: 48, height: `${(m.value / max) * 80}%`, bgcolor: '#8B5E3C', borderRadius: '6px 6px 0 0' }} />
                  <Typography variant="caption" sx={{ mt: 1 }}>{m.month}</Typography>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Projets atelier</Typography>
            <Stack spacing={2}>
              {db.projects.map((p) => (
                <Box key={p.id}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2">{p.title}</Typography>
                    <Typography variant="caption">{p.progress} %</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">{p.client} — {p.city}</Typography>
                  <LinearProgress variant="determinate" value={p.progress} sx={{ mt: 0.5, height: 6, borderRadius: 3 }} />
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Dernières commandes</Typography>
        <OrdersTable orders={db.orders.slice(0, 5)} />
      </Card>
    </Stack>
  );
}

// ----------------------------------------------------------------------

const EMPTY: DemoProduct = { id: '', name: '', category: 'Salon', price: 0, stock: 0, sold: 0, image: '/assets/images/michel-pro-wood/vente/table salon.JPG', active: true };

export function ProductsView() {
  const { db, update } = useDemoDB();
  const [edit, setEdit] = useState<DemoProduct | null>(null);

  const save = () => {
    if (!edit) return;
    update((d) => ({
      ...d,
      products: edit.id
        ? d.products.map((p) => (p.id === edit.id ? edit : p))
        : [{ ...edit, id: `p${Date.now()}` }, ...d.products],
    }));
    setEdit(null);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">{db.products.length} produits au catalogue</Typography>
        <Button variant="contained" startIcon={<Iconify icon="carbon:add" />} onClick={() => setEdit({ ...EMPTY })}>Nouveau produit</Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Produit</TableCell><TableCell>Catégorie</TableCell><TableCell align="right">Prix</TableCell>
            <TableCell align="right">Stock</TableCell><TableCell align="right">Vendus</TableCell><TableCell>En ligne</TableCell><TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {db.products.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box component="img" src={p.image} alt="" sx={{ width: 56, height: 42, objectFit: 'cover', borderRadius: 1 }} />
                  <Typography variant="subtitle2">{p.name}</Typography>
                </Stack>
              </TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{fcfa(p.price)}</TableCell>
              <TableCell align="right">{p.stock === 0 ? <Chip size="small" color="error" label="Rupture" /> : p.stock}</TableCell>
              <TableCell align="right">{p.sold}</TableCell>
              <TableCell>
                <Switch checked={p.active} onChange={() => update((d) => ({ ...d, products: d.products.map((x) => (x.id === p.id ? { ...x, active: !x.active } : x)) }))} />
              </TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                <IconButton onClick={() => setEdit(p)}><Iconify icon="carbon:edit" /></IconButton>
                <IconButton color="error" onClick={() => update((d) => ({ ...d, products: d.products.filter((x) => x.id !== p.id) }))}><Iconify icon="carbon:trash-can" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!edit} onClose={() => setEdit(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{edit?.id ? 'Modifier le produit' : 'Nouveau produit'}</DialogTitle>
        <DialogContent>
          {edit && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Nom" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
              <TextField select label="Catégorie" value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })}>
                {['Salon', 'Salle à manger', 'Chambre', 'Extérieur', 'Bureau'].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>
              <TextField type="number" label="Prix (FCFA)" value={edit.price} onChange={(e) => setEdit({ ...edit, price: Number(e.target.value) })} />
              <TextField type="number" label="Stock" value={edit.stock} onChange={(e) => setEdit({ ...edit, stock: Number(e.target.value) })} />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEdit(null)}>Annuler</Button>
          <Button variant="contained" onClick={save} disabled={!edit?.name}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function OrdersView() {
  const { db, update } = useDemoDB();
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Toutes les commandes</Typography>
      <OrdersTable
        orders={db.orders}
        onStatus={(id, status) => update((d) => ({ ...d, orders: d.orders.map((o) => (o.id === id ? { ...o, status } : o)) }))}
      />
    </Card>
  );
}

export function QuotesView() {
  const { db, update } = useDemoDB();
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Demandes de devis</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Réf.</TableCell><TableCell>Client</TableCell><TableCell>Projet</TableCell><TableCell>Ville</TableCell>
            <TableCell align="right">Budget estimé</TableCell><TableCell>Reçu le</TableCell><TableCell>Statut</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {db.quotes.map((q) => (
            <TableRow key={q.id} hover>
              <TableCell sx={{ fontWeight: 600 }}>{q.ref}</TableCell>
              <TableCell>{q.customer}<br /><Typography variant="caption" color="text.secondary">{q.phone}</Typography></TableCell>
              <TableCell>{q.project}</TableCell>
              <TableCell>{q.city}</TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{fcfa(q.budget)}</TableCell>
              <TableCell>{fmtDate(q.created_at)}</TableCell>
              <TableCell>
                <Select size="small" value={q.status} onChange={(e) => update((d) => ({ ...d, quotes: d.quotes.map((x) => (x.id === q.id ? { ...x, status: e.target.value as DemoQuote['status'] } : x)) }))}
                  renderValue={(v) => <Chip size="small" label={v} color={QUOTE_COLOR[v as DemoQuote['status']]} sx={{ textTransform: 'capitalize' }} />}>
                  {Object.keys(QUOTE_COLOR).map((k) => <MenuItem key={k} value={k} sx={{ textTransform: 'capitalize' }}>{k}</MenuItem>)}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export function CustomersView() {
  const { db } = useDemoDB();
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Clients</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell><TableCell>Téléphone</TableCell><TableCell>Email</TableCell><TableCell>Ville</TableCell>
            <TableCell align="right">Commandes</TableCell><TableCell align="right">Total dépensé</TableCell><TableCell>Client depuis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {db.customers.map((c) => (
            <TableRow key={c.id} hover>
              <TableCell sx={{ fontWeight: 600 }}>{c.name}</TableCell><TableCell>{c.phone}</TableCell><TableCell>{c.email}</TableCell>
              <TableCell>{c.city}</TableCell><TableCell align="right">{c.orders}</TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{fcfa(c.spent)}</TableCell><TableCell>{fmtDate(c.since)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export function ProjectsView() {
  const { db } = useDemoDB();
  return (
    <Grid container spacing={3}>
      {db.projects.map((p) => (
        <Grid item xs={6} key={p.id}>
          <Card sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="h6">{p.title}</Typography>
              <Chip size="small" label={p.status} color={p.status === 'livré' ? 'success' : p.status === 'en cours' ? 'info' : 'warning'} sx={{ textTransform: 'capitalize' }} />
            </Stack>
            <Typography variant="body2" color="text.secondary">{p.client} — {p.city} · {p.category}</Typography>
            <LinearProgress variant="determinate" value={p.progress} sx={{ my: 2, height: 8, borderRadius: 4 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">{fcfa(p.amount)}</Typography>
              <Typography variant="caption" color="text.secondary">Échéance : {fmtDate(p.deadline)}</Typography>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
