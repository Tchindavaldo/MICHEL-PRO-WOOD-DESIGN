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
  Divider,
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
  RHFMultiCheckbox,
  RHFSelect,
} from 'src/components/hook-form';
import UploadField from 'src/components/inscriptions/UploadField';
// lib
import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

const TYPE_STAGE_OPTIONS = [
  { label: 'Stage de vacances', value: 'Stage de vacances' },
  { label: 'Stage académique', value: 'Stage académique' },
  { label: 'Stage professionnel', value: 'Stage professionnel' },
  { label: 'Stage pré-emploi', value: 'Stage pré-emploi' },
];

const FILIERE_STAGE_OPTIONS = [
  'Menuiserie / Ébénisterie',
  'Construction Bois',
  'Usinage CNC',
  'Marketing / Infographie / Vidéo / Web',
  'Secrétariat / Community Management',
];

const LIEU_OPTIONS = [
  { label: 'CAJED TAYIM', value: 'CAJED TAYIM' },
  { label: 'Entrée école normale Bafoussam', value: 'Entrée école normale Bafoussam' },
  { label: 'Foyer Lagouen', value: 'Foyer Lagouen' },
];

const SEXE_OPTIONS = [
  { label: 'Masculin', value: 'Masculin' },
  { label: 'Féminin', value: 'Féminin' },
];

const PAIEMENT_OPTIONS = [
  { label: 'Espèces', value: 'Espèces' },
  { label: 'Mobile Money', value: 'Mobile Money' },
  { label: 'Virement bancaire', value: 'Virement bancaire' },
  { label: 'E-card', value: 'E-card' },
  { label: 'Autre', value: 'Autre' },
];

const RESEAU_OPTIONS = [
  { label: 'MTN', value: 'MTN' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Autre', value: 'Autre' },
];

const ENGAGEMENTS_OPTIONS = [
  { label: 'Respecter le règlement intérieur et les consignes de sécurité', value: 'reglement' },
  { label: 'Participer activement à toutes les activités du stage', value: 'participation' },
  { label: 'Être assidu(e) et ponctuel(le)', value: 'assiduite' },
];

// ----------------------------------------------------------------------

type FormValuesProps = {
  type_stage: string;
  filiere_stage: string;
  annee: string;
  lieu: string;
  // Candidat
  nom: string;
  prenom: string;
  date_naissance: string;
  age: string;
  sexe: string;
  telephone_candidat: string;
  email_candidat: string;
  etablissement_scolaire: string;
  classe_actuelle: string;
  niveau_etude: string;
  adresse: string;
  // Pièce d'identité candidat
  cni_numero: string;
  cni_date_delivrance: string;
  cni_lieu_delivrance: string;
  cni_url: string;
  // Documents
  photos_4x4_urls: string[];
  bulletin_url: string;
  plan_localisation_candidat_url: string;
  // Frais & paiement
  montant_mois: string;
  montant_3mois: string;
  mode_paiement: string;
  mode_paiement_autre: string;
  momo_numero: string;
  momo_titulaire: string;
  momo_reseau: string;
  // Engagements
  engagements: string[];
  signature_participant: string;
  date_signature_participant: string;
  // Parent
  nom_parent: string;
  prenom_parent: string;
  lien_parent: string;
  telephone_parent: string;
  email_parent: string;
  parent_cni_numero: string;
  parent_cni_date_delivrance: string;
  parent_cni_lieu_delivrance: string;
  parent_cni_url: string;
  parent_photos_4x4_urls: string[];
  plan_localisation_parent_url: string;
  signature_parent: string;
  date_autorisation: string;
};

const StageVacancesSchema = Yup.object().shape({
  type_stage: Yup.string().required('Le type de stage est requis'),
  annee: Yup.string().required("L'année est requise"),
  lieu: Yup.string().required('Le lieu est requis'),
  nom: Yup.string().required('Le nom est requis'),
  prenom: Yup.string().required('Le prénom est requis'),
  date_naissance: Yup.string().required('La date de naissance est requise'),
  age: Yup.number()
    .typeError("L'âge doit être un nombre")
    .required("L'âge est requis")
    .positive("L'âge doit être positif")
    .integer("L'âge doit être un entier"),
  sexe: Yup.string().required('Le sexe est requis'),
  telephone_candidat: Yup.string().required('Le téléphone du candidat est requis'),
  etablissement_scolaire: Yup.string().required("L'établissement est requis"),
  classe_actuelle: Yup.string().required('La classe est requise'),
  niveau_etude: Yup.string().required("Le niveau d'étude est requis"),
  adresse: Yup.string().required("L'adresse est requise"),
  cni_numero: Yup.string().required('Le numéro de la pièce est requis'),
  cni_date_delivrance: Yup.string().required('La date de délivrance est requise'),
  cni_lieu_delivrance: Yup.string().required('Le lieu de délivrance est requis'),
  cni_url: Yup.string().required('Veuillez téléverser la pièce d\'identité'),
  photos_4x4_urls: Yup.array()
    .of(Yup.string())
    .min(2, 'Veuillez téléverser au moins 2 photos 4x4'),
  mode_paiement: Yup.string().required('Le mode de paiement est requis'),
  mode_paiement_autre: Yup.string().when('mode_paiement', {
    is: 'Autre',
    then: (schema) => schema.required('Veuillez préciser le mode de paiement'),
    otherwise: (schema) => schema.nullable(),
  }),
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
  engagements: Yup.array().min(1, 'Veuillez accepter au moins un engagement'),
  nom_parent: Yup.string().required('Le nom du parent est requis'),
  prenom_parent: Yup.string().required('Le prénom du parent est requis'),
  lien_parent: Yup.string().required('Le lien avec le candidat est requis'),
  telephone_parent: Yup.string().required('Le téléphone du parent est requis'),
});

const defaultValues: FormValuesProps = {
  type_stage: '',
  filiere_stage: '',
  annee: '',
  lieu: '',
  nom: '',
  prenom: '',
  date_naissance: '',
  age: '',
  sexe: '',
  telephone_candidat: '',
  email_candidat: '',
  etablissement_scolaire: '',
  classe_actuelle: '',
  niveau_etude: '',
  adresse: '',
  cni_numero: '',
  cni_date_delivrance: '',
  cni_lieu_delivrance: '',
  cni_url: '',
  photos_4x4_urls: [],
  bulletin_url: '',
  plan_localisation_candidat_url: '',
  montant_mois: '',
  montant_3mois: '',
  mode_paiement: '',
  mode_paiement_autre: '',
  momo_numero: '',
  momo_titulaire: '',
  momo_reseau: '',
  engagements: [],
  signature_participant: '',
  date_signature_participant: '',
  nom_parent: '',
  prenom_parent: '',
  lien_parent: '',
  telephone_parent: '',
  email_parent: '',
  parent_cni_numero: '',
  parent_cni_date_delivrance: '',
  parent_cni_lieu_delivrance: '',
  parent_cni_url: '',
  parent_photos_4x4_urls: [],
  plan_localisation_parent_url: '',
  signature_parent: '',
  date_autorisation: '',
};

// ----------------------------------------------------------------------

export default function StageVacancesForm() {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(StageVacancesSchema) as any,
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const watchModePayment = watch('mode_paiement');
  const isMomo = watchModePayment === 'Mobile Money';

  const watchTypeStage = watch('type_stage');
  const watchFiliere = watch('filiere_stage');
  const watchNiveauEtude = watch('niveau_etude');

  const TARIFS = [
    { type: 'Stage de vacances', filiere: 'Menuiserie / Ébénisterie', niveau: 'BEPC et inférieur', cout: 25000 },
    { type: 'Stage de vacances', filiere: 'Menuiserie / Ébénisterie', niveau: 'Bac et plus', cout: 35000 },
    { type: 'Stage de vacances', filiere: 'Construction Bois', niveau: 'BEPC et inférieur', cout: 30000 },
    { type: 'Stage de vacances', filiere: 'Construction Bois', niveau: 'Bac et plus', cout: 40000 },
    { type: 'Stage de vacances', filiere: 'Usinage CNC', niveau: 'BEPC et inférieur', cout: 35000 },
    { type: 'Stage de vacances', filiere: 'Usinage CNC', niveau: 'Bac et plus', cout: 50000 },
    { type: 'Stage de vacances', filiere: 'Marketing / Infographie / Vidéo / Web', niveau: 'BEPC et inférieur', cout: 30000 },
    { type: 'Stage de vacances', filiere: 'Marketing / Infographie / Vidéo / Web', niveau: 'Bac et plus', cout: 45000 },
    { type: 'Stage de vacances', filiere: 'Secrétariat / Community Management', niveau: 'Tous niveaux', cout: 25000 },
    { type: 'Stage académique', filiere: 'Toutes filières', niveau: 'Élèves / Étudiants', cout: 20000 },
    { type: 'Stage professionnel', filiere: 'Toutes filières', niveau: 'Diplômés', cout: 30000 },
    { type: 'Stage pré-emploi', filiere: 'Toutes filières', niveau: 'Jeunes diplômés', cout: 35000 },
  ];

  const tarifTrouve = watchTypeStage && watchNiveauEtude
    ? TARIFS.find((t) => {
        const typeMatch = t.type === watchTypeStage;
        const niveauMatch = t.niveau === watchNiveauEtude || t.niveau === 'Tous niveaux';
        const filiereMatch = t.filiere === 'Toutes filières' || t.filiere === watchFiliere;
        return typeMatch && niveauMatch && filiereMatch;
      }) ?? null
    : null;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const payload = {
        ...data,
        age: Number(data.age),
        montant_mois: data.montant_mois ? Number(data.montant_mois) : null,
        montant_3mois: data.montant_3mois ? Number(data.montant_3mois) : null,
        date_naissance: data.date_naissance || null,
        date_signature_participant: data.date_signature_participant || null,
        date_autorisation: data.date_autorisation || null,
        cni_date_delivrance: data.cni_date_delivrance || null,
        parent_cni_date_delivrance: data.parent_cni_date_delivrance || null,
        mode_paiement_autre: data.mode_paiement === 'Autre' ? data.mode_paiement_autre : null,
        momo_numero: isMomo ? data.momo_numero : null,
        momo_titulaire: isMomo ? data.momo_titulaire : null,
        momo_reseau: isMomo ? data.momo_reseau : null,
        documents_joints: [],
      };

      const { error } = await supabase
        .from('wood_inscriptions_stage_vacances')
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
      <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, md: 0 } }}>
        {/* En-tête */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            FICHE D'INSCRIPTION
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
            STAGE
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Michel Pro Wood Design — Menuiserie Ébénisterie · Construction bois · Usinage CNC
          </Typography>
        </Box>

        {/* Type & Localisation */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Type de stage & Localisation
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFSelect name="type_stage" label="Type de stage *">
                {TYPE_STAGE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect name="filiere_stage" label="Filière">
                {FILIERE_STAGE_OPTIONS.map((f) => (
                  <MenuItem key={f} value={f}>{f}</MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="annee" label="Année *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect name="lieu" label="Lieu *">
                {LIEU_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            {tarifTrouve && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 1 }}>
                  <strong>Coût mensuel estimé :</strong>{' '}
                  <span style={{ fontSize: 18, fontWeight: 700 }}>
                    {tarifTrouve.cout.toLocaleString('fr-FR')} FCFA / mois
                  </span>
                  {' '}— Durée : 1 à 3 mois
                </Alert>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* Section 1 — Candidat */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            1. Informations du candidat
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="telephone_candidat" label="Téléphone du candidat *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email_candidat" label="Email du candidat" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="nom" label="Nom *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="prenom" label="Prénom *" />
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
              <RHFTextField name="age" label="Âge (ans) *" type="number" />
            </Grid>
            <Grid item xs={12}>
              <RHFRadioGroup name="sexe" label="Sexe *" options={SEXE_OPTIONS} row spacing={4} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="etablissement_scolaire" label="Établissement scolaire *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="classe_actuelle" label="Classe actuelle *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="niveau_etude" label="Niveau d'étude *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="adresse" label="Adresse *" />
            </Grid>
          </Grid>
        </Paper>

        {/* Section 2 — Pièce d'identité du candidat */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            2. Pièce d'identité du candidat
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="cni_numero" label="Numéro de la pièce (CNI / passeport) *" />
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
                folder="inscriptions/stage"
                required
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Section 3 — Documents à joindre */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            3. Documents à joindre
          </Typography>
          <Alert severity="error" sx={{ mb: 2 }}>
            Tous les documents ci-dessous sont <strong>obligatoires</strong>.
          </Alert>
          <Stack spacing={3}>
            <UploadField
              name="photos_4x4_urls"
              label="2 photos 4x4 (au minimum)"
              accept="image/*"
              multiple
              folder="inscriptions/stage"
              required
            />
            <UploadField
              name="bulletin_url"
              label="Bulletin scolaire / relevé de notes / dernier diplôme"
              folder="inscriptions/stage"
            />
            <UploadField
              name="plan_localisation_candidat_url"
              label="Plan de localisation du candidat (image ou PDF)"
              folder="inscriptions/stage"
            />
          </Stack>
        </Paper>

        {/* Section 4 — Tarifs */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            4. Tarifs des stages
          </Typography>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table size="small" sx={{ '& .MuiTableCell-root': { p: { xs: 0.5, md: 1 } } }}>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: { xs: 11, md: 13 } }}>Type de stage</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: { xs: 11, md: 13 } }}>Filière</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: { xs: 11, md: 13 } }}>Niveau du candidat</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: { xs: 11, md: 13 } }}>Durée</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: { xs: 11, md: 13 } }}>Coût mensuel (FCFA)</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: { xs: 11, md: 13 } }}>Diplôme obtenu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { type: 'Stage de vacances', filiere: 'Menuiserie / Ébénisterie', niveau: 'BEPC et inférieur', duree: '1 à 3 mois', cout: 25000, diplome: 'ATTESTATION DE FIN DE STAGE' },
                  { type: 'Stage de vacances', filiere: 'Menuiserie / Ébénisterie', niveau: 'Bac et plus', duree: '1 à 3 mois', cout: 35000, diplome: '' },
                  { type: 'Stage de vacances', filiere: 'Construction Bois', niveau: 'BEPC et inférieur', duree: '1 à 3 mois', cout: 30000, diplome: '' },
                  { type: 'Stage de vacances', filiere: 'Construction Bois', niveau: 'Bac et plus', duree: '1 à 3 mois', cout: 40000, diplome: '' },
                  { type: 'Stage de vacances', filiere: 'Usinage CNC', niveau: 'BEPC et inférieur', duree: '1 à 3 mois', cout: 35000, diplome: '' },
                  { type: 'Stage de vacances', filiere: 'Usinage CNC', niveau: 'Bac et plus', duree: '1 à 3 mois', cout: 50000, diplome: '' },
                  { type: 'Stage de vacances', filiere: 'Marketing / Infographie / Vidéo / Web', niveau: 'BEPC et inférieur', duree: '1 à 3 mois', cout: 30000, diplome: '' },
                  { type: 'Stage de vacances', filiere: 'Marketing / Infographie / Vidéo / Web', niveau: 'Bac et plus', duree: '1 à 3 mois', cout: 45000, diplome: '' },
                  { type: 'Stage de vacances', filiere: 'Secrétariat / Community Management', niveau: 'Tous niveaux', duree: '1 à 3 mois', cout: 25000, diplome: '' },
                  { type: 'Stage académique', filiere: 'Toutes filières', niveau: 'Élèves / Étudiants', duree: 'Selon programme', cout: 20000, diplome: '' },
                  { type: 'Stage professionnel', filiere: 'Toutes filières', niveau: 'Diplômés', duree: 'Selon besoin', cout: 30000, diplome: '' },
                  { type: 'Stage pré-emploi', filiere: 'Toutes filières', niveau: 'Jeunes diplômés', duree: 'Selon évaluation', cout: 35000, diplome: '' },
                ].map((row, idx) => (
                  <TableRow key={idx} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontSize: { xs: 11, md: 13 } }}>{row.type}</TableCell>
                    <TableCell sx={{ fontSize: { xs: 11, md: 13 } }}>{row.filiere}</TableCell>
                    <TableCell sx={{ fontSize: { xs: 11, md: 13 } }}>{row.niveau}</TableCell>
                    <TableCell sx={{ fontSize: { xs: 11, md: 13 } }}>{row.duree}</TableCell>
                    <TableCell sx={{ fontSize: { xs: 11, md: 13 }, fontWeight: 600 }}>{row.cout.toLocaleString('fr-FR')}</TableCell>
                    <TableCell sx={{ fontSize: { xs: 11, md: 13 } }}>{row.diplome}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Section 5 — Frais & Paiement */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            5. Frais d'inscription & Paiement
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Montant à régler à l'inscription : 15 000 FCFA</strong> (non remboursable)
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="montant_mois" label="Montant du mois (FCFA)" type="number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="montant_3mois"
                label="Montant pour 3 mois (FCFA)"
                type="number"
                helperText="Réduction de 10% si paiement unique"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <RHFRadioGroup
              name="mode_paiement"
              label="Mode de paiement *"
              options={PAIEMENT_OPTIONS}
              row
              spacing={4}
            />
          </Box>

          {watchModePayment === 'Autre' && (
            <Box sx={{ mt: 2 }}>
              <RHFTextField name="mode_paiement_autre" label="Préciser le mode de paiement *" />
            </Box>
          )}

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

        {/* Section 6 — Engagements */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            5. Engagements
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Je m'engage à :
          </Typography>
          <RHFMultiCheckbox name="engagements" options={ENGAGEMENTS_OPTIONS} spacing={1} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="signature_participant" label="Signature du participant" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="date_signature_participant"
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Section 7 — Autorisation parentale */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            6. Autorisation parentale
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            À remplir pour les participants mineurs.
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="nom_parent" label="Nom du parent / tuteur *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="prenom_parent" label="Prénom du parent / tuteur *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="lien_parent" label="Lien avec le candidat *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="telephone_parent" label="Téléphone du parent *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email_parent" label="Email du parent" />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Pièce d'identité du parent / tuteur
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="parent_cni_numero" label="Numéro de la pièce" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="parent_cni_date_delivrance"
                label="Date de délivrance"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="parent_cni_lieu_delivrance" label="Lieu de délivrance" />
            </Grid>
            <Grid item xs={12}>
              <UploadField
                name="parent_cni_url"
                label="Téléverser la pièce d'identité du parent"
                folder="inscriptions/stage"
              />
            </Grid>
            <Grid item xs={12}>
              <UploadField
                name="parent_photos_4x4_urls"
                label="2 photos 4x4 du parent"
                accept="image/*"
                multiple
                folder="inscriptions/stage"
              />
            </Grid>
            <Grid item xs={12}>
              <UploadField
                name="plan_localisation_parent_url"
                label="Plan de localisation du parent (image ou PDF)"
                folder="inscriptions/stage"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="signature_parent" label="Signature du parent / tuteur" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="date_autorisation"
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
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
