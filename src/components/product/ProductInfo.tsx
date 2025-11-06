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
export const ProductInfo: React.FC<ProductInfoProps> = ({
  product
}) => {
  const {
    isInWishlist,
    toggleWishlist
  } = useWishlist();
  const {
    toast
  } = useToast();
  const inWishlist = isInWishlist(product.id);
  const handleWishlistClick = () => {
    toggleWishlist(product);
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: inWishlist ? `${product.name} removed from your wishlist` : `${product.name} added to your wishlist`
    });
  };
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };
  return <div className="p-2 sm:p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h1 className="text-base sm:text-lg font-bold text-foreground mb-1">{product.name}</h1>
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        </div>
        
      </div>

      {product.stock_quantity !== undefined && <div className="mb-2">
          <StockBadge stockQuantity={product.stock_quantity} />
        </div>}

      {/* Price and Discount */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="text-lg sm:text-xl font-bold text-foreground">
          {formatPrice(product.price)}
        </span>
        <span className="text-sm sm:text-base text-muted-foreground line-through">
          {formatPrice(product.originalPrice)}
        </span>
        <span className="text-xs font-medium text-success bg-success/10 px-1.5 py-0.5 rounded">
          {product.discount}% off
        </span>
      </div>

      {/* Special Offers */}
      {product.specialOffers && product.specialOffers.length > 0}

      {/* Rating */}
      

      {/* Free Delivery */}
      {product.freeDelivery && <div className="text-success font-medium text-xs mb-1">
          Free Delivery
        </div>}
    </div>;
};