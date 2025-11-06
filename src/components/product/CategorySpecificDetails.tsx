import React from 'react';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/product';
import { Shield, Award, Zap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface CategorySpecificDetailsProps {
  product: Product;
}

export const CategorySpecificDetails: React.FC<CategorySpecificDetailsProps> = ({
  product
}) => {
  const category = product.category.toLowerCase();

  // Electronics Category
  if (category.includes('electron') || category.includes('mobile') || category.includes('laptop')) {
    return (
      <div className="px-4 space-y-4">
        {product.warranty && (
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Warranty Information</h3>
                <p className="text-sm text-muted-foreground">{product.warranty}</p>
              </div>
            </div>
          </Card>
        )}
        
        {product.specifications && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Technical Specifications</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b last:border-0">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium text-right">{String(value)}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  }

  // Clothing Category
  if (category.includes('cloth') || category.includes('fashion') || category.includes('apparel')) {
    return (
      <div className="px-4 space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Fabric & Care</h3>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              • Machine wash cold with like colors
            </p>
            <p className="text-muted-foreground">
              • Tumble dry low or hang to dry
            </p>
            <p className="text-muted-foreground">
              • Do not bleach or iron directly on print
            </p>
            <p className="text-muted-foreground">
              • Material: Premium cotton blend
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Fit Guide</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Regular fit - true to size</p>
            <p>• Model is wearing size M (Height: 6'0", Chest: 38")</p>
            <p>• Relaxed through the body with a comfortable fit</p>
          </div>
        </Card>
      </div>
    );
  }

  // Beauty/Cosmetics Category
  if (category.includes('beauty') || category.includes('cosmetic') || category.includes('skincare')) {
    return (
      <div className="px-4 space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Key Ingredients</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Natural extracts and vitamins</p>
            <p>• Dermatologically tested</p>
            <p>• Free from harmful chemicals</p>
            <p>• Cruelty-free and vegan</p>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">How to Use</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. Cleanse your face thoroughly</p>
            <p>2. Apply a small amount on your skin</p>
            <p>3. Gently massage in circular motions</p>
            <p>4. Use daily for best results</p>
          </div>
        </Card>
      </div>
    );
  }

  // Jewelry Category
  if (category.includes('jewel') || category.includes('accessory')) {
    return (
      <div className="px-4 space-y-4">
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">Authenticity & Quality</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• 100% Genuine materials</p>
                <p>• Quality certified</p>
                <p>• Comes with authenticity certificate</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Care Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Store in a dry place</p>
            <p>• Avoid contact with water and chemicals</p>
            <p>• Clean with a soft cloth</p>
            <p>• Remove before swimming or exercising</p>
          </div>
        </Card>
      </div>
    );
  }

  // Default for other categories
  return (
    <div className="px-4">
      <Accordion type="single" defaultValue="highlights" collapsible className="w-full">
        <AccordionItem value="highlights" className="border-b border-border">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-base text-foreground">Product Highlights</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 text-sm text-muted-foreground pb-4">
              <p>• Premium quality product</p>
              <p>• Satisfaction guaranteed</p>
              <p>• Fast and secure delivery</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
