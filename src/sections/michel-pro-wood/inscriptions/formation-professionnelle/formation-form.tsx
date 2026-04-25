import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Paper,
  Alert,
  Stack,
  Typography,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
// components
import FormProvider, {
  RHFTextField,
  RHFRadioGroup,
  RHFSelect,
} from 'src/components/hook-form';
// lib
import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

const FILIERE_OPTIONS = [
  { label: 'Menuiserie Ébénisterie', value: 'Menuiserie Ébénisterie' },
  { label: 'Construction Bois', value: 'Construction Bois' },
  { label: 'Usinage CNC', value: 'Usinage CNC' },
];

const SEXE_OPTIONS = [
  { label: 'Masculin', value: 'Masculin' },
  { label: 'Féminin', value: 'Féminin' },
];

const DUREE_OPTIONS = [
  { label: '1 an', value: '1 an' },
  { label: '2 ans', value: '2 ans' },
  { label: '3 ans', value: '3 ans' },
];

const PAIEMENT_OPTIONS = [
  { label: 'Mobile Money (MTN, Orange)', value: 'Mobile Money' },
  { label: 'Paiement en espèces (avec reçu)', value: 'Espèces' },
  { label: 'Virement bancaire (optionnel)', value: 'Virement bancaire' },
];

const DOCUMENTS_OPTIONS = [
  { label: 'Acte de naissance', value: 'acte_naissance' },
  { label: 'Dernier diplôme obtenu', value: 'diplome' },
  { label: 'Pièce d\'identité', value: 'piece_identite' },
  { label: '2 photos 4x4', value: 'photos' },
];

const COUTS_FORMATION = [
  { formation: 'Menuiserie Ébénisterie', diplome: 'Bac, BT, BTS, Licence, Master', duree: '1 an', cout: '300 000', diplomeObtenu: 'DQP' },
  { formation: 'Menuiserie Ébénisterie', diplome: 'Probatoire', duree: '2 ans', cout: '400 000', diplomeObtenu: 'CQP ou DQP' },
  { formation: 'Menuiserie Ébénisterie', diplome: '< CEP, BEPC/CAP', duree: '3 ans', cout: '500 000', diplomeObtenu: 'CQP' },
  { formation: 'Construction Bois (décoration, escalier et charpente)', diplome: 'Bac, BT, BTS, Licence, Master', duree: '1 an', cout: '500 000', diplomeObtenu: 'DQP' },
  { formation: 'Construction Bois (décoration, escalier et charpente)', diplome: 'Probatoire', duree: '2 ans', cout: '500 000', diplomeObtenu: 'CQP ou DQP' },
  { formation: 'Construction Bois (décoration, escalier et charpente)', diplome: 'BEPC / CAP', duree: '3 ans', cout: '500 000', diplomeObtenu: 'CQP' },
  { formation: 'Usinage CNC', diplome: 'Licence / Master+', duree: '1 an', cout: '600 000', diplomeObtenu: 'DQP' },
  { formation: 'Usinage CNC', diplome: 'BTS', duree: '2 ans', cout: '650 000', diplomeObtenu: 'DQP' },
  { formation: 'Usinage CNC', diplome: 'BAC, BT', duree: '3 ans', cout: '700 000', diplomeObtenu: 'DQP' },
  { formation: 'Formation complète (les 3 filières)', diplome: 'BAC < MASTER', duree: '3 ans', cout: '1 200 000', diplomeObtenu: 'DQP' },
];

// ----------------------------------------------------------------------

type FormValuesProps = {
  nom_prenom: string;
  date_lieu_naissance: string;
  sexe: string;
  nationalite: string;
  adresse: string;
  telephone: string;
  email: string;
  filiere: string;
  niveau_etude: string;
  duree_formation: string;
  signature_documents: string;
  date_signature_documents: string;
  mode_paiement: string;
  montant_annuelle: string;
  montant_global: string;
  mode_paiement_frais: string;
};

const FormationSchema = Yup.object().shape({
  nom_prenom: Yup.string().required('Le nom et prénom sont requis'),
  date_lieu_naissance: Yup.string().required('La date et lieu de naissance sont requis'),
  sexe: Yup.string().required('Le sexe est requis'),
  nationalite: Yup.string().required('La nationalité est requise'),
  adresse: Yup.string().required('L\'adresse est requise'),
  telephone: Yup.string().required('Le téléphone est requis'),
  email: Yup.string().required('L\'email est requis').email('Format d\'email invalide'),
  filiere: Yup.string().required('La filière est requise'),
  duree_formation: Yup.string().required('La durée de formation est requise'),
  niveau_etude: Yup.string().required('Le niveau d\'étude est requis'),
  mode_paiement: Yup.string().required('Le mode de paiement est requis'),
  mode_paiement_frais: Yup.string().required('Le mode de paiement des frais est requis'),
});

const defaultValues: FormValuesProps = {
  nom_prenom: '',
  date_lieu_naissance: '',
  sexe: '',
  nationalite: '',
  adresse: '',
  telephone: '',
  email: '',
  filiere: '',
  niveau_etude: '',
  duree_formation: '',
  signature_documents: '',
  date_signature_documents: '',
  mode_paiement: '',
  montant_annuelle: '',
  montant_global: '',
  mode_paiement_frais: '',
};

// ----------------------------------------------------------------------

export default function FormationProfessionnelleForm() {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FormationSchema) as any,
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const payload = {
        ...data,
        montant_annuelle: data.montant_annuelle ? Number(data.montant_annuelle) : null,
        montant_global: data.montant_global ? Number(data.montant_global) : null,
        date_signature_documents: data.date_signature_documents || null,
        documents_fournis: [],
      };

      const { error } = await supabase
        .from('wood_inscriptions_formation')
        .insert([payload]);

      if (error) throw error;

      enqueueSnackbar('Inscription envoyée avec succès ! Nous vous contacterons bientôt.', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 5000,
      });
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.message || 'Une erreur est survenue. Veuillez réessayer.', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 5000,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ maxWidth: 960, mx: 'auto', px: { xs: 2, md: 0 } }}>
        {/* En-tête */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            FICHE D'INSCRIPTION
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
            Formation Professionnelle
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Michel Pro Wood Design — Menuiserie & Ébénisterie
          </Typography>
        </Box>

        {/* Section 1 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            1. Informations personnelles
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RHFTextField name="nom_prenom" label="Nom et Prénom *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="date_lieu_naissance"
                label="Date et lieu de naissance *"
                placeholder="ex: 01/01/1995, Yaoundé"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="nationalite" label="Nationalité *" />
            </Grid>
            <Grid item xs={12}>
              <RHFRadioGroup
                name="sexe"
                label="Sexe *"
                options={SEXE_OPTIONS}
                row
                spacing={4}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="adresse" label="Adresse *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="telephone" label="Téléphone *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email" label="Email *" type="email" />
            </Grid>
          </Grid>
        </Paper>

        {/* Section 2 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            2. Formation choisie
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFSelect name="filiere" label="Filière">
                {FILIERE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="niveau_etude" label="Niveau d'étude" />
            </Grid>
            <Grid item xs={12}>
              <RHFRadioGroup
                name="duree_formation"
                label="Durée de la formation"
                options={DUREE_OPTIONS}
                row
                spacing={4}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Section 3 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            3. Documents à fournir (photocopies)
          </Typography>
          <Alert severity="error" icon="⚠️" sx={{ mb: 2 }}>
            <strong>Documents obligatoires à remettre lors de l'inscription :</strong>
          </Alert>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {DOCUMENTS_OPTIONS.map((doc) => (
              <Box component="li" key={doc.value} sx={{ mb: 0.5 }}>
                <Typography variant="body2">{doc.label}</Typography>
              </Box>
            ))}
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="signature_documents" label="Signature du candidat" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="date_signature_documents"
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Section 4 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            4. Moyen de paiement
          </Typography>
          <RHFRadioGroup
            name="mode_paiement"
            label="Choisissez votre mode de paiement"
            options={PAIEMENT_OPTIONS}
            spacing={1}
          />
        </Paper>

        {/* Section 5 — Tableau de coûts (affichage uniquement) */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            5. Estimation du coût de la formation
          </Typography>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Formation
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Diplôme requis
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Durée
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Coût (FCFA)
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Diplôme obtenu
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {COUTS_FORMATION.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}
                  >
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.formation}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, whiteSpace: 'nowrap' }}>
                      {row.diplome}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, whiteSpace: 'nowrap' }}>
                      {row.duree}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {row.cout}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, whiteSpace: 'nowrap' }}>
                      {row.diplomeObtenu}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Section 6 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            6. Frais d'inscription et de formation
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Montant à régler à l'inscription : 25 000 FCFA</strong> (non remboursable)
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="montant_annuelle"
                label="Montant annuel (FCFA)"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="montant_global"
                label="Montant global (FCFA)"
                type="number"
                helperText="Réduction de 10% si paiement unique"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <RHFRadioGroup
              name="mode_paiement_frais"
              label="Mode de paiement des frais"
              options={PAIEMENT_OPTIONS}
              spacing={1}
            />
          </Box>
        </Paper>

        {/* Submit */}
        <Stack alignItems="center" sx={{ mb: 6 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            sx={{ minWidth: 280, py: 1.5 }}
          >
            Envoyer ma fiche d'inscription
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
