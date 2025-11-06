import React from 'react';
import { Check } from 'lucide-react';
import { ColorOption } from '@/types/product';

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorChange
}) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="px-4 py-3 border-t border-border">
      <h3 className="font-semibold text-foreground mb-3">Color</h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => color.available && onColorChange(color.name)}
            disabled={!color.available}
            className={`relative group ${!color.available ? 'opacity-40 cursor-not-allowed' : ''}`}
            title={color.name}
          >
            <div
              className={`w-12 h-12 rounded-full border-2 transition-all ${
                selectedColor === color.name
                  ? 'border-primary ring-2 ring-primary ring-offset-2'
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor === color.name && (
                <div className="w-full h-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white drop-shadow-md" strokeWidth={3} />
                </div>
              )}
            </div>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-popover text-popover-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
