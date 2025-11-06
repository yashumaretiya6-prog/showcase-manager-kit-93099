import React from 'react';

interface DescriptionTabProps {
  description: string;
  features?: string[];
}

export const DescriptionTab: React.FC<DescriptionTabProps> = ({ description, features }) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
        {description}
      </div>
      
      {features && features.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-border">
          <h4 className="font-semibold text-foreground">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
