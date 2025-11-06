export interface ProductFilters {
  search?: string;
  categories?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  ratingMin?: number;
  stockStatus?: ('in_stock' | 'low_stock' | 'out_of_stock')[];
  status?: ('active' | 'draft' | 'archived' | 'out_of_stock')[];
  featured?: boolean;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  sortBy?: 'name' | 'price' | 'rating' | 'stock' | 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
}
