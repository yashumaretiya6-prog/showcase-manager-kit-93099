
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
    <div className="flex-1">
      <div className="flex flex-wrap gap-1.5">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            size="sm"
            className="min-w-[40px] h-8 px-2 text-xs"
            onClick={() => onSizeChange(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};
