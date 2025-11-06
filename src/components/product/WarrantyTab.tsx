import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

interface WarrantyTabProps {
  warranty?: string;
  warrantyDetails?: {
    duration?: string;
    coverage?: string[];
    terms?: string[];
  };
}

export const WarrantyTab: React.FC<WarrantyTabProps> = ({ warranty, warrantyDetails }) => {
  if (!warranty && !warrantyDetails) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No warranty information available for this product.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary mt-1" />
        <div>
          <h4 className="font-semibold text-foreground mb-1">Warranty Duration</h4>
          <p className="text-sm text-muted-foreground">
            {warrantyDetails?.duration || warranty || 'Standard warranty applies'}
          </p>
        </div>
      </div>

      {warrantyDetails?.coverage && warrantyDetails.coverage.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Coverage Includes:</h4>
          <ul className="space-y-2">
            {warrantyDetails.coverage.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {warrantyDetails?.terms && warrantyDetails.terms.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-border">
          <h4 className="font-semibold text-foreground">Terms & Conditions:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {warrantyDetails.terms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
