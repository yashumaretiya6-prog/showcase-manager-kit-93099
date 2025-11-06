export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images?: string[]; // Gallery images
  category: string;
  brand: string;
  description: string;
  rating: number;
  reviews: number;
  freeDelivery?: boolean;
  specialOffers?: string[];
  sizes?: string[];
  stock?: number;
  featured?: boolean;
}

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
