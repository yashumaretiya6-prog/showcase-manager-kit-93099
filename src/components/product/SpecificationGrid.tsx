import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpecificationGridProps {
  specifications: Record<string, Record<string, any>> | Record<string, any>;
}

export const SpecificationGrid: React.FC<SpecificationGridProps> = ({ specifications }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Check if specifications are structured (with sections)
  const isStructured = Object.values(specifications).some(val => typeof val === 'object' && val !== null && !Array.isArray(val));

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const formatValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return String(value);
  };

  if (isStructured) {
    // Render structured specifications with sections
    return (
      <div className="space-y-6">
        {Object.entries(specifications).map(([sectionName, sectionData]) => {
          if (typeof sectionData !== 'object' || sectionData === null) return null;
          
          const items = Object.entries(sectionData);
          const showLimit = 8;
          const isExpanded = expandedSections[sectionName] !== false;
          const displayItems = isExpanded ? items : items.slice(0, showLimit);
          const hasMore = items.length > showLimit;

          return (
            <div key={sectionName} className="space-y-3">
              <h3 className="font-semibold text-base text-foreground">{sectionName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                {displayItems.map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border text-sm">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-foreground text-right ml-4">{formatValue(value)}</span>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection(sectionName)}
                    className="text-primary hover:text-primary"
                  >
                    {isExpanded ? (
                      <>
                        See Less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        See More <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Render flat specifications (backward compatibility)
  const items = Object.entries(specifications);
  const showLimit = 12;
  const isExpanded = expandedSections['all'] !== false;
  const displayItems = isExpanded ? items : items.slice(0, showLimit);
  const hasMore = items.length > showLimit;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
        {displayItems.map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-border text-sm">
            <span className="text-muted-foreground">{key}</span>
            <span className="font-medium text-foreground text-right ml-4">{formatValue(value)}</span>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('all')}
            className="text-primary hover:text-primary"
          >
            {isExpanded ? (
              <>
                See Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                See More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
