import React from 'react';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface MarketingSectionProps {
  product: Partial<Product>;
  onChange: (field: keyof Product, value: any) => void;
  errors: Record<string, string>;
}

export const MarketingSection: React.FC<MarketingSectionProps> = ({ product, onChange, errors }) => {
  const urgencyConfig = product.urgencyConfig || {};
  const offerConfig = product.offerConfig || {};

  const updateUrgencyConfig = (field: string, value: any) => {
    onChange('urgencyConfig', { ...urgencyConfig, [field]: value });
  };

  const updateOfferConfig = (field: string, value: any) => {
    onChange('offerConfig', { ...offerConfig, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Urgency Indicators */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Urgency Indicators</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show "Buyers Today" Count</Label>
              <p className="text-xs text-muted-foreground">Display social proof indicator</p>
            </div>
            <Switch
              checked={urgencyConfig.showBuyersToday || false}
              onCheckedChange={(checked) => updateUrgencyConfig('showBuyersToday', checked)}
            />
          </div>

          {urgencyConfig.showBuyersToday && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="buyersCount">Number of Buyers</Label>
              <Input
                id="buyersCount"
                type="number"
                value={urgencyConfig.buyersCount || 59}
                onChange={(e) => updateUrgencyConfig('buyersCount', parseInt(e.target.value) || 0)}
                placeholder="59"
              />
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show "Stock Left" Warning</Label>
              <p className="text-xs text-muted-foreground">Display low stock urgency</p>
            </div>
            <Switch
              checked={urgencyConfig.showStockLeft || false}
              onCheckedChange={(checked) => updateUrgencyConfig('showStockLeft', checked)}
            />
          </div>

          {urgencyConfig.showStockLeft && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="stockLeftCount">Stock Left Count</Label>
              <Input
                id="stockLeftCount"
                type="number"
                value={urgencyConfig.stockLeftCount || 4}
                onChange={(e) => updateUrgencyConfig('stockLeftCount', parseInt(e.target.value) || 0)}
                placeholder="4"
              />
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Daily Sale Countdown</Label>
              <p className="text-xs text-muted-foreground">Display countdown timer</p>
            </div>
            <Switch
              checked={urgencyConfig.showDailySale || false}
              onCheckedChange={(checked) => updateUrgencyConfig('showDailySale', checked)}
            />
          </div>

          {urgencyConfig.showDailySale && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="saleEndTime">Sale End Time (optional)</Label>
              <Input
                id="saleEndTime"
                type="datetime-local"
                value={urgencyConfig.saleEndTime || ''}
                onChange={(e) => updateUrgencyConfig('saleEndTime', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Special Offers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Special Offers</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Buy 2 Get 1 Free Offer</Label>
            <p className="text-xs text-muted-foreground">Enable special offer badge</p>
          </div>
          <Switch
            checked={offerConfig.showBuy2Get1 || false}
            onCheckedChange={(checked) => updateOfferConfig('showBuy2Get1', checked)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customOfferText">Custom Offer Text</Label>
          <Input
            id="customOfferText"
            value={offerConfig.customOfferText || ''}
            onChange={(e) => updateOfferConfig('customOfferText', e.target.value)}
            placeholder="e.g., Limited Time Offer!"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="offerBadgeText">Offer Badge Text</Label>
          <Input
            id="offerBadgeText"
            value={offerConfig.offerBadgeText || ''}
            onChange={(e) => updateOfferConfig('offerBadgeText', e.target.value)}
            placeholder="e.g., HOT DEAL"
          />
        </div>
      </div>
    </div>
  );
};
