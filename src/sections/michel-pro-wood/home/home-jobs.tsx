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

// ----------------------------------------------------------------------

type Props = {
  jobs?: {
    id: string;
    title: string;
    type?: string;
    main_missions?: { text: string }[];
    profile_requirements?: { text: string }[];
    benefits?: { text: string }[];
    application_files?: { text: string }[];
    contact_phones?: string[];
    contact_email?: string;
    contact_location?: string;
    content?: React.ReactNode | string;
  }[];
};

export default function HomeJobs({ jobs = [] }: Props) {
  const isMdUp = useResponsive('up', 'md');

  // Use provided jobs or fallback to default
  const displayJobs = jobs.length > 0 ? jobs : JOBS;

  const [expanded, setExpanded] = useState<string | false>(displayJobs[0]?.id || false);

  const handleChangeExpanded =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const renderContent = (job: any) => {
    // If job has old-style content (from JOBS constant), use it
    if (job.content) {
      if (typeof job.content === 'string') {
        return <div dangerouslySetInnerHTML={{ __html: job.content }} />;
      }
      return job.content;
    }

    // Otherwise, render from structured data (from database)
    return (
      <Stack spacing={2}>
        {/* Missions Principales */}
        {job.main_missions && job.main_missions.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
              Missions Principales :
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {job.main_missions.map((mission: any, idx: number) => (
                <li key={idx}>{mission.text}</li>
              ))}
            </ul>
          </>
        )}

        {/* Profil Recherché */}
        {job.profile_requirements && job.profile_requirements.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
              Profil Recherché :
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {job.profile_requirements.map((req: any, idx: number) => (
                <li key={idx}>{req.text}</li>
              ))}
            </ul>
          </>
        )}

        {/* Avantages */}
        {job.benefits && job.benefits.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
              Avantages du {job.type} :
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {job.benefits.map((benefit: any, idx: number) => (
                <li key={idx}>{benefit.text}</li>
              ))}
            </ul>
          </>
        )}

        {/* Dossier de Candidature */}
        {job.application_files && job.application_files.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
              Dossier de Candidature :
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {job.application_files.map((file: any, idx: number) => (
                <li key={idx}>{file.text}</li>
              ))}
            </ul>
          </>
        )}

        {/* Contact */}
        {(job.contact_phones?.length > 0 || job.contact_email || job.contact_location) && (
          <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: 'text.secondary' }}>
            {job.contact_phones && job.contact_phones.length > 0 && (
              <>
                <strong>Contact :</strong> {job.contact_phones.join(' / ')} <br />
              </>
            )}
            {job.contact_email && (
              <>
                <strong>Email :</strong> {job.contact_email} <br />
              </>
            )}
            {job.contact_location && (
              <>
                <strong>Lieu :</strong> {job.contact_location}
              </>
            )}
          </Typography>
        )}
      </Stack>
    );
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

          {displayJobs.map((job) => (
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

              <AccordionDetails>{renderContent(job)}</AccordionDetails>
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
