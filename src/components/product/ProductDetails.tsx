import React from 'react';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/product';
interface ProductDetailsProps {
  product: Product;
}
export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product
}) => {
  return <div className="px-4">
      {/* Product Specifications */}
      {product.specifications && typeof product.specifications === 'object' && (
        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{key}:</span>
                <span className="font-medium">{String(value)}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Product Description */}
      {product.description && <Card className="p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-3">Product Description</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {product.description}
          </p>
        </Card>}
    </div>;
};
