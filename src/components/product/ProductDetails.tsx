import React from 'react';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/product';
import { ProductSpecificationTabs } from './ProductSpecificationTabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="px-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details" className="border-b border-border">
          <AccordionTrigger className="hover:no-underline py-4">
            <h3 className="font-semibold text-base text-foreground">All Details</h3>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="p-6">
              <ProductSpecificationTabs product={product} />
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
