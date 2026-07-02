// layouts
import MainLayout from 'src/layouts/main';
// seo
import { Seo, breadcrumbJsonLd } from 'src/components/seo';
import { INDEXED_PAGES } from 'src/config-seo';
// sections
import HomeView from 'src/sections/michel-pro-wood/home/view/home-view';

const SEO = INDEXED_PAGES.find((p) => p.path === '/')!;

// ----------------------------------------------------------------------

// lib
import {
  getServices,
  getTestimonials,
  getPartners,
  getRealizations,
  getProducts,
  getBlogPosts,
  getJobs,
  getPricingPlans,
  getHeroSlides,
  getProcessSteps,
  getVideoSlides,
  getHomeAboutStats,
  getPageContent,
} from 'src/lib/supabaseData';
import { DEFAULT_HERO_SLIDES, DEFAULT_VIDEO_SLIDES, DEFAULT_REALIZATIONS } from 'src/lib/defaultHomeData';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export const getStaticProps = async () => {
  // Fetch services from Supabase
  const services = await getServices();

  // Map Supabase data to component format
  const mappedServices = services.map((service: any) => ({
    name: service.name,
    content: service.description,
    path: paths.michelProWood.services, // Or dynamic path if needed
    icon: service.icon_url || '/assets/icons/ic_sketch_design.svg',
    color: service.color || 'primary',
  }));

  // Fetch testimonials from Supabase
  const supabaseTestimonials = await getTestimonials();

  // Map Supabase testimonials to component format
  const mappedTestimonials = supabaseTestimonials.map((testimonial: any, index: number) => ({
    id: testimonial.id || `testimonial-${Math.random()}`,
    name: testimonial.client_name || 'Client',
    role: testimonial.client_position || testimonial.client_company || 'Client',
    avatar: testimonial.client_avatar_url || `/assets/images/avatar/avatar_${(index % 25) + 1}.jpg`,
    rating: testimonial.rating || 5,
    review: testimonial.testimonial_text || '',
  }));

  // Fetch partners from Supabase
  const supabasePartners = await getPartners();

  // Map Supabase partners to component format (brands)
  const mappedPartners = supabasePartners.map((partner: any) => ({
    id: partner.id || `partner-${Math.random()}`,
    name: partner.name || 'Partner',
    image: partner.logo_url || '/assets/logo/default.svg',
  }));

  // Fetch realizations from Supabase
  const supabaseRealizations = await getRealizations();

  // Map realizations to component format with fallback to default images
  const mappedRealizations = supabaseRealizations.length > 0
    ? supabaseRealizations.slice(0, 6).map((realization: any, index: number) => {
        // Check if realization has a valid cover image
        let coverImg = realization.cover_image_url;
        
        // If no image or invalid URL, use default image from DEFAULT_REALIZATIONS
        if (!coverImg || coverImg.trim() === '') {
          coverImg = DEFAULT_REALIZATIONS[index % DEFAULT_REALIZATIONS.length]?.cover_image_url || '/assets/images/michel-pro-wood/realisation/armoir .JPG';
        }
        
        return {
          id: realization.id || `realization-${Math.random()}`,
          title: realization.title || 'Projet',
          category: realization.wood_realization_categories?.name || 'Projet',
          coverImg,
          description: realization.description || realization.excerpt || '',
        };
      })
    : DEFAULT_REALIZATIONS.slice(0, 6).map((realization: any) => ({
        id: realization.id,
        title: realization.title,
        category: 'Projet',
        coverImg: realization.cover_image_url,
        description: realization.description,
      }));

  // Fetch products from Supabase
  const supabaseProducts = await getProducts();

  // Helper function to get default image based on product name
  const getDefaultProductImage = (productName: string): string => {
    const name = productName.toLowerCase();
    
    // Map product names to specific default images
    const imageMap: { [key: string]: string } = {
      'armoire': '/assets/images/michel-pro-wood/vente/armoir.jpg',
      'chaise': '/assets/images/michel-pro-wood/vente/chaise prmium en bois.JPG',
      'lit': '/assets/images/michel-pro-wood/vente/lit .JPG',
      'portail': '/assets/images/michel-pro-wood/vente/portail bois premium.jpg',
      'salle à manger': '/assets/images/michel-pro-wood/vente/table chaisse sale a manger.JPG',
      'ensemble': '/assets/images/michel-pro-wood/vente/table chaisse sale a manger.JPG',
      'terrasse': '/assets/images/michel-pro-wood/vente/terase bois premium.jpg',
      'table': '/assets/images/michel-pro-wood/vente/table salon.JPG',
    };

    // Find matching image based on keywords in product name
    for (const [keyword, imagePath] of Object.entries(imageMap)) {
      if (name.includes(keyword)) {
        return imagePath;
      }
    }

    // Default fallback
    return '/assets/images/product/product_1.png';
  };

  // Map Supabase products to component format
  const mappedProducts = supabaseProducts.slice(0, 8).map((product: any) => ({
    name: product.name || 'Produit',
    image: product.image_url || getDefaultProductImage(product.name || ''),
    price: product.price || 0,
  }));

  // Fetch blog posts from Supabase
  const supabasePosts = await getBlogPosts();

  // Map Supabase posts to component format
  const mappedPosts = supabasePosts.slice(0, 4).map((post: any) => ({
    id: post.id || `post-${Math.random()}`,
    title: post.title || 'Article',
    duration: `${Math.floor(Math.random() * 5) + 2} min read`, // Estimate or random
    coverImg: post.cover_image_url || '/assets/images/marketing/marketing_1.jpg',
    author: {
      name: post.author_name || 'MICHEL PRO WOOD DESIGN',
      picture: post.author_avatar_url || '/favicon/logo.png',
    },
    createdAt: new Date(post.published_at || post.created_at || new Date()).toISOString(), // Convert to string to avoid serialization issues with Date objects if any
  }));

  // Fetch jobs from Supabase
  const supabaseJobs = await getJobs();

  // Map Supabase jobs to component format with structured data
  const mappedJobs = supabaseJobs.map((job: any) => ({
    id: job.id || `job-${Math.random()}`,
    title: job.title || 'Poste',
    type: job.type || '',
    main_missions: job.main_missions || [],
    profile_requirements: job.profile_requirements || [],
    benefits: job.benefits || [],
    application_files: job.application_files || [],
    contact_phones: job.contact_phones || [],
    contact_email: job.contact_email || '',
    contact_location: job.contact_location || '',
  }));

  // Fetch pricing plans from Supabase
  const supabasePlans = await getPricingPlans();

  // Map Supabase plans to component format
  const mappedPlans = supabasePlans.map((plan: any) => {
    // Extract and sort features by display_order
    const features = plan.wood_pricing_plan_features || [];
    const sortedFeatures = features
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((f: any) => f.feature_text);

    return {
      license: plan.name || 'Plan',
      duration: plan.period || '1 an',
      price: plan.price?.toLocaleString('fr-FR') || '0',
      currency: plan.currency || 'FCFA',
      description: plan.description || '',
      options: sortedFeatures,
      icon: plan.icon_url || '/assets/icons/pricing/ic_plan_basic01.svg',
      color: plan.button_color || 'primary',
      buttonText: plan.button_text || 'S\'inscrire',
      isRecommended: plan.is_recommended || false,
    };
  });

  // Fetch hero slides from Supabase
  const supabaseSlides = await getHeroSlides();
  
  // Map slides to component format with fallback to default images
  const mappedSlides = supabaseSlides.length > 0 
    ? supabaseSlides.map((slide: any, index: number) => {
        // Check if slide has a valid image URL
        let imageUrl = slide.image_url;
        
        // If no image or invalid URL, use default image from DEFAULT_HERO_SLIDES
        if (!imageUrl || imageUrl.trim() === '') {
          imageUrl = DEFAULT_HERO_SLIDES[index % DEFAULT_HERO_SLIDES.length]?.image_url || '/assets/images/michel-pro-wood/hero/IMG_8705.JPG';
        } else if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
          imageUrl = `/assets/images/${imageUrl}`;
        }
        
        return {
          id: slide.id || `slide-${Math.random()}`,
          title: slide.title || 'Titre',
          description: slide.description || '',
          coverUrl: imageUrl,
          hasVideo: !!slide.video_url,
          videoUrl: slide.video_url || null,
          label: slide.label || slide.button_text || '',
        };
      })
    : DEFAULT_HERO_SLIDES.map((slide: any) => ({
        id: slide.id,
        title: slide.title,
        description: slide.description,
        coverUrl: slide.image_url,
        hasVideo: !!slide.video_url,
        videoUrl: slide.video_url,
        label: slide.label,
      }));

  // Fetch process steps from Supabase
  const supabaseProcessSteps = await getProcessSteps();

  // Default icons for process steps (fallback if no image_url from Supabase)
  const defaultIcons = [
    '/assets/icons/ic_sketch_design.svg',
    '/assets/icons/ic_creativity.svg',
    '/assets/icons/ic_optimization.svg',
    '/assets/icons/ic_checklist.svg',
  ];

  // Map Supabase process steps to component format
  const mappedProcessSteps = supabaseProcessSteps.map((step: any, index: number) => ({
    id: step.id || `step-${Math.random()}`,
    stepNumber: step.step_number || `ÉTAPE ${index + 1}`,
    title: step.title || 'Étape',
    description: step.description || '',
    imageUrl: step.image_url || defaultIcons[index % defaultIcons.length], // Use default icon if no image_url
  }));

  // Fetch video slides from Supabase
  const supabaseVideoSlides = await getVideoSlides();

  // Map video slides to component format with fallback to default videos
  const mappedVideoSlides = supabaseVideoSlides.length > 0
    ? supabaseVideoSlides.map((slide: any, index: number) => {
        // Check if slide has a valid video URL
        let videoUrl = slide.video_url;
        
        // If no video or invalid URL, use default video from DEFAULT_VIDEO_SLIDES
        if (!videoUrl || videoUrl.trim() === '') {
          videoUrl = DEFAULT_VIDEO_SLIDES[index % DEFAULT_VIDEO_SLIDES.length]?.video_url || '/assets/images/michel-pro-wood/video/video5839317998111824221.mp4';
        }
        
        return {
          id: slide.id || `video-${Math.random()}`,
          title: slide.title || 'Vidéo',
          description: slide.description || '',
          video_url: videoUrl,
          cta_text: slide.cta_text || 'En savoir plus',
          cta_link: slide.cta_link || '#',
        };
      })
    : DEFAULT_VIDEO_SLIDES.map((slide: any) => ({
        id: slide.id,
        title: slide.title,
        description: slide.description,
        video_url: slide.video_url,
        cta_text: slide.cta_text,
        cta_link: slide.cta_link,
      }));

  // Fetch page content for headers (managed in services page CMS)
  const servicesPageContent = await getPageContent('services');
  const servicesHeader = servicesPageContent?.find((item: any) => item.section_key === 'services_header');
  const pricingHeader = servicesPageContent?.find((item: any) => item.section_key === 'pricing_header');
  const howItWorkHeader = servicesPageContent?.find((item: any) => item.section_key === 'how_it_work');

  return {
    props: {
      services: mappedServices,
      testimonials: mappedTestimonials,
      partners: mappedPartners,
      realizations: mappedRealizations,
      products: mappedProducts,
      posts: mappedPosts,
      jobs: mappedJobs,
      plans: mappedPlans,
      slides: mappedSlides,
      processSteps: mappedProcessSteps,
      videoSlides: mappedVideoSlides,
      servicesHeader: servicesHeader || null,
      pricingHeader: pricingHeader || null,
      processHeader: howItWorkHeader || null,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default function HomePage({ 
  services, 
  testimonials, 
  partners,
  realizations,
  products,
  posts,
  jobs,
  plans,
  slides,
  processSteps,
  videoSlides,
  servicesHeader,
  pricingHeader,
  processHeader,
}: { 
  services: any[]; 
  testimonials: any[]; 
  partners: any[];
  realizations: any[];
  products: any[];
  posts: any[];
  jobs: any[];
  plans: any[];
  slides: any[];
  processSteps: any[];
  videoSlides: any[];
  servicesHeader: any;
  pricingHeader: any;
  processHeader: any;
}) {
  return (
    <>
      <Seo
        title={SEO.title}
        description={SEO.description}
        canonical="/"
        jsonLd={breadcrumbJsonLd([{ name: 'Accueil', path: '/' }])}
      />

      <HomeView
        services={services} 
        testimonials={testimonials} 
        partners={partners} 
        realizations={realizations} 
        products={products}
        posts={posts}
        jobs={jobs}
        plans={plans}
        slides={slides}
        processSteps={processSteps}
        videoSlides={videoSlides}
        servicesHeader={servicesHeader}
        pricingHeader={pricingHeader}
        processHeader={processHeader}
      />
    </>
  );
}
