// @mui
import { Container } from '@mui/material';
// sections
import { MarketingCaseStudyList } from 'src/sections/_marketing/case-study/list';
// data
import { REALIZATIONS_CASE_STUDIES } from 'src/assets/data/michel-pro-wood/realizations-data';
//
import HomeGetQuote from '../../home/home-get-quote';
import RealizationsHero from '../realizations-hero';

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
