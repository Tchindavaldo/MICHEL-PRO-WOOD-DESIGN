// layouts
import MainLayout from 'src/layouts/main';
// lib
import { getTestimonials, getPartners } from 'src/lib/supabaseData';
// sections
import { AboutView } from 'src/sections/michel-pro-wood/about/view';

// ----------------------------------------------------------------------

AboutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export async function getStaticProps() {
  // Fetch testimonials and partners from Supabase
  const [supabaseTestimonials, supabasePartners] = await Promise.all([
    getTestimonials(),
    getPartners(),
  ]);

  // Map Supabase testimonials to component format (SAME AS HOMEPAGE)
  const mappedTestimonials = supabaseTestimonials.map((testimonial: any, index: number) => ({
    id: testimonial.id || `testimonial-${Math.random()}`,
    name: testimonial.client_name || 'Client',
    role: testimonial.client_position || testimonial.client_company || 'Client',
    avatar: testimonial.client_avatar_url || `/assets/images/avatar/avatar_${(index % 25) + 1}.jpg`,
    rating: testimonial.rating || 5,
    review: testimonial.testimonial_text || '',
  }));

  // Map Supabase partners to component format (SAME AS HOMEPAGE)
  const mappedPartners = supabasePartners.map((partner: any) => ({
    id: partner.id || `partner-${Math.random()}`,
    name: partner.name || 'Partner',
    image: partner.logo_url || '/assets/logo/default.svg',
  }));

  return {
    props: {
      testimonials: mappedTestimonials,
      partners: mappedPartners,
    },
    revalidate: 60,
  };
}

export default function AboutPage({ testimonials, partners }: { testimonials: any[]; partners: any[] }) {
  return <AboutView testimonials={testimonials} partners={partners} />;
}
