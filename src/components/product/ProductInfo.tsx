import React from 'react';
import { Star, Truck, Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/context/WishlistContext';
import { ShareButton } from './ShareButton';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { StockBadge } from './StockBadge';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = () => {
    toggleWishlist(product);
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: inWishlist 
        ? `${product.name} removed from your wishlist` 
        : `${product.name} added to your wishlist`
    });
  };
  
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full"
            onClick={handleWishlistClick}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <ShareButton productName={product.name} />
        </div>
      </div>

      {product.stock_quantity !== undefined && (
        <div className="mb-3">
          <StockBadge stockQuantity={product.stock_quantity} />
        </div>
      )}

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
        <div className="text-success font-medium text-sm mb-2">
          Free Delivery
        </div>
      )}
    </div>
  );
};
