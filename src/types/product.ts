export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  description: string;
  specifications?: Record<string, any>;
  rating: number;
  reviews: number;
  freeDelivery: boolean;
  specialOffers?: string[];
  sizes?: string[];
  colors?: string[];
  stock_quantity?: number;
  sku?: string;
  status?: 'active' | 'draft' | 'archived' | 'out_of_stock';
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
}

export interface Address {
  id?: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  address_id: string | null;
  order_number: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
  user_addresses?: AddressData;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
  selected_size: string | null;
}

export interface AddressData {
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating';
}
