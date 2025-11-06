import React, { useState } from 'react';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X, Image as ImageIcon } from 'lucide-react';

interface ImagesSectionProps {
  product: Partial<Product>;
  onChange: (field: keyof Product, value: any) => void;
  errors: Record<string, string>;
}

export const ImagesSection: React.FC<ImagesSectionProps> = ({ product, onChange, errors }) => {
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const currentImages = product.images || [];
      onChange('images', [...currentImages, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = product.images || [];
    onChange('images', currentImages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mainImage">Main Image URL *</Label>
        <Input
          id="mainImage"
          value={product.image || ''}
          onChange={(e) => onChange('image', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        {product.image && (
          <div className="mt-2 border rounded-lg p-2">
            <img 
              src={product.image} 
              alt="Main product" 
              className="w-32 h-32 object-cover rounded"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Additional Images</Label>
        <div className="flex gap-2">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="https://example.com/additional-image.jpg"
            onKeyPress={(e) => e.key === 'Enter' && handleAddImage()}
          />
          <Button type="button" onClick={handleAddImage} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        {product.images && product.images.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {product.images.map((img, index) => (
              <div key={index} className="relative border rounded-lg p-2">
                <img 
                  src={img} 
                  alt={`Additional ${index + 1}`} 
                  className="w-full h-24 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/150';
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {(!product.images || product.images.length === 0) && (
          <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No additional images added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
