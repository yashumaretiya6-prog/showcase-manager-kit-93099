import React, { useState } from 'react';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { isClothingCategory, isSportsCategory, getCategoryAttributes } from '@/utils/categoryUtils';
import { Badge } from '@/components/ui/badge';

interface AttributesSectionProps {
  product: Partial<Product>;
  onChange: (field: keyof Product, value: any) => void;
  errors: Record<string, string>;
}

export const AttributesSection: React.FC<AttributesSectionProps> = ({ product, onChange, errors }) => {
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  const isClothing = isClothingCategory(product.category, product.description, product.name);
  const isSports = isSportsCategory(product.category);
  const categoryAttributes = product.category ? getCategoryAttributes(product.category) : [];

  const handleAddSize = () => {
    if (newSize.trim()) {
      const currentSizes = product.sizes || [];
      onChange('sizes', [...currentSizes, newSize.trim()]);
      setNewSize('');
    }
  };

  const handleRemoveSize = (index: number) => {
    const currentSizes = product.sizes || [];
    onChange('sizes', currentSizes.filter((_, i) => i !== index));
  };

  const handleAddColor = () => {
    if (newColor.trim()) {
      const currentColors = product.colors || [];
      onChange('colors', [...currentColors, newColor.trim()]);
      setNewColor('');
    }
  };

  const handleRemoveColor = (index: number) => {
    const currentColors = product.colors || [];
    onChange('colors', currentColors.filter((_, i) => i !== index));
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      const currentHighlights = product.highlights || [];
      onChange('highlights', [...currentHighlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    const currentHighlights = product.highlights || [];
    onChange('highlights', currentHighlights.filter((_, i) => i !== index));
  };

  const handleAddFaq = () => {
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      const currentFaqs = product.faqs || [];
      onChange('faqs', [...currentFaqs, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }]);
      setNewFaqQuestion('');
      setNewFaqAnswer('');
    }
  };

  const handleRemoveFaq = (index: number) => {
    const currentFaqs = product.faqs || [];
    onChange('faqs', currentFaqs.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Category-Specific Attributes */}
      {product.category && (
        <div className="space-y-2">
          <Label>Category: {product.category}</Label>
          <p className="text-sm text-muted-foreground">
            Recommended attributes: {categoryAttributes.join(', ')}
          </p>
        </div>
      )}

      {/* Sizes - Show for Clothing & Sports */}
      {(isClothing || isSports) && (
        <div className="space-y-2">
          <Label>Sizes</Label>
          <div className="flex gap-2">
            <Input
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              placeholder="e.g., S, M, L, XL"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSize()}
            />
            <Button type="button" onClick={handleAddSize} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {product.sizes.map((size, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {size}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveSize(index)} />
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Colors - Show for most categories */}
      <div className="space-y-2">
        <Label>Colors</Label>
        <div className="flex gap-2">
          <Input
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="e.g., Black, White, Red"
            onKeyPress={(e) => e.key === 'Enter' && handleAddColor()}
          />
          <Button type="button" onClick={handleAddColor} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {product.colors.map((color, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {color}
                <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveColor(index)} />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Product Highlights */}
      <div className="space-y-2">
        <Label>Product Highlights</Label>
        <div className="flex gap-2">
          <Input
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            placeholder="Add a highlight point"
            onKeyPress={(e) => e.key === 'Enter' && handleAddHighlight()}
          />
          <Button type="button" onClick={handleAddHighlight} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {product.highlights && product.highlights.length > 0 && (
          <ul className="mt-2 space-y-1">
            {product.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="flex-1">• {highlight}</span>
                <X className="h-4 w-4 cursor-pointer text-destructive" onClick={() => handleRemoveHighlight(index)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* FAQs */}
      <div className="space-y-2">
        <Label>Product FAQs</Label>
        <div className="space-y-2">
          <Input
            value={newFaqQuestion}
            onChange={(e) => setNewFaqQuestion(e.target.value)}
            placeholder="FAQ Question"
          />
          <Textarea
            value={newFaqAnswer}
            onChange={(e) => setNewFaqAnswer(e.target.value)}
            placeholder="FAQ Answer"
            rows={2}
          />
          <Button type="button" onClick={handleAddFaq} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add FAQ
          </Button>
        </div>
        {product.faqs && product.faqs.length > 0 && (
          <div className="mt-2 space-y-2">
            {product.faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-1">
                <div className="flex items-start justify-between">
                  <p className="font-medium text-sm">{faq.question}</p>
                  <X className="h-4 w-4 cursor-pointer text-destructive" onClick={() => handleRemoveFaq(index)} />
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
