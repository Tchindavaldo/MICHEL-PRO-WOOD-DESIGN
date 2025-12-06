// layouts
import MainLayout from 'src/layouts/main';
// sections
// lib
import { 
  getServices, 
  getServiceIncludes, 
  getServiceBenefits, 
  getPricingPlans, 
  getProcessSteps, 
  getTestimonials, 
  getBlogPosts,
  getPageContent 
} from 'src/lib/supabaseData';
// sections
import { ServicesView } from 'src/sections/michel-pro-wood/services/view';

// ----------------------------------------------------------------------

ServicesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicesPage({ 
  services, 
  serviceIncludes, 
  serviceBenefits, 
  plans, 
  processSteps, 
  testimonials, 
  posts,
  pageContent 
}: any) {
  return (
    <ServicesView 
      services={services}
      serviceIncludes={serviceIncludes}
      serviceBenefits={serviceBenefits}
      plans={plans}
      processSteps={processSteps}
      testimonials={testimonials}
      posts={posts}
      pageContent={pageContent}
    />
  );
}

export async function getStaticProps() {
  // Fetch data from Supabase
  const [
    services, 
    serviceIncludes, 
    serviceBenefits, 
    plans, 
    processSteps, 
    testimonials, 
    posts,
    pageContent
  ] = await Promise.all([
    getServices(),
    getServiceIncludes(),
    getServiceBenefits(),
    getPricingPlans(),
    getProcessSteps(),
    getTestimonials(),
    getBlogPosts(),
    getPageContent('services', 'hero')
  ]);

  // Map services (SAME AS HOMEPAGE)
  const mappedServices = services.map((service: any) => ({
    name: service.name,
    content: service.description,
    path: '/services',
    icon: service.icon_url || '/assets/icons/ic_sketch_design.svg',
    color: service.color || 'primary',
  }));

  // Map testimonials (SAME AS HOMEPAGE)
  const mappedTestimonials = testimonials.map((testimonial: any, index: number) => ({
    id: testimonial.id || `testimonial-${Math.random()}`,
    name: testimonial.client_name || 'Client',
    role: testimonial.client_position || testimonial.client_company || 'Client',
    avatar: testimonial.client_avatar_url || `/assets/images/avatar/avatar_${(index % 25) + 1}.jpg`,
    rating: testimonial.rating || 5,
    review: testimonial.testimonial_text || '',
  }));

  // Map posts (same mapping as homepage)
  const mappedPosts = posts.slice(0, 4).map((post: any) => ({
    id: post.id || `post-${Math.random()}`,
    title: post.title || 'Article',
    duration: `${Math.floor(Math.random() * 5) + 2} min read`,
    coverImg: post.cover_image_url || '/assets/images/marketing/marketing_1.jpg',
    author: {
      name: post.author_name || 'MICHEL PRO WOOD DESIGN',
      picture: post.author_avatar_url || '/favicon/logo.png',
    },
    createdAt: new Date(post.published_at || post.created_at || new Date()).toISOString(),
  }));

  // Map process steps (same mapping as homepage)
  const defaultIcons = [
    '/assets/icons/ic_sketch_design.svg',
    '/assets/icons/ic_creativity.svg',
    '/assets/icons/ic_optimization.svg',
    '/assets/icons/ic_checklist.svg',
  ];
  const mappedProcessSteps = processSteps.map((step: any, index: number) => ({
    id: step.id || `step-${Math.random()}`,
    stepNumber: step.step_number || `ÉTAPE ${index + 1}`,
    title: step.title || 'Étape',
    description: step.description || '',
    imageUrl: step.image_url || defaultIcons[index % defaultIcons.length],
  }));

  // Map pricing plans to ensure options is properly formatted (same as homepage)
  const mappedPlans = plans.map((plan: any) => {
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
      options: sortedFeatures.length > 0 ? sortedFeatures : [],
      icon: plan.icon_url || '/assets/icons/pricing/ic_plan_basic01.svg',
      color: plan.button_color || 'primary',
      buttonText: plan.button_text || 'S\'inscrire',
      isRecommended: plan.is_recommended || false,
    };
  });

  return {
    props: {
      services: mappedServices,
      serviceIncludes,
      serviceBenefits,
      plans: mappedPlans,
      processSteps: mappedProcessSteps,
      testimonials: mappedTestimonials,
      posts: mappedPosts,
      pageContent
    },
    revalidate: 60,
  };
}
