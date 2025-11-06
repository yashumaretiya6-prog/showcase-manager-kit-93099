import React from 'react';
import { Product } from '@/types/product';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            {product.discount}% OFF
          </Badge>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5 bg-success px-1.5 py-0.5 rounded text-xs text-success-foreground">
            <span className="font-medium">{product.rating}</span>
            <Star className="h-3 w-3 fill-current" />
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {product.freeDelivery && (
          <p className="text-xs text-success mt-1">Free Delivery</p>
        )}
      </div>
    </Card>
  );
};
