import { useState } from 'react';
// @mui
import {
  Stack,
  Container,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const JOBS = [
  {
    id: 'job1',
    title: 'Stage Professionnel - Community Manager & Assistant(e) Administratif(ve)',
    content: (
      <Stack spacing={2}>
        <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>Missions Principales :</Typography>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>Gérer et développer les réseaux sociaux de l'entreprise (Facebook, Instagram, TikTok, WhatsApp Business, etc.).</li>
          <li>Créer, programmer et publier du contenu créatif et pertinent.</li>
          <li>Animer la communauté en ligne (réponses aux messages, commentaires, publications interactives).</li>
          <li>Réaliser des visuels (Canva ou équivalent) et supports marketing digitaux.</li>
          <li>Assurer des tâches administratives de base (accueil, gestion des appels, organisation des dossiers).</li>
          <li>Apporter un appui dans la gestion comptable quotidienne.</li>
        </ul>

        <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>Profil Recherché :</Typography>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>Étudiant(e), jeune diplômé(e) ou personne en reconversion (communication, marketing digital, gestion ou équivalent).</li>
          <li>Bonne maîtrise des réseaux sociaux et des outils de création graphique (Meta Business Suite, Canva, etc.).</li>
          <li>Bonnes capacités rédactionnelles en français.</li>
          <li>Motivation, sens de l'organisation, créativité et rigueur.</li>
          <li>La connaissance du secteur bois / ameublement est un plus.</li>
        </ul>

        <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>Avantages du Stage :</Typography>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>La Formation pratique et encadrement professionnel.</li>
          <li>Développement de compétences réelles en community management et gestion administrative.</li>
          <li>Opportunité d'embauche directe après la période de stage (pré-emploi).</li>
        </ul>
        
        <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: 'text.secondary' }}>
            <strong>Contact :</strong> 696 10 36 72 / 683 69 64 62 <br/>
            <strong>Email :</strong> michelprowooddesign@gmail.com <br/>
            <strong>Lieu :</strong> Bafoussam Baleng - Foyer Lagouen
        </Typography>
      </Stack>
    ),
  },
  {
    id: 'job2',
    title: 'Recrutement - Menuisiers et Ébénistes',
    content: (
      <Stack spacing={2}>
        <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>Missions Principales :</Typography>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>Réaliser des ouvrages en bois (meubles, portes, fenêtres, cuisines, charpentes, etc.).</li>
          <li>Assurer le montage, l'assemblage et la finition des produits.</li>
          <li>Participer à l'entretien et au rangement de l'atelier.</li>
          <li>Respecter les normes de qualité, sécurité et délais fixés.</li>
        </ul>

        <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>Profil Recherché :</Typography>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>Avoir une formation en menuiserie et ébénisterie (CAP, CQP, BEP, ou équivalent).</li>
          <li>Justifier d'une expérience pratique dans le travail du bois (atelier ou chantier).</li>
          <li>Être rigoureux, ponctuel, organisé et capable de travailler en équipe.</li>
          <li>Avoir le sens de la créativité et de l'initiative.</li>
          <li>Des compétences en sculpture, tapisserie et finition seront des atouts.</li>
        </ul>

        <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>Dossier de Candidature :</Typography>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>Lettre de motivation, CV actualisé.</li>
          <li>Copie du diplôme ou attestation de formation.</li>
          <li>Copie des attestations ou certificats de travail (si disponibles).</li>
        </ul>

        <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: 'text.secondary' }}>
            <strong>Contact :</strong> 696 10 36 72 / 683 69 64 62 <br/>
            <strong>Email :</strong> michelprowooddesign@gmail.com <br/>
            <strong>Lieu :</strong> Bafoussam (Foyer Lagouenne, Ouest Cameroun)
        </Typography>
      </Stack>
    ),
  },
];

export default function HomeJobs() {
  const isMdUp = useResponsive('up', 'md');

  const [expanded, setExpanded] = useState<string | false>(JOBS[0].id);

  const handleChangeExpanded =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid xs={12} md={6} lg={6}>
          <Stack spacing={2} sx={{ mb: 5, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="overline" color="text.disabled">
              Carrières
            </Typography>

            <Typography variant="h2">Offres de Stage & Emploi</Typography>
            
            <Typography sx={{ color: 'text.secondary' }}>
              Rejoignez notre équipe dynamique et participez à des projets passionnants.
            </Typography>
          </Stack>

          {JOBS.map((job) => (
            <Accordion
              key={job.id}
              expanded={expanded === job.id}
              onChange={handleChangeExpanded(job.id)}
            >
              <AccordionSummary>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                  {job.title}
                </Typography>
                <Iconify
                  width={24}
                  icon={expanded === job.id ? 'carbon:subtract' : 'carbon:add'}
                />
              </AccordionSummary>

              <AccordionDetails>{job.content}</AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        {isMdUp && (
          <Grid xs={12} md={6} lg={5}>
            <Image alt="jobs" src="/assets/illustrations/illustration_faqs.svg" />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
