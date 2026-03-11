// React
import { useState, useEffect } from 'react';
// _mock
import { _brandsColor } from 'src/_mock';
// sections
import { OurClientsMarketingAbout } from 'src/sections/our-clients/marketing';
import HomeAbout from '../../home/home-about';
import HomeTestimonials from '../../home/home-testimonials';
import HomeGetQuote from '../../home/home-get-quote';
import {
  MarketingAbout,
  MarketingAboutStory,
  MarketingAboutOurVision,
  MarketingAboutCoreValues,
} from 'src/sections/_marketing/about';

// ----------------------------------------------------------------------

type Props = {
  testimonials?: any[];
  partners?: any[];
  values?: any[];
  pageContent?: any[];
  aboutStats?: any[];
  aboutTimeline?: any[];
};

export default function AboutView({ 
  testimonials = [], 
  partners = [], 
  values = [], 
  pageContent = [],
  aboutStats = [],
  aboutTimeline = []
}: Props) {
  const heroContent = pageContent?.find(item => item.section_key === 'hero');
  const storyContent = pageContent?.find(item => item.section_key === 'story');
  const valuesContent = pageContent?.find(item => item.section_key === 'values');
  const visionContent = pageContent?.find(item => item.section_key === 'vision');

  // Use provided partners or fallback to default brands
  const displayBrands = partners.length > 0 ? partners : _brandsColor;

  return (
    <>
      <MarketingAbout 
        title={heroContent?.title}
        subtitle={heroContent?.subtitle}
        description={heroContent?.content}
        stats={aboutStats}
      />

      <HomeAbout />

      <MarketingAboutOurVision 
        title={visionContent?.title}
        description={visionContent?.content}
        videoUrl={visionContent?.video_url}
      />

      {/* Section NOS VALEURS - Design Grille */}
      <MarketingAboutCoreValues 
        title={valuesContent?.title || 'Nos Valeurs Fondamentales'}
        description={valuesContent?.content}
        values={values}
      />

      {/* Section NOTRE HISTOIRE - Design Timeline */}
      <MarketingAboutStory 
        title={storyContent?.title || 'Notre Histoire'}
        description={storyContent?.content}
        timelines={aboutTimeline}
      />

      <OurClientsMarketingAbout brands={displayBrands} />

      <HomeTestimonials testimonials={testimonials} />

      <HomeGetQuote />
    </>
  );
}
