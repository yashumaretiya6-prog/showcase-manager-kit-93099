import React from 'react';
import { Package } from 'lucide-react';
import { BulkDiscount } from '@/types/product';

interface BulkDiscountBannerProps {
  bulkDiscounts: BulkDiscount[];
  currentQuantity: number;
}

export const BulkDiscountBanner: React.FC<BulkDiscountBannerProps> = ({
  bulkDiscounts,
  currentQuantity
}) => {
  if (!bulkDiscounts || bulkDiscounts.length === 0) return null;

  const sortedDiscounts = [...bulkDiscounts].sort((a, b) => a.minQuantity - b.minQuantity);
  const currentDiscount = sortedDiscounts
    .filter(d => currentQuantity >= d.minQuantity)
    .pop();
  const nextDiscount = sortedDiscounts.find(d => d.minQuantity > currentQuantity);

  return (
    <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-y border-green-200">
      <div className="flex items-start gap-3">
        <Package className="w-5 h-5 text-green-600 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-green-900 mb-1">Buy More, Save More!</h4>
          <div className="space-y-1 text-sm">
            {sortedDiscounts.map((discount) => (
              <div
                key={discount.minQuantity}
                className={`flex items-center gap-2 ${
                  currentQuantity >= discount.minQuantity
                    ? 'text-green-700 font-medium'
                    : 'text-green-600'
                }`}
              >
                {currentQuantity >= discount.minQuantity && (
                  <span className="text-green-600">✓</span>
                )}
                <span>
                  Buy {discount.minQuantity}+ items: Save {discount.discountPercent}%
                </span>
              </div>
            ))}
          </div>
          {nextDiscount && (
            <p className="text-xs text-green-700 mt-2">
              Add {nextDiscount.minQuantity - currentQuantity} more to save {nextDiscount.discountPercent}%!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
