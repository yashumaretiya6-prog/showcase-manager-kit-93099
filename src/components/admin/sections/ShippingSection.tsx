import React from 'react';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShippingSectionProps {
  product: Partial<Product>;
  onChange: (field: keyof Product, value: any) => void;
  errors: Record<string, string>;
}

export const ShippingSection: React.FC<ShippingSectionProps> = ({ product, onChange, errors }) => {
  const dimensions = product.dimensions || { length: 0, width: 0, height: 0, unit: 'cm' };

  const updateDimension = (field: string, value: any) => {
    onChange('dimensions', { ...dimensions, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="freeDelivery"
          checked={product.freeDelivery || false}
          onCheckedChange={(checked) => onChange('freeDelivery', checked)}
        />
        <Label htmlFor="freeDelivery">Free Delivery</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="codAvailable"
          checked={product.codAvailable || false}
          onCheckedChange={(checked) => onChange('codAvailable', checked)}
        />
        <Label htmlFor="codAvailable">Cash on Delivery Available</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          step="0.01"
          value={product.weight || ''}
          onChange={(e) => onChange('weight', parseFloat(e.target.value) || 0)}
          placeholder="0.00"
        />
      </div>

      <div className="space-y-2">
        <Label>Dimensions</Label>
        <div className="grid grid-cols-4 gap-2">
          <Input
            type="number"
            value={dimensions.length || ''}
            onChange={(e) => updateDimension('length', parseFloat(e.target.value) || 0)}
            placeholder="Length"
          />
          <Input
            type="number"
            value={dimensions.width || ''}
            onChange={(e) => updateDimension('width', parseFloat(e.target.value) || 0)}
            placeholder="Width"
          />
          <Input
            type="number"
            value={dimensions.height || ''}
            onChange={(e) => updateDimension('height', parseFloat(e.target.value) || 0)}
            placeholder="Height"
          />
          <Select value={dimensions.unit || 'cm'} onValueChange={(value) => updateDimension('unit', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cm">cm</SelectItem>
              <SelectItem value="in">in</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
