import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
  showBulkDiscount?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  maxQuantity,
  onQuantityChange,
  showBulkDiscount = false
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="px-4 py-1.5 border-t border-border">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs font-semibold text-foreground">Quantity</h3>
        {maxQuantity <= 10 && (
          <span className="text-[10px] text-orange-600">Only {maxQuantity} left</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="h-7 w-7 rounded-r-none"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-xs font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrease}
            disabled={quantity >= maxQuantity}
            className="h-7 w-7 rounded-l-none"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        {showBulkDiscount && quantity >= 2 && (
          <span className="text-[10px] text-green-600 font-medium">
            Save {quantity >= 3 ? '10%' : '5%'} on bulk order
          </span>
        )}
      </div>
    </div>
  );
};
