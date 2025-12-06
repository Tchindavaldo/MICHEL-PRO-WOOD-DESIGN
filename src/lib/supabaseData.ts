import { supabase } from './supabase';

// =====================================================
// SERVICES
// =====================================================
export async function getServices() {
    // console.log('getServices called!'); // DEBUG LOG
    try {
        const { data, error } = await supabase
            .from('wood_services')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching services:', error);
        return [];
    }
}

// =====================================================
// REALIZATIONS
// =====================================================
export async function getRealizations() {
    try {
        const { data, error } = await supabase
            .from('wood_realizations')
            .select(`
        *,
        wood_realization_categories (
          id,
          name,
          slug
        )
      `)
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching realizations:', error);
        return [];
    }
}

export async function getRealizationBySlug(slug: string) {
    try {
        const { data, error } = await supabase
            .from('wood_realizations')
            .select(`
        *,
        wood_realization_categories (
          id,
          name,
          slug
        ),
        wood_realization_images (
          id,
          image_url,
          caption,
          display_order
        )
      `)
            .eq('slug', slug)
            .eq('is_active', true)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        // console.error('Error fetching realization:', error);
        return null;
    }
}

export async function getRealizationCategories() {
    try {
        const { data, error } = await supabase
            .from('wood_realization_categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching realization categories:', error);
        return [];
    }
}

// =====================================================
// PRODUCTS
// =====================================================
export async function getProducts() {
    try {
        const { data, error } = await supabase
            .from('wood_products')
            .select(`
        *,
        wood_product_categories (
          id,
          name,
          slug
        )
      `)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching products:', error);
        return [];
    }
}

export async function getProductBySlug(slug: string) {
    try {
        const { data, error } = await supabase
            .from('wood_products')
            .select(`
        *,
        wood_product_categories (
          id,
          name,
          slug
        )
      `)
            .eq('slug', slug)
            .eq('is_active', true)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        // console.error('Error fetching product:', error);
        return null;
    }
}

export async function getProductCategories() {
    try {
        const { data, error } = await supabase
            .from('wood_product_categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching product categories:', error);
        return [];
    }
}

// =====================================================
// BLOG POSTS
// =====================================================
export async function getBlogPosts() {
    try {
        const { data, error } = await supabase
            .from('wood_posts')
            .select('*')
            .eq('is_published', true)
            .order('published_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPostBySlug(slug: string) {
    try {
        const { data, error } = await supabase
            .from('wood_posts')
            .select('*')
            .eq('slug', slug)
            .eq('is_published', true)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        // console.error('Error fetching blog post:', error);
        return null;
    }
}

// =====================================================
// TESTIMONIALS
// =====================================================
export async function getTestimonials() {
    try {
        const { data, error } = await supabase
            .from('wood_testimonials')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching testimonials:', error);
        return [];
    }
}

// =====================================================
// PARTNERS
// =====================================================
export async function getPartners() {
    try {
        const { data, error } = await supabase
            .from('wood_partners')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching partners:', error);
        return [];
    }
}

// =====================================================
// HERO SLIDES
// =====================================================
export async function getHeroSlides() {
    try {
        const { data, error } = await supabase
            .from('wood_hero_slides')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching hero slides:', error);
        return [];
    }
}

// =====================================================
// JOBS
// =====================================================
export async function getJobs() {
    try {
        const { data, error } = await supabase
            .from('wood_jobs')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching jobs:', error);
        return [];
    }
}

// =====================================================
// PRICING PLANS
// =====================================================
export async function getPricingPlans() {
    try {
        const { data, error } = await supabase
            .from('wood_pricing_plans')
            .select(`
                *,
                wood_pricing_plan_features (
                    id,
                    feature_text,
                    display_order,
                    is_included
                )
            `)
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching pricing plans:', error);
        return [];
    }
}

// =====================================================
// PROCESS STEPS
// =====================================================
export async function getProcessSteps() {
    try {
        const { data, error } = await supabase
            .from('wood_process_steps')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching process steps:', error);
        return [];
    }
}

// =====================================================
// VIDEO SLIDES
// =====================================================
export async function getVideoSlides() {
    try {
        const { data, error } = await supabase
            .from('wood_video_slides')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching video slides:', error);
        return [];
    }
}

// =====================================================
// PAGE CONTENT (Generic content for static pages)
// =====================================================
export async function getPageContent(pageSlug: string, sectionKey?: string) {
    try {
        let query = supabase
            .from('wood_page_content')
            .select('*')
            .eq('page_slug', pageSlug);

        if (sectionKey) {
            query = query.eq('section_key', sectionKey);
        }

        const { data, error } = await query;

        if (error) throw error;
        return sectionKey ? (data?.[0] || null) : (data || []);
    } catch (error) {
        // console.error('Error fetching page content:', error);
        return sectionKey ? null : [];
    }
}

// =====================================================
// CONTACT INFO
// =====================================================
export async function getContactInfo(sectionKey?: string) {
    try {
        let query = supabase.from('wood_contact_info').select('*');

        if (sectionKey) {
            query = query.eq('section_key', sectionKey);
        }

        const { data, error } = await query;

        if (error) throw error;
        return sectionKey ? (data?.[0] || null) : (data || []);
    } catch (error) {
        // console.error('Error fetching contact info:', error);
        return sectionKey ? null : [];
    }
}

// =====================================================
// VALUES
// =====================================================
export async function getValues() {
    try {
        const { data, error } = await supabase
            .from('wood_values')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching values:', error);
        return [];
    }
}

// =====================================================
// SERVICE INCLUDES
// =====================================================
export async function getServiceIncludes() {
    try {
        const { data, error } = await supabase
            .from('wood_service_includes')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching service includes:', error);
        return [];
    }
}

// =====================================================
// SERVICE BENEFITS
// =====================================================
export async function getServiceBenefits() {
    try {
        const { data, error } = await supabase
            .from('wood_service_benefits')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching service benefits:', error);
        return [];
    }
}

// =====================================================
// SPECIAL OFFERS
// =====================================================
export async function getSpecialOffers() {
    try {
        const { data, error } = await supabase
            .from('wood_special_offers')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching special offers:', error);
        return [];
    }
}

// =====================================================
// BRANDS
// =====================================================
export async function getBrands() {
    try {
        const { data, error } = await supabase
            .from('wood_brands')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching brands:', error);
        return [];
    }
}

// =====================================================
// REALIZATION FEATURES
// =====================================================
export async function getRealizationFeatures() {
    try {
        const { data, error } = await supabase
            .from('wood_realization_features')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching realization features:', error);
        return [];
    }
}

// =====================================================
// HOME ABOUT STATS
// =====================================================
export async function getHomeAboutStats() {
    try {
        const { data, error } = await supabase
            .from('wood_home_about_stats')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        // console.error('Error fetching home about stats:', error);
        return [];
    }
}
