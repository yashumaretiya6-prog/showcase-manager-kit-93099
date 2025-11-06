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
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg p-2 z-50">
      <div className="flex gap-2 w-full">
        <Button
          variant="outline"
          size="default"
          className="flex-1 h-11 sm:h-12 text-sm sm:text-base font-medium"
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
          Add to Cart
        </Button>
        <Button
          size="default"
          className="flex-1 h-11 sm:h-12 text-sm sm:text-base font-medium bg-primary hover:bg-primary/90"
          onClick={onBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};
