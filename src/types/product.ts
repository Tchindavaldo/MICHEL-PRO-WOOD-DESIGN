export type IProductOrderProps = {
  orderId: string;
  item: string;
  deliveryDate: Date | string;
  price: number;
  status: string;
};

export type IProductItemCompareProps = {
  id: string;
  name: string;
  price: number;
  coverImg: string;
  rating: number;
  details: string[];
};

export type IProductItemProps = {
  id: string;
  name: string;
  price: number;
  priceSale?: number | null;
  coverImg: string;
  images?: string[];
  rating?: number;
  review?: number;
  category?: string;
  colors?: string[];
  status?: string;
  label?: string;
  caption?: string;
};

export type IProductFiltersProps = {
  filterBrand: string[];
  filterCategories: string;
  filterRating: string | null;
  filterStock: boolean;
  filterShipping: string[];
  filterTag: string[];
  filterPrice: {
    start: number;
    end: number;
  };
};
