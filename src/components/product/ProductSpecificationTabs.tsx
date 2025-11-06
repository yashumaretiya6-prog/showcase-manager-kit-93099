import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SpecificationGrid } from './SpecificationGrid';
import { DescriptionTab } from './DescriptionTab';
import { WarrantyTab } from './WarrantyTab';
import { Product } from '@/types/product';

interface ProductSpecificationTabsProps {
  product: Product;
}

export const ProductSpecificationTabs: React.FC<ProductSpecificationTabsProps> = ({ product }) => {
  const hasSpecifications = product.specifications && Object.keys(product.specifications).length > 0;
  const hasDescription = Boolean(product.description);
  const hasWarranty = Boolean(product.warranty || product.warrantyDetails);

  return (
    <Tabs defaultValue="specifications" className="w-full">
      <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0">
        <TabsTrigger 
          value="specifications"
          className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md px-6 py-2"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger 
          value="description"
          className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md px-6 py-2"
        >
          Description
        </TabsTrigger>
        {hasWarranty && (
          <TabsTrigger 
            value="warranty"
            className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md px-6 py-2"
          >
            Warranty
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="specifications" className="mt-6">
        {hasSpecifications ? (
          <SpecificationGrid specifications={product.specifications!} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No specifications available for this product.
          </div>
        )}
      </TabsContent>

      <TabsContent value="description" className="mt-6">
        {hasDescription ? (
          <DescriptionTab 
            description={product.description} 
            features={product.keyFeatures}
          />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No description available for this product.
          </div>
        )}
      </TabsContent>

      {hasWarranty && (
        <TabsContent value="warranty" className="mt-6">
          <WarrantyTab 
            warranty={product.warranty} 
            warrantyDetails={product.warrantyDetails}
          />
        </TabsContent>
      )}
    </Tabs>
  );
};
