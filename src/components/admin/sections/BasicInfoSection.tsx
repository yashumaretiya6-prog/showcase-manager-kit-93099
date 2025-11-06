import React from 'react';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface BasicInfoSectionProps {
  product: Partial<Product>;
  onChange: (field: keyof Product, value: any) => void;
  errors: Record<string, string>;
}

const categories = [
  'Electronics',
  'Clothing',
  'Beauty',
  'Home & Kitchen',
  'Sports',
  'Jewelry',
  'Books',
  'Toys',
  'Grocery',
  'Footwear'
];

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ product, onChange, errors }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={product.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={product.brand || ''}
            onChange={(e) => onChange('brand', e.target.value)}
            placeholder="Enter brand name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={product.category || ''} onValueChange={(value) => onChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={product.status || 'active'} onValueChange={(value) => onChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            value={product.price || ''}
            onChange={(e) => onChange('price', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
          />
          {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price (₹)</Label>
          <Input
            id="originalPrice"
            type="number"
            value={product.originalPrice || ''}
            onChange={(e) => onChange('originalPrice', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            type="number"
            value={product.discount || 0}
            disabled
            placeholder="Auto-calculated"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={product.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Enter product description"
          rows={4}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={product.featured || false}
          onCheckedChange={(checked) => onChange('featured', checked)}
        />
        <Label htmlFor="featured">Feature this product</Label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={product.rating || 4.0}
            onChange={(e) => onChange('rating', parseFloat(e.target.value) || 4.0)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reviews">Reviews Count</Label>
          <Input
            id="reviews"
            type="number"
            value={product.reviews || 0}
            onChange={(e) => onChange('reviews', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
    </div>
  );
};
