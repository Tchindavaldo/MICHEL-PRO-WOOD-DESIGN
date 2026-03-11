// layouts
import MainLayout from 'src/layouts/main';
// lib
import {
  getTestimonials,
  getPartners,
  getValues,
  getPageContent,
  getAboutStats,
  getAboutTimeline
} from 'src/lib/supabaseData';
// sections
import { AboutView } from 'src/sections/michel-pro-wood/about/view';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export async function getStaticProps() {
  // Fetch data from Supabase
  const [
    supabaseTestimonials,
    supabasePartners,
    supabaseValues,
    pageContent,
    aboutStats,
    aboutTimeline
  ] = await Promise.all([
    getTestimonials(),
    getPartners(),
    getValues(),
    getPageContent('about'),
    getAboutStats(),
    getAboutTimeline()
  ]);

  // Map Supabase testimonials to component format
  const mappedTestimonials = supabaseTestimonials.map((testimonial: any, index: number) => ({
    id: testimonial.id || `testimonial-${Math.random()}`,
    name: testimonial.client_name || 'Client',
    role: testimonial.client_position || testimonial.client_company || 'Client',
    avatar: testimonial.client_avatar_url || `/assets/images/avatar/avatar_${(index % 25) + 1}.jpg`,
    rating: testimonial.rating || 5,
    review: testimonial.testimonial_text || '',
  }));

  // Map Supabase partners to component format
  const mappedPartners = supabasePartners.map((partner: any) => ({
    id: partner.id || `partner-${Math.random()}`,
    name: partner.name || 'Partner',
    image: partner.logo_url || '/assets/logo/default.svg',
  }));

  // Map Supabase values to component format
  const mappedValues = supabaseValues.map((value: any) => ({
    title: value.title,
    description: value.description,
    icon: value.icon_url,
  }));

  return {
    props: {
      testimonials: mappedTestimonials,
      partners: mappedPartners,
      values: mappedValues,
      pageContent,
      aboutStats,
      aboutTimeline
    },
    revalidate: 60,
  };
}

export default function AboutPage({ 
  testimonials, 
  partners, 
  values, 
  pageContent,
  aboutStats,
  aboutTimeline
}: { 
  testimonials: any[]; 
  partners: any[];
  values: any[];
  pageContent: any[];
  aboutStats: any[];
  aboutTimeline: any[];
}) {
  return (
    <AboutView 
      testimonials={testimonials} 
      partners={partners} 
      values={values} 
      pageContent={pageContent}
      aboutStats={aboutStats}
      aboutTimeline={aboutTimeline}
    />
  );
}

AboutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
