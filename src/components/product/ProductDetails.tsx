import React from 'react';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/product';
import { ProductSpecificationTabs } from './ProductSpecificationTabs';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="px-4">
      <Card className="p-6">
        <ProductSpecificationTabs product={product} />
      </Card>
    </div>
  );
};
