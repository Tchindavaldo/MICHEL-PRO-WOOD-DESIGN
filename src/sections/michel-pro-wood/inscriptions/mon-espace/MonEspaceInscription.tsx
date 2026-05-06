import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Pagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material';
import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

const STATUT_COLORS: Record<string, 'warning' | 'info' | 'success' | 'error' | 'default'> = {
  reçue: 'warning',
  traitée: 'info',
  acceptée: 'success',
  refusée: 'error',
};

const TRANCHE_COLORS: Record<string, 'warning' | 'success' | 'error'> = {
  'en attente': 'warning',
  payée: 'success',
  'en retard': 'error',
};

const ORDER_STATUS_COLORS: Record<string, 'warning' | 'info' | 'success' | 'error' | 'default'> = {
  pending: 'warning',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'error',
};

const ORDER_STATUS_LABEL: Record<string, string> = {
  pending: 'En attente',
  processing: 'En cours',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

type Tranche = {
  id: string;
  montant: number;
  date_echeance: string;
  statut: string;
  note: string | null;
};

type Inscription = {
  id: string;
  type: 'stage' | 'formation';
  nom: string;
  filiere: string;
  statut: string;
  created_at: string;
  tranches: Tranche[];
};

type OrderItem = {
  name?: string;
  product_name?: string;
  quantity?: number;
  qty?: number;
  price?: number;
  unit_price?: number;
  cover?: string;
  image?: string;
};

type Order = {
  id: string;
  customer_name: string | null;
  total_amount: number;
  status: string;
  delivery_status: string | null;
  payment_method: string | null;
  shipping_method: string | null;
  items: OrderItem[];
  created_at: string;
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR');
}

function joursRestants(dateEcheance: string) {
  const diff = new Date(dateEcheance).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ----------------------------------------------------------------------

export default function MonEspaceInscription() {
  const [telephone, setTelephone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inscriptions, setInscriptions] = useState<Inscription[] | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [tab, setTab] = useState<'inscriptions' | 'commandes'>('inscriptions');
  const [pageInscriptions, setPageInscriptions] = useState(1);
  const [pageOrders, setPageOrders] = useState(1);
  const PER_PAGE = 5;

  const handleRecherche = async () => {
    const tel = telephone.trim();
    if (!tel) return;
    setLoading(true);
    setError(null);
    setInscriptions(null);
    setOrders(null);
    setPageInscriptions(1);
    setPageOrders(1);

    try {
      const digits = tel.replace(/\D/g, '');
      const tail = digits.slice(-9);
      const pattern = `%${tail}`;

      const [stageRes, formationRes, ordersRes] = await Promise.all([
        supabase
          .from('wood_inscriptions_stage_vacances')
          .select('id, nom, prenom, filiere_stage, type_stage, statut, created_at')
          .or(`telephone_candidat.ilike.${pattern},telephone_parent.ilike.${pattern}`),
        supabase
          .from('wood_inscriptions_formation')
          .select('id, nom_prenom, filiere, statut, created_at')
          .ilike('telephone', pattern),
        supabase
          .from('wood_orders')
          .select('id, customer_name, total_amount, status, delivery_status, payment_method, shipping_method, items, created_at')
          .ilike('customer_phone', pattern)
          .order('created_at', { ascending: false }),
      ]);

      if (stageRes.error) throw stageRes.error;
      if (formationRes.error) throw formationRes.error;
      if (ordersRes.error) throw ordersRes.error;

      const allIds = [
        ...(stageRes.data || []).map((r) => ({ id: r.id, type: 'stage' as const })),
        ...(formationRes.data || []).map((r) => ({ id: r.id, type: 'formation' as const })),
      ];

      let tranches: any[] = [];
      if (allIds.length > 0) {
        const ids = allIds.map((r) => r.id);
        const { data: t } = await supabase
          .from('wood_inscriptions_tranches_paiement')
          .select('*')
          .in('inscription_id', ids)
          .order('date_echeance', { ascending: true });
        tranches = t || [];
      }

      const result: Inscription[] = [
        ...(stageRes.data || []).map((r) => ({
          id: r.id,
          type: 'stage' as const,
          nom: `${r.prenom || ''} ${r.nom || ''}`.trim(),
          filiere: r.filiere_stage || r.type_stage || '—',
          statut: r.statut,
          created_at: r.created_at,
          tranches: tranches.filter((t) => t.inscription_id === r.id),
        })),
        ...(formationRes.data || []).map((r) => ({
          id: r.id,
          type: 'formation' as const,
          nom: r.nom_prenom,
          filiere: r.filiere || '—',
          statut: r.statut,
          created_at: r.created_at,
          tranches: tranches.filter((t) => t.inscription_id === r.id),
        })),
      ];

      setInscriptions(result);
      setOrders(
        ((ordersRes.data || []) as any[]).map((o) => ({
          ...o,
          items: Array.isArray(o.items) ? o.items : [],
        }))
      );
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const totalDu = (tranches: Tranche[]) =>
    tranches.filter((t) => t.statut !== 'payée').reduce((s, t) => s + Number(t.montant || 0), 0);

  const hasSearched = inscriptions !== null || orders !== null;

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Mon Espace
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Suivez vos inscriptions, vos paiements et vos commandes en saisissant votre numéro de téléphone.
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Accéder à mon dossier
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
          <TextField
            label="Numéro de téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRecherche()}
            size="small"
            sx={{ flex: 1 }}
            placeholder="Ex: 6XXXXXXXX"
          />
          <Button
            variant="contained"
            onClick={handleRecherche}
            disabled={loading || !telephone.trim()}
            sx={{ minWidth: 140, height: 40 }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Rechercher'}
          </Button>
        </Stack>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {hasSearched && (
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            label={`Mes inscriptions${inscriptions ? ` (${inscriptions.length})` : ''}`}
            value="inscriptions"
          />
          <Tab
            label={`Mes commandes${orders ? ` (${orders.length})` : ''}`}
            value="commandes"
          />
        </Tabs>
      )}

      {/* TAB INSCRIPTIONS */}
      {hasSearched && tab === 'inscriptions' && (
        <>
          {inscriptions && inscriptions.length === 0 && (
            <Alert severity="info">
              Aucune inscription trouvée pour ce numéro de téléphone.
            </Alert>
          )}

          {inscriptions && inscriptions
            .slice((pageInscriptions - 1) * PER_PAGE, pageInscriptions * PER_PAGE)
            .map((insc) => {
            const restant = totalDu(insc.tranches);
            const tranchesEnAttente = insc.tranches.filter((t) => t.statut !== 'payée');

            return (
              <Paper key={insc.id} elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="h6">{insc.nom}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {insc.type === 'stage' ? 'Stage' : 'Formation professionnelle'} — {insc.filiere}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Inscrit le {formatDate(insc.created_at)}
                    </Typography>
                  </Box>
                  <Chip
                    label={insc.statut}
                    color={STATUT_COLORS[insc.statut] || 'default'}
                    sx={{ textTransform: 'capitalize', fontWeight: 700 }}
                  />
                </Stack>

                <Divider sx={{ my: 2 }} />

                {insc.tranches.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Aucune tranche de paiement définie pour ce dossier.
                  </Typography>
                ) : (
                  <>
                    {restant > 0 && (
                      <Alert severity={tranchesEnAttente.some((t) => joursRestants(t.date_echeance) < 0) ? 'error' : 'warning'} sx={{ mb: 2 }}>
                        <strong>Montant restant à payer : {restant.toLocaleString('fr-FR')} FCFA</strong>
                        {tranchesEnAttente.length > 0 && (
                          <span> — Prochaine échéance : <strong>{formatDate(tranchesEnAttente[0].date_echeance)}</strong>
                            {' '}({joursRestants(tranchesEnAttente[0].date_echeance) > 0
                              ? `dans ${joursRestants(tranchesEnAttente[0].date_echeance)} jour(s)`
                              : `en retard de ${Math.abs(joursRestants(tranchesEnAttente[0].date_echeance))} jour(s)`})
                          </span>
                        )}
                      </Alert>
                    )}
                    {restant === 0 && insc.tranches.length > 0 && (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        Tous les paiements ont été effectués.
                      </Alert>
                    )}

                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Détail des tranches
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead sx={{ bgcolor: 'grey.100' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Tranche</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Montant (FCFA)</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Échéance</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Statut</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Note</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {insc.tranches.map((t, idx) => (
                            <TableRow key={t.id}>
                              <TableCell>Tranche {idx + 1}</TableCell>
                              <TableCell>{Number(t.montant).toLocaleString('fr-FR')}</TableCell>
                              <TableCell>{formatDate(t.date_echeance)}</TableCell>
                              <TableCell>
                                <Chip
                                  label={t.statut}
                                  color={TRANCHE_COLORS[t.statut] || 'default'}
                                  size="small"
                                  sx={{ textTransform: 'capitalize' }}
                                />
                              </TableCell>
                              <TableCell>{t.note || '—'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </Paper>
            );
          })}

          {inscriptions && inscriptions.length > PER_PAGE && (
            <Stack alignItems="center" sx={{ mt: 3 }}>
              <Pagination
                count={Math.ceil(inscriptions.length / PER_PAGE)}
                page={pageInscriptions}
                onChange={(_, p) => setPageInscriptions(p)}
                color="primary"
              />
            </Stack>
          )}
        </>
      )}

      {/* TAB COMMANDES */}
      {hasSearched && tab === 'commandes' && (
        <>
          {orders && orders.length === 0 && (
            <Alert severity="info">
              Aucune commande trouvée pour ce numéro de téléphone.
            </Alert>
          )}

          {orders && orders
            .slice((pageOrders - 1) * PER_PAGE, pageOrders * PER_PAGE)
            .map((order) => (
            <Paper key={order.id} elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6">
                    Commande #{order.id.slice(0, 8).toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Passée le {formatDate(order.created_at)}
                    {order.customer_name && ` — ${order.customer_name}`}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    label={`Commande : ${ORDER_STATUS_LABEL[order.status] || order.status}`}
                    color={ORDER_STATUS_COLORS[order.status] || 'default'}
                    sx={{ fontWeight: 700 }}
                  />
                  {order.delivery_status && (
                    <Chip
                      label={`Livraison : ${ORDER_STATUS_LABEL[order.delivery_status] || order.delivery_status}`}
                      color={ORDER_STATUS_COLORS[order.delivery_status] || 'default'}
                      variant="outlined"
                      sx={{ fontWeight: 700 }}
                    />
                  )}
                </Stack>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Articles commandés
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ bgcolor: 'grey.100' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Article</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">Quantité</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">Prix unitaire</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">Sous-total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                          Détails des articles indisponibles
                        </TableCell>
                      </TableRow>
                    ) : (
                      order.items.map((it, idx) => {
                        const qty = Number(it.quantity ?? it.qty ?? 1);
                        const price = Number(it.price ?? it.unit_price ?? 0);
                        return (
                          <TableRow key={idx}>
                            <TableCell>{it.name || it.product_name || '—'}</TableCell>
                            <TableCell align="center">{qty}</TableCell>
                            <TableCell align="right">{price.toLocaleString('fr-FR')} FCFA</TableCell>
                            <TableCell align="right">{(qty * price).toLocaleString('fr-FR')} FCFA</TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                <Box>
                  {order.payment_method && (
                    <Typography variant="body2" color="text.secondary">
                      Paiement : <strong>{order.payment_method}</strong>
                    </Typography>
                  )}
                  {order.shipping_method && (
                    <Typography variant="body2" color="text.secondary">
                      Livraison : <strong>{order.shipping_method}</strong>
                    </Typography>
                  )}
                </Box>
                <Typography variant="h6">
                  Total : {Number(order.total_amount).toLocaleString('fr-FR')} FCFA
                </Typography>
              </Stack>
            </Paper>
          ))}

          {orders && orders.length > PER_PAGE && (
            <Stack alignItems="center" sx={{ mt: 3 }}>
              <Pagination
                count={Math.ceil(orders.length / PER_PAGE)}
                page={pageOrders}
                onChange={(_, p) => setPageOrders(p)}
                color="primary"
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
}
