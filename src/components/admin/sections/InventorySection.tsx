import React from 'react';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InventorySectionProps {
  product: Partial<Product>;
  onChange: (field: keyof Product, value: any) => void;
  errors: Record<string, string>;
}

export const InventorySection: React.FC<InventorySectionProps> = ({ product, onChange, errors }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={product.sku || ''}
            onChange={(e) => onChange('sku', e.target.value)}
            placeholder="Enter SKU"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            type="number"
            value={product.stock_quantity || 0}
            onChange={(e) => onChange('stock_quantity', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};
