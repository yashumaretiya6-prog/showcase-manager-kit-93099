import { useState } from "react";

interface SizeSelectorProps {
  sizes: string[];
  onSizeChange?: (size: string) => void;
}

export const SizeSelector = ({ sizes, onSizeChange }: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-medium text-foreground">Available Sizes</h3>
        <span className="text-xs text-muted-foreground">Clothing Item</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`px-4 py-2 rounded border transition-all font-medium ${
              selectedSize === size
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border hover:border-primary"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      <p className="text-xs text-primary mt-2">Select your preferred size for this clothing item</p>
    </div>
  );
};
