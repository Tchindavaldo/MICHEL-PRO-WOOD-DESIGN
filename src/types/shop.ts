// Types pour la page boutique

export interface IShopBanner {
    id: string;
    title: string;
    caption: string;
    label: string;
    coverImg: string;
    btnText: string;
    btnLink: string;
}

export interface IShopCategory {
    id: string;
    label: string;
    icon: string;
    path: string;
}

export interface IShopProduct {
    id: string;
    name: string;
    price: number;
    priceSale: number;
    coverImg: string;
    category: string;
    sold: number;
    inStock: number;
    rating: number;
    label: string;
    caption: string;
    description: string;
    images: string[];
    // Section-specific fields
    hot_deal_expires_at?: string | null;
    special_offer_label?: string | null;
    special_offer_price_text?: string | null;
    special_offer_description?: string | null;
}

export interface IShopTestimonial {
    id: string;
    name: string;
    role: string;
    avatar: string;
    postDate: string;
    rating: number;
    review: string;
}

export interface IShopPageContent {
    title?: string;
    subtitle?: string;
    content?: string;
    image_url?: string;
    metadata?: Record<string, any>;
}

export interface IShopPageData {
    banners: IShopBanner[];
    categories: IShopCategory[];
    hotDealProducts: IShopProduct[];
    featuredProducts: IShopProduct[];
    collectionProducts: IShopProduct[];
    popularProducts: IShopProduct[];
    specialOfferProducts: IShopProduct[];
    testimonials: IShopTestimonial[];
    heroContent: IShopPageContent | null;
    collectionContent: IShopPageContent | null;
    specialOfferContent: IShopPageContent | null;
}
