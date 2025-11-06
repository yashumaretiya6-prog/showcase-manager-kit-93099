import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PackageX, TrendingDown } from 'lucide-react';
interface StockBadgeProps {
  stockQuantity: number;
  lowStockThreshold?: number;
}
export const StockBadge: React.FC<StockBadgeProps> = ({
  stockQuantity,
  lowStockThreshold = 10
}) => {
  if (stockQuantity === 0) {
    return <Badge variant="destructive" className="gap-1">
        <PackageX className="h-3 w-3" />
        Out of Stock
      </Badge>;
  }
  if (stockQuantity <= lowStockThreshold) {
    return;
  }
  return <Badge variant="secondary" className="gap-1 bg-green-100 text-green-800">
      In Stock
    </Badge>;
};