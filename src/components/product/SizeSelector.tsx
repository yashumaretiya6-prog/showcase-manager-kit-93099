
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shirt } from 'lucide-react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ 
  sizes, 
  selectedSize, 
  onSizeChange 
}) => {
  console.log('SizeSelector received:', { sizes, selectedSize, sizesLength: sizes?.length });
  
  // Don't render if no sizes are provided
  if (!sizes || sizes.length === 0) {
    console.log('SizeSelector: No sizes provided, returning null');
    return null;
  }

  console.log('SizeSelector: Rendering with sizes:', sizes);
  
  return (
    <div className="p-4 border-t bg-blue-50">
      <div className="flex items-center gap-2 mb-3">
        <Shirt className="w-4 h-4 text-blue-600" />
        <h3 className="font-medium text-blue-800">Available Sizes</h3>
        <Badge variant="secondary" className="text-xs">Clothing Item</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            size="sm"
            className={`min-w-[48px] h-10 transition-all ${
              selectedSize === size 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onClick={() => {
              console.log('Size button clicked:', size);
              onSizeChange(size);
            }}
          >
            {size}
          </Button>
        ))}
      </div>
      <p className="text-xs text-blue-600 mt-2">
        Select your preferred size for this clothing item
      </p>
    </div>
  );
};
