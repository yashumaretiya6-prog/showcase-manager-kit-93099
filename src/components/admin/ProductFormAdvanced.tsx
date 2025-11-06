import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { ImagesSection } from './sections/ImagesSection';
import { InventorySection } from './sections/InventorySection';
import { AttributesSection } from './sections/AttributesSection';
import { SEOSection } from './sections/SEOSection';
import { ShippingSection } from './sections/ShippingSection';
import { MarketingSection } from './sections/MarketingSection';

interface ProductFormAdvancedProps {
  product: Partial<Product>;
  onProductChange: (product: Partial<Product>) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const ProductFormAdvanced: React.FC<ProductFormAdvancedProps> = ({
  product,
  onProductChange,
  onSave,
  onCancel,
  isEditing = false
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: keyof Product, value: any) => {
    onProductChange({ ...product, [field]: value });
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!product.name?.trim()) newErrors.name = 'Product name is required';
    if (!product.price || product.price <= 0) newErrors.price = 'Valid price is required';
    if (!product.category?.trim()) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave();
    }
  };

  // Auto-calculate discount when prices change
  useEffect(() => {
    if (product.price && product.originalPrice && product.originalPrice > product.price) {
      const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      if (discount !== product.discount) {
        onProductChange({ ...product, discount });
      }
    }
  }, [product.price, product.originalPrice]);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <BasicInfoSection
            product={product}
            onChange={handleFieldChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="images" className="space-y-4 mt-4">
          <ImagesSection
            product={product}
            onChange={handleFieldChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4 mt-4">
          <InventorySection
            product={product}
            onChange={handleFieldChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="attributes" className="space-y-4 mt-4">
          <AttributesSection
            product={product}
            onChange={handleFieldChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="marketing" className="space-y-4 mt-4">
          <MarketingSection
            product={product}
            onChange={handleFieldChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="seo" className="space-y-4 mt-4">
          <SEOSection
            product={product}
            onChange={handleFieldChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4 mt-4">
          <ShippingSection
            product={product}
            onChange={handleFieldChange}
            errors={errors}
          />
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 justify-end pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </div>
  );
};
