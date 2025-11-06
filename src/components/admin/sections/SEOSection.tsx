import React from 'react';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SEOSectionProps {
  product: Partial<Product>;
  onChange: (field: keyof Product, value: any) => void;
  errors: Record<string, string>;
}

export const SEOSection: React.FC<SEOSectionProps> = ({ product, onChange, errors }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="seoTitle">SEO Title</Label>
        <Input
          id="seoTitle"
          value={product.seo_title || ''}
          onChange={(e) => onChange('seo_title', e.target.value)}
          placeholder="Enter SEO-friendly title (max 60 characters)"
          maxLength={60}
        />
        <p className="text-xs text-muted-foreground">
          {(product.seo_title || '').length}/60 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seoDescription">SEO Description</Label>
        <Textarea
          id="seoDescription"
          value={product.seo_description || ''}
          onChange={(e) => onChange('seo_description', e.target.value)}
          placeholder="Enter SEO-friendly description (max 160 characters)"
          rows={3}
          maxLength={160}
        />
        <p className="text-xs text-muted-foreground">
          {(product.seo_description || '').length}/160 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seoKeywords">SEO Keywords</Label>
        <Input
          id="seoKeywords"
          value={product.seo_keywords || ''}
          onChange={(e) => onChange('seo_keywords', e.target.value)}
          placeholder="Enter keywords separated by commas"
        />
      </div>
    </div>
  );
};
