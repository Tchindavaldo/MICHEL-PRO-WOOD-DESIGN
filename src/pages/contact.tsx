// layouts
import MainLayout from 'src/layouts/main';
// lib
import { 
  getContactInfo, 
  getTestimonials, 
  getPageContent 
} from 'src/lib/supabaseData';
// sections
import { ContactView } from 'src/sections/michel-pro-wood/contact/view';


// ----------------------------------------------------------------------

export async function getStaticProps() {
  const [
    contactInfo,
    testimonials,
    pageContent
  ] = await Promise.all([
    getContactInfo(),
    getTestimonials(),
    getPageContent('contact')
  ]);

  // Map testimonials to component format
  const mappedTestimonials = testimonials.map((testimonial: any, index: number) => ({
    id: testimonial.id || `testimonial-${Math.random()}`,
    name: testimonial.client_name || 'Client',
    role: testimonial.client_position || testimonial.client_company || 'Client',
    avatar: testimonial.client_avatar_url || `/assets/images/avatar/avatar_${(index % 25) + 1}.jpg`,
    rating: testimonial.rating || 5,
    review: testimonial.testimonial_text || '',
  }));

  // Organize contact information from multiple rows
  const contactData = {
    title: contactInfo.find((item: any) => item.section_key === 'general')?.title || 'Prêt à Démarrer Votre Projet ?',
    address: contactInfo.find((item: any) => item.section_key === 'address')?.content?.address || 'Yaoundé, Cameroun',
    phones: contactInfo.find((item: any) => item.section_key === 'phones')?.content?.phones || ['+237 6 96 50 34 39', '+237 6 50 34 39 96'],
    email: contactInfo.find((item: any) => item.section_key === 'email')?.content?.email || 'contact@michelprowood.com',
    openingHours: contactInfo.find((item: any) => item.section_key === 'hours')?.content?.schedule || ['Lun-Ven : 8h00 — 18h00', 'Sam : 8h00 — 14h00'],
  };

  return {
    props: {
      contactData,
      testimonials: mappedTestimonials,
      pageContent
    },
    revalidate: 60,
  };
}

export default function ContactPage({ contactData, testimonials, pageContent }: any) {
  return <ContactView contactData={contactData} testimonials={testimonials} pageContent={pageContent} />;
}

ContactPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
