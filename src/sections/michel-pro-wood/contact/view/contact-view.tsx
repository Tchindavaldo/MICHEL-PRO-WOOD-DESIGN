//
import ContactMarketing from 'src/sections/contact/marketing/ContactMarketing';
import HomeTestimonials from '../../home/home-testimonials';
import HomeGetQuote from '../../home/home-get-quote';

// ----------------------------------------------------------------------

type Props = {
  contactData?: {
    title: string;
    address: string;
    phones: string[];
    email: string;
    openingHours: string[];
  };
  testimonials?: any[];
  pageContent?: any[];
};

export default function ContactView({ contactData, testimonials = [], pageContent = [] }: Props) {
  return (
    <>
      <ContactMarketing contactData={contactData} />

      <HomeTestimonials testimonials={testimonials} />

      <HomeGetQuote />
    </>
  );
}
