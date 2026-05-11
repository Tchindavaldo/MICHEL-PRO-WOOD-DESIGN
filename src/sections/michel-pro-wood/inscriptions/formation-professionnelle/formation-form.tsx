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
import UploadField from 'src/components/inscriptions/UploadField';
// lib
import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

const TYPE_FORMATION_OPTIONS = [
  { label: 'Formation professionnelle', value: 'Formation professionnelle' },
  { label: 'Immersion professionnelle', value: 'Immersion professionnelle' },
  { label: 'Apprentissage', value: 'Apprentissage' },
  { label: 'Initiation au métier du bois', value: 'Initiation au métier du bois' },
  { label: 'Autre', value: 'Autre' },
];

const LIEU_FORMATION_OPTIONS = [
  { label: 'CAJED TAYIM', value: 'CAJED TAYIM' },
  { label: 'Entrée école normale Bafoussam', value: 'Entrée école normale Bafoussam' },
  { label: 'Foyer Lagouen', value: 'Foyer Lagouen' },
];

const FILIERE_OPTIONS = [
  { label: 'Menuiserie Ébénisterie', value: 'Menuiserie Ébénisterie' },
  { label: 'Construction Bois (décoration, escalier et charpente)', value: 'Construction Bois (décoration, escalier et charpente)' },
  { label: 'Usinage CNC', value: 'Usinage CNC' },
  { label: 'Formation complète (les 3 filières)', value: 'Formation complète (les 3 filières)' },
  { label: 'Autre', value: 'Autre' },
];

const NIVEAU_ETUDE_OPTIONS = [
  'CEP',
  'BEPC',
  'CAP',
  'Probatoire',
  'BAC',
  'BT',
  'BTS',
  'Licence',
  'Master',
  'Master+',
];

// Map d'un diplôme individuel vers les libellés "niveau" du tableau COUTS_FORMATION qui l'incluent
const NIVEAU_TO_TABLEAU: Record<string, string[]> = {
  CEP: ['< CEP, BEPC/CAP'],
  BEPC: ['< CEP, BEPC/CAP', 'BEPC / CAP'],
  CAP: ['< CEP, BEPC/CAP', 'BEPC / CAP'],
  Probatoire: ['Probatoire'],
  BAC: ['Bac, BT, BTS, Licence, Master', 'BAC, BT', 'BAC < MASTER'],
  BT: ['Bac, BT, BTS, Licence, Master', 'BAC, BT'],
  BTS: ['Bac, BT, BTS, Licence, Master', 'BTS'],
  Licence: ['Bac, BT, BTS, Licence, Master', 'Licence / Master+', 'BAC < MASTER'],
  Master: ['Bac, BT, BTS, Licence, Master', 'BAC < MASTER'],
  'Master+': ['Licence / Master+'],
};

const SEXE_OPTIONS = [
  { label: 'Masculin', value: 'Masculin' },
  { label: 'Féminin', value: 'Féminin' },
];

const PAIEMENT_OPTIONS = [
  { label: 'Espèces (avec reçu)', value: 'Espèces' },
  { label: 'Mobile Money', value: 'Mobile Money' },
  { label: 'Virement bancaire', value: 'Virement bancaire' },
  { label: 'E-card', value: 'E-card' },
];

const RESEAU_OPTIONS = [
  { label: 'MTN', value: 'MTN' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Autre', value: 'Autre' },
];

const COUTS_FORMATION = [
  { formation: 'Menuiserie Ébénisterie', niveau: 'Bac, BT, BTS, Licence, Master', duree: '1 an', cout: 300000, diplomeObtenu: 'DQP' },
  { formation: 'Menuiserie Ébénisterie', niveau: 'Probatoire', duree: '2 ans', cout: 400000, diplomeObtenu: 'CQP ou DQP' },
  { formation: 'Menuiserie Ébénisterie', niveau: '< CEP, BEPC/CAP', duree: '3 ans', cout: 500000, diplomeObtenu: 'CQP' },
  { formation: 'Construction Bois (décoration, escalier et charpente)', niveau: 'Bac, BT, BTS, Licence, Master', duree: '1 an', cout: 500000, diplomeObtenu: 'DQP' },
  { formation: 'Construction Bois (décoration, escalier et charpente)', niveau: 'Probatoire', duree: '2 ans', cout: 500000, diplomeObtenu: 'CQP ou DQP' },
  { formation: 'Construction Bois (décoration, escalier et charpente)', niveau: 'BEPC / CAP', duree: '3 ans', cout: 500000, diplomeObtenu: 'CQP' },
  { formation: 'Usinage CNC', niveau: 'Licence / Master+', duree: '1 an', cout: 600000, diplomeObtenu: 'DQP' },
  { formation: 'Usinage CNC', niveau: 'BTS', duree: '2 ans', cout: 650000, diplomeObtenu: 'DQP' },
  { formation: 'Usinage CNC', niveau: 'BAC, BT', duree: '3 ans', cout: 700000, diplomeObtenu: 'DQP' },
  { formation: 'Formation complète (les 3 filières)', niveau: 'BAC < MASTER', duree: '3 ans', cout: 1200000, diplomeObtenu: 'DQP' },
];

// ----------------------------------------------------------------------

type FormValuesProps = {
  nom_prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  sexe: string;
  nationalite: string;
  cni_numero: string;
  cni_date_delivrance: string;
  cni_lieu_delivrance: string;
  cni_url: string;
  adresse: string;
  telephone: string;
  email: string;
  type_formation: string;
  type_formation_autre: string;
  lieu_formation: string;
  filiere: string;
  filiere_autre: string;
  niveau_etude: string;
  duree_formation: string;
  plan_localisation_url: string;
  demande_admission_url: string;
  releve_notes_url: string;
  photos_4x4_urls: string[];
  acte_naissance_url: string;
  dernier_diplome_url: string;
  signature_documents: string;
  date_signature_documents: string;
  date_emission: string;
  mode_paiement: string;
  momo_numero: string;
  momo_titulaire: string;
  momo_reseau: string;
  montant_annuelle: string;
  montant_global: string;
  mode_paiement_frais: string;
};

const FormationSchema = Yup.object().shape({
  nom_prenom: Yup.string().required('Le nom et prénom sont requis'),
  date_naissance: Yup.string().required('La date de naissance est requise'),
  lieu_naissance: Yup.string().required('Le lieu de naissance est requis'),
  sexe: Yup.string().required('Le sexe est requis'),
  nationalite: Yup.string().required('La nationalité est requise'),
  cni_numero: Yup.string().required('Le numéro de la pièce est requis'),
  cni_date_delivrance: Yup.string().required('La date de délivrance est requise'),
  cni_lieu_delivrance: Yup.string().required('Le lieu de délivrance est requis'),
  cni_url: Yup.string().required("Veuillez téléverser la pièce d'identité"),
  adresse: Yup.string().required("L'adresse est requise"),
  telephone: Yup.string().required('Le téléphone est requis'),
  email: Yup.string().required("L'email est requis").email("Format d'email invalide"),
  type_formation: Yup.string().required('Le type de formation est requis'),
  type_formation_autre: Yup.string().when('type_formation', {
    is: 'Autre',
    then: (schema) => schema.required('Veuillez préciser le type de formation'),
    otherwise: (schema) => schema.nullable(),
  }),
  lieu_formation: Yup.string().required('Le lieu de formation est requis'),
  filiere: Yup.string().required('La filière est requise'),
  filiere_autre: Yup.string().when('filiere', {
    is: 'Autre',
    then: (schema) => schema.required('Veuillez préciser la filière'),
    otherwise: (schema) => schema.nullable(),
  }),
  duree_formation: Yup.string().required('La durée souhaitée est requise'),
  niveau_etude: Yup.string().required("Le niveau d'étude est requis"),
  mode_paiement: Yup.string().required('Le mode de paiement est requis'),
  mode_paiement_frais: Yup.string().required('Le mode de paiement des frais est requis'),
  momo_numero: Yup.string().when('mode_paiement', {
    is: 'Mobile Money',
    then: (schema) => schema.required('Numéro Mobile Money requis'),
    otherwise: (schema) => schema.nullable(),
  }),
  momo_titulaire: Yup.string().when('mode_paiement', {
    is: 'Mobile Money',
    then: (schema) => schema.required('Nom du titulaire requis'),
    otherwise: (schema) => schema.nullable(),
  }),
  momo_reseau: Yup.string().when('mode_paiement', {
    is: 'Mobile Money',
    then: (schema) => schema.required('Réseau requis'),
    otherwise: (schema) => schema.nullable(),
  }),
  photos_4x4_urls: Yup.array().min(2, 'Veuillez téléverser au moins 2 photos 4x4'),
  acte_naissance_url: Yup.string().required("Veuillez téléverser l'acte de naissance"),
  dernier_diplome_url: Yup.string().required('Veuillez téléverser le dernier diplôme obtenu'),
});

const defaultValues: FormValuesProps = {
  nom_prenom: '',
  date_naissance: '',
  lieu_naissance: '',
  sexe: '',
  nationalite: '',
  cni_numero: '',
  cni_date_delivrance: '',
  cni_lieu_delivrance: '',
  cni_url: '',
  adresse: '',
  telephone: '',
  email: '',
  type_formation: '',
  type_formation_autre: '',
  lieu_formation: '',
  filiere: '',
  filiere_autre: '',
  niveau_etude: '',
  duree_formation: '',
  plan_localisation_url: '',
  demande_admission_url: '',
  releve_notes_url: '',
  photos_4x4_urls: [],
  acte_naissance_url: '',
  dernier_diplome_url: '',
  signature_documents: '',
  date_signature_documents: '',
  date_emission: '',
  mode_paiement: '',
  momo_numero: '',
  momo_titulaire: '',
  momo_reseau: '',
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
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onInvalid = (errs: any) => {
    const champs = Object.keys(errs);
    enqueueSnackbar(
      `Champs manquants ou invalides : ${champs.join(', ')}`,
      { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 7000 }
    );
    const first = document.querySelector(`[name="${champs[0]}"]`);
    if (first) (first as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const watchModePayment = watch('mode_paiement');
  const isMomo = watchModePayment === 'Mobile Money';

  const watchTypeFormation = watch('type_formation');
  const watchFiliere = watch('filiere');
  const watchDuree = watch('duree_formation');
  const watchNiveau = watch('niveau_etude');

  // Helpers : un diplôme individuel matche un libellé groupé du tableau si présent dans son mapping
  const niveauMatchTableau = (diplome: string, ligneNiveau: string) =>
    (NIVEAU_TO_TABLEAU[diplome] || []).includes(ligneNiveau);

  // Si filière = 'Autre', tous les niveaux sont dispos ; sinon filtrage par tableau
  const niveauxDisponibles = (!watchFiliere || watchFiliere === 'Autre')
    ? NIVEAU_ETUDE_OPTIONS
    : NIVEAU_ETUDE_OPTIONS.filter((diplome) =>
        COUTS_FORMATION.some((t) => t.formation === watchFiliere && niveauMatchTableau(diplome, t.niveau))
      );

  // Lignes du tableau matchant filière + niveau — vides si filière = 'Autre'
  const lignesMatchees = (watchFiliere && watchFiliere !== 'Autre' && watchNiveau)
    ? COUTS_FORMATION.filter(
        (t) => t.formation === watchFiliere && niveauMatchTableau(watchNiveau, t.niveau)
      )
    : [];

  // Durées disponibles : seulement quand filière ET niveau sont choisis (et filière != Autre)
  const dureesDisponibles = Array.from(new Set(lignesMatchees.map((l) => l.duree)));

  // Tarif masqué si filière = 'Autre'
  const tarifFormation = (watchDuree && watchFiliere !== 'Autre')
    ? lignesMatchees.find((t) => t.duree === watchDuree) ?? null
    : null;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const payload = {
        ...data,
        date_lieu_naissance: `${data.date_naissance}, ${data.lieu_naissance}`,
        montant_annuelle: data.montant_annuelle ? Number(data.montant_annuelle) : null,
        montant_global: data.montant_global ? Number(data.montant_global) : null,
        date_signature_documents: data.date_signature_documents || null,
        date_emission: data.date_emission || null,
        cni_date_delivrance: data.cni_date_delivrance || null,
        momo_numero: isMomo ? data.momo_numero : null,
        momo_titulaire: isMomo ? data.momo_titulaire : null,
        momo_reseau: isMomo ? data.momo_reseau : null,
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onInvalid)}>
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
            Michel Pro Wood Design — Menuiserie Ébénisterie · Construction bois · Usinage CNC
          </Typography>
        </Box>

        {/* Section 1 — Informations personnelles */}
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
                name="date_naissance"
                label="Date de naissance *"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="lieu_naissance"
                label="Lieu de naissance *"
                placeholder="ex: Yaoundé"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="nationalite" label="Nationalité *" />
            </Grid>
            <Grid item xs={12}>
              <RHFRadioGroup name="sexe" label="Sexe *" options={SEXE_OPTIONS} row spacing={4} />
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

        {/* Section 2 — Pièce d'identité */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            2. Pièce d'identité (CNI / passeport)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="cni_numero" label="Numéro de la pièce *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="cni_date_delivrance"
                label="Date de délivrance *"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="cni_lieu_delivrance" label="Lieu de délivrance *" />
            </Grid>
            <Grid item xs={12}>
              <UploadField
                name="cni_url"
                label="Téléverser la pièce d'identité"
                folder="inscriptions/formation"
                required
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Section 3 — Formation */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            3. Formation choisie
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFSelect name="type_formation" label="Type de formation *">
                {TYPE_FORMATION_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            {watchTypeFormation === 'Autre' && (
              <Grid item xs={12} md={6}>
                <RHFTextField name="type_formation_autre" label="Préciser le type de formation *" />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <RHFSelect name="lieu_formation" label="Lieu de formation *">
                {LIEU_FORMATION_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect name="filiere" label="Filière *">
                {FILIERE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            {watchFiliere === 'Autre' && (
              <Grid item xs={12} md={6}>
                <RHFTextField name="filiere_autre" label="Préciser la filière *" />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <RHFSelect name="niveau_etude" label="Niveau d'étude *">
                {niveauxDisponibles.map((n) => (
                  <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              {watchFiliere === 'Autre' ? (
                <RHFTextField
                  name="duree_formation"
                  label="Durée souhaitée pour votre formation *"
                  placeholder="ex: 6 mois, 1 an..."
                />
              ) : (
                <RHFSelect
                  name="duree_formation"
                  label="Durée souhaitée pour votre formation *"
                  disabled={dureesDisponibles.length === 0}
                  helperText={
                    dureesDisponibles.length === 0
                      ? "Sélectionnez d'abord la filière et le niveau d'étude"
                      : ''
                  }
                >
                  {dureesDisponibles.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  ))}
                </RHFSelect>
              )}
            </Grid>
            {tarifFormation && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 1 }}>
                  <strong>Coût estimé :</strong>{' '}
                  <span style={{ fontSize: 18, fontWeight: 700 }}>
                    {tarifFormation.cout.toLocaleString('fr-FR')} FCFA
                  </span>
                  {' '}sur {tarifFormation.duree} — Diplôme : {tarifFormation.diplomeObtenu}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* Section 4 — Documents à fournir */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            4. Documents à fournir
          </Typography>
          <Alert severity="error" sx={{ mb: 2 }}>
            Tous les documents ci-dessous sont <strong>obligatoires</strong>.
          </Alert>
          <Stack spacing={3}>
            <UploadField
              name="plan_localisation_url"
              label="Plan de localisation (image ou PDF)"
              folder="inscriptions/formation"
              required
            />
            <UploadField
              name="demande_admission_url"
              label="Demande d'admission"
              folder="inscriptions/formation"
              required
            />
            <UploadField
              name="photos_4x4_urls"
              label="Photos 4x4 (minimum 2 photos)"
              folder="inscriptions/formation"
              multiple
              required
            />
            <UploadField
              name="acte_naissance_url"
              label="Acte de naissance"
              folder="inscriptions/formation"
              required
            />
            <UploadField
              name="dernier_diplome_url"
              label="Dernier diplôme obtenu"
              folder="inscriptions/formation"
              required
            />
            <UploadField
              name="releve_notes_url"
              label="Dernier relevé de notes / bulletin scolaire"
              folder="inscriptions/formation"
              required
            />
          </Stack>

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

        {/* Section 5 — Date d'émission */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            5. Date d'émission ou d'envoi
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="date_emission"
                label="Date d'émission ou d'envoi"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Section 6 — Moyen de paiement */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            6. Moyen de paiement
          </Typography>
          <RHFRadioGroup
            name="mode_paiement"
            label="Choisissez votre mode de paiement *"
            options={PAIEMENT_OPTIONS}
            spacing={1}
          />

          {isMomo && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Informations Mobile Money
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="momo_numero" label="Numéro de téléphone *" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="momo_titulaire" label="Nom du titulaire *" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFSelect name="momo_reseau" label="Réseau *">
                    {RESEAU_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>

        {/* Section 7 — Coût de la formation */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            7. Coût de la formation
          </Typography>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Formation', 'Diplôme requis', 'Durée', 'Coût estimé (FCFA)', 'DIPLÔME OBTENU'].map((h) => (
                    <TableCell key={h} sx={{ bgcolor: '#770508', color: '#fff', fontWeight: 800, fontSize: { xs: 12, md: 14 }, whiteSpace: 'nowrap', letterSpacing: 0.3 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {COUTS_FORMATION.map((row, index) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.formation}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.niveau}
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

        {/* Section 8 — Frais d'inscription et de formation */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            8. Frais d'inscription et de formation
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Montant à régler à l'inscription : 25 000 FCFA</strong> (non remboursable)
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="montant_annuelle" label="Montant annuel (FCFA)" type="number" />
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
              label="Mode de paiement des frais *"
              options={PAIEMENT_OPTIONS}
              spacing={1}
            />
          </Box>
        </Paper>

        {/* Submit */}
        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <strong>Veuillez corriger les champs suivants :</strong>
            <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
              {Object.entries(errors).map(([key, val]: any) => (
                <li key={key}>
                  <strong>{key}</strong> — {val?.message || 'champ invalide'}
                </li>
              ))}
            </ul>
          </Alert>
        )}
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
