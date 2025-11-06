import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-success px-2 py-1 rounded">
            <span className="text-sm font-bold text-success-foreground">{product.rating}</span>
            <Star className="h-3 w-3 fill-success-foreground text-success-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">
            {product.reviews} ratings and reviews
          </span>
        </div>

        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
          <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
          <Badge className="bg-success text-success-foreground">{product.discount}% off</Badge>
        </div>
      </div>
    </div>
  );
};
