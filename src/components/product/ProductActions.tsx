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
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg p-2 sm:p-3 z-50">
      <div className="container mx-auto flex gap-2">
        <Button
          variant="outline"
          size="default"
          className="flex-1 h-9 sm:h-10 text-xs sm:text-sm"
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Add to Cart
        </Button>
        <Button
          size="default"
          className="flex-1 h-9 sm:h-10 text-xs sm:text-sm bg-primary hover:bg-primary/90"
          onClick={onBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};
