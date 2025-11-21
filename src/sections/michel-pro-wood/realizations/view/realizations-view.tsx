// @mui
import { Container } from '@mui/material';
//
import HomeTestimonials from '../../home/home-testimonials';
import HomeLatestPosts from '../../home/home-latest-posts';
import HomeGetQuote from '../../home/home-get-quote';
import HomeRealizations from '../../home/home-realizations';
import RealizationsHero from '../realizations-hero';
import { MarketingCaseStudyList } from 'src/sections/_marketing/case-study/list';
import { REALIZATIONS_CASE_STUDIES } from 'src/assets/data/michel-pro-wood/realizations-data';

// ----------------------------------------------------------------------

export default function RealizationsView() {
  return (
    <>
      <RealizationsHero />
 

      <Container sx={{ my: 10 }}>
        <MarketingCaseStudyList caseStudies={REALIZATIONS_CASE_STUDIES} />
      </Container>
 
 

      <HomeGetQuote />
    </>
  );
}
