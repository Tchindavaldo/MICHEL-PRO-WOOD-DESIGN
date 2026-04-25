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
} from '@mui/material';
// components
import FormProvider, {
  RHFTextField,
  RHFRadioGroup,
  RHFMultiCheckbox,
  RHFSelect,
} from 'src/components/hook-form';
// lib
import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

const LIEU_OPTIONS = [
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
  { label: 'Autre', value: 'Autre' },
];

const DOCUMENTS_OPTIONS = [
  { label: '1 photocopie de l\'acte de naissance', value: 'acte_naissance' },
  { label: '1 photo d\'identité', value: 'photo_identite' },
  { label: 'Autorisation parentale signée (pour les mineurs)', value: 'autorisation_parentale' },
  { label: 'Fiche d\'inscription remplie', value: 'fiche_inscription' },
  { label: 'Paiement des frais d\'inscription', value: 'paiement' },
];

const ENGAGEMENTS_OPTIONS = [
  { label: 'Respecter le règlement intérieur et les consignes de sécurité', value: 'reglement' },
  { label: 'Participer activement à toutes les activités du stage', value: 'participation' },
  { label: 'Être assidu(e) et ponctuel(le)', value: 'assiduite' },
];

// ----------------------------------------------------------------------

type FormValuesProps = {
  annee: string;
  lieu: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  age: string;
  sexe: string;
  etablissement_scolaire: string;
  classe_actuelle: string;
  adresse: string;
  telephone_parent: string;
  documents_joints: string[];
  montant_mois: string;
  montant_3mois: string;
  mode_paiement: string;
  mode_paiement_autre: string;
  engagements: string[];
  signature_participant: string;
  date_signature_participant: string;
  nom_parent: string;
  nom_enfant: string;
  signature_parent: string;
  date_autorisation: string;
  contact_parent: string;
};

const StageVacancesSchema = Yup.object().shape({
  annee: Yup.string().required('L\'année est requise'),
  lieu: Yup.string().required('Le lieu est requis'),
  nom: Yup.string().required('Le nom est requis'),
  prenom: Yup.string().required('Le prénom est requis'),
  date_naissance: Yup.string().required('La date de naissance est requise'),
  age: Yup.number()
    .typeError('L\'âge doit être un nombre')
    .required('L\'âge est requis')
    .positive('L\'âge doit être positif')
    .integer('L\'âge doit être un entier'),
  sexe: Yup.string().required('Le sexe est requis'),
  etablissement_scolaire: Yup.string().required('L\'établissement est requis'),
  classe_actuelle: Yup.string().required('La classe est requise'),
  adresse: Yup.string().required('L\'adresse est requise'),
  telephone_parent: Yup.string().required('Le téléphone est requis'),
  mode_paiement: Yup.string().required('Le mode de paiement est requis'),
  mode_paiement_autre: Yup.string().when('mode_paiement', {
    is: 'Autre',
    then: (schema) => schema.required('Veuillez préciser le mode de paiement'),
    otherwise: (schema) => schema.nullable(),
  }),
  engagements: Yup.array().min(1, 'Veuillez accepter au moins un engagement'),
  nom_parent: Yup.string().required('Le nom du parent/tuteur est requis'),
  contact_parent: Yup.string().required('Le contact du parent/tuteur est requis'),
});

const defaultValues: FormValuesProps = {
  annee: '',
  lieu: '',
  nom: '',
  prenom: '',
  date_naissance: '',
  age: '',
  sexe: '',
  etablissement_scolaire: '',
  classe_actuelle: '',
  adresse: '',
  telephone_parent: '',
  documents_joints: [],
  montant_mois: '',
  montant_3mois: '',
  mode_paiement: '',
  mode_paiement_autre: '',
  engagements: [],
  signature_participant: '',
  date_signature_participant: '',
  nom_parent: '',
  nom_enfant: '',
  signature_parent: '',
  date_autorisation: '',
  contact_parent: '',
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
        mode_paiement_autre: data.mode_paiement !== 'Autre' ? null : data.mode_paiement_autre,
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
            STAGE DE VACANCES
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Arts et Meuble de l'ouest & Michel Pro Wood Design
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Lieu : Entrée école normale Bafoussam & Foyer Lagouen
          </Typography>
        </Box>

        {/* Année & Lieu */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="annee" label="Année" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect name="lieu" label="Lieu">
                {LIEU_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
          </Grid>
        </Paper>

        {/* Section 1 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            1. Informations du participant
          </Typography>
          <Grid container spacing={2}>
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
              <RHFRadioGroup
                name="sexe"
                label="Sexe *"
                options={SEXE_OPTIONS}
                row
                spacing={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="etablissement_scolaire" label="Établissement scolaire *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="classe_actuelle" label="Classe actuelle *" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="adresse" label="Adresse *" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="telephone_parent" label="Téléphone du parent / tuteur *" />
            </Grid>
          </Grid>
        </Paper>

        {/* Section 2 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            2. Documents à joindre
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
        </Paper>

        {/* Section 3 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            3. Frais d'inscription
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Montant à régler à l'inscription : 15 000 FCFA</strong> (non remboursable)
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="montant_mois"
                label="Montant du mois (FCFA)"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="montant_3mois"
                label="Montant pour 3 mois (FCFA)"
                type="number"
                helperText="Réduction de 10% si paiement unique pour 3 mois"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <RHFRadioGroup
              name="mode_paiement"
              label="Mode de paiement"
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
        </Paper>

        {/* Section 4 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            4. Engagements
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Je m'engage à :
          </Typography>
          <RHFMultiCheckbox
            name="engagements"
            options={ENGAGEMENTS_OPTIONS}
            spacing={1}
          />
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

        {/* Section 5 */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            5. Autorisation parentale
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            À remplir pour les participants mineurs. Le parent/tuteur autorise son enfant à
            participer au Stage de Vacances organisé par la Société Arts et Meuble de l'ouest &
            Michel Pro Wood Design.
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="nom_parent" label="Je soussigné(e) — Parent / Tuteur légal" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="nom_enfant" label="Parent / Tuteur légal de" />
            </Grid>
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
            <Grid item xs={12} md={6}>
              <RHFTextField name="contact_parent" label="Contact" />
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
