import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface ProductActionsProps {
  product: Product;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export const ProductActions = ({ product, onAddToCart, onBuyNow }: ProductActionsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg p-4 z-50">
      <div className="container mx-auto flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-primary hover:bg-primary/90"
          onClick={onBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};
