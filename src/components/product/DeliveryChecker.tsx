import React, { useState } from 'react';
import { MapPin, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const DeliveryChecker: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<{
    available: boolean;
    estimatedDays: number;
    cod: boolean;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkDelivery = () => {
    if (pincode.length !== 6) return;
    
    setIsChecking(true);
    // Simulate API call
    setTimeout(() => {
      setDeliveryInfo({
        available: true,
        estimatedDays: Math.floor(Math.random() * 5) + 2,
        cod: Math.random() > 0.3
      });
      setIsChecking(false);
    }, 800);
  };

  return (
    <div className="px-4 py-3 border-t border-border">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-semibold text-foreground">Check Delivery</h3>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          maxLength={6}
          className="flex-1"
        />
        <Button 
          onClick={checkDelivery} 
          disabled={pincode.length !== 6 || isChecking}
          size="sm"
        >
          {isChecking ? 'Checking...' : 'Check'}
        </Button>
      </div>

      {deliveryInfo && (
        <div className="mt-3 space-y-2 text-sm">
          {deliveryInfo.available ? (
            <>
              <div className="flex items-center gap-2 text-green-600">
                <Truck className="w-4 h-4" />
                <span>Delivery in {deliveryInfo.estimatedDays}-{deliveryInfo.estimatedDays + 2} days</span>
              </div>
              {deliveryInfo.cod && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>Cash on Delivery available</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-destructive text-sm">
              Delivery not available for this pincode
            </div>
          )}
        </div>
      )}
    </div>
  );
};
