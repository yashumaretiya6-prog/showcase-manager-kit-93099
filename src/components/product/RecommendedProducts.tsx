import { Product } from "@/types/product";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

interface RecommendedProductsProps {
  products: Product[];
  excludeProductId: string;
}

export const RecommendedProducts = ({ products, excludeProductId }: RecommendedProductsProps) => {
  const navigate = useNavigate();
  const recommended = products.filter(p => p.id !== excludeProductId).slice(0, 4);

  if (recommended.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold text-foreground mb-4">You May Also Like</h2>
      <div className="grid grid-cols-2 gap-4">
        {recommended.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-card rounded-lg overflow-hidden border border-border cursor-pointer hover:shadow-[var(--shadow-card)] transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-success px-1.5 py-0.5 rounded">
                  <span className="text-xs font-bold text-success-foreground">{product.rating}</span>
                  <Star className="h-2.5 w-2.5 fill-success-foreground text-success-foreground" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
