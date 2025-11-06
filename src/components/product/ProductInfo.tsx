import React from 'react';
import { Heart, Share, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="p-4">
      {/* Product Info */}
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-xl font-semibold text-foreground flex-1 mr-4">
          {product.name}
        </h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Price and Discount */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-foreground">
          {formatPrice(product.price)}
        </span>
        <span className="text-lg text-muted-foreground line-through">
          {formatPrice(product.originalPrice)}
        </span>
        <span className="text-sm text-success font-medium bg-success/10 px-2 py-1 rounded">
          {product.discount}% off
        </span>
      </div>

      {/* Special Offers */}
      {product.specialOffers && product.specialOffers.length > 0 && (
        <div className="bg-accent/10 p-3 rounded-lg mb-4">
          <div className="text-sm text-accent font-medium">
            Save {product.specialOffers[0]}
          </div>
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1 bg-success px-2 py-1 rounded text-success-foreground">
          <span className="font-medium">{product.rating}</span>
          <Star className="h-4 w-4 fill-current" />
        </div>
        <span className="text-sm text-muted-foreground">
          {product.reviews.toLocaleString()} ratings and reviews
        </span>
      </div>

      {/* Free Delivery */}
      {product.freeDelivery && (
        <div className="text-success font-medium text-sm mb-6">
          Free Delivery
        </div>
      )}
    </div>
  );
};
