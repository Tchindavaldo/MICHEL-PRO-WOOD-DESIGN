// @mui
import { Container } from '@mui/material';
// sections
import { MarketingCaseStudyList } from 'src/sections/_marketing/case-study/list';
//
import HomeGetQuote from '../../home/home-get-quote';
import RealizationsHero from '../realizations-hero';

// ----------------------------------------------------------------------

type Props = {
  realizations?: any[];
  features?: any[];
  pageContent?: any[];
};

export default function RealizationsView({ realizations = [], features = [], pageContent = [] }: Props) {
  const heroContent = pageContent?.find(item => item.section_key === 'hero');

  return (
    <>
      <RealizationsHero 
        title={heroContent?.title}
        subtitle={heroContent?.subtitle}
        description={heroContent?.content}
        overline={heroContent?.metadata?.overline}
        imageUrl={heroContent?.image_url}
        features={features}
      />

      <Container sx={{ my: 10 }}>
        <MarketingCaseStudyList caseStudies={realizations} />
      </Container>

      <HomeGetQuote />
    </>
  );
}
