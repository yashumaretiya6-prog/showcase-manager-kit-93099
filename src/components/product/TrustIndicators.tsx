import React from 'react';
import { Shield, RotateCcw, Check } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  return (
    <div className="p-4 border-t bg-success/5">
      <div className="flex items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-success">
          <Check className="h-4 w-4" />
          <span className="font-medium">COD</span>
        </div>
        <div className="flex items-center gap-1.5 text-success">
          <RotateCcw className="h-4 w-4" />
          <span className="font-medium">Easy Returns</span>
        </div>
        <div className="flex items-center gap-1.5 text-success">
          <Shield className="h-4 w-4" />
          <span className="font-medium">Secure Payment</span>
        </div>
      </div>
    </div>
  );
};
