import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
    // Render structured specifications with sections using accordion
    const sections = Object.entries(specifications).filter(
      ([_, sectionData]) => typeof sectionData === 'object' && sectionData !== null
    );

    return (
      <Accordion type="multiple" defaultValue={sections.map(([name]) => name)} className="w-full">
        {sections.map(([sectionName, sectionData]) => {
          const items = Object.entries(sectionData);

          return (
            <AccordionItem key={sectionName} value={sectionName} className="border-b border-border">
              <AccordionTrigger className="hover:no-underline py-4">
                <h3 className="font-semibold text-base text-foreground text-left">{sectionName}</h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 pb-4">
                  {items.map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border/50 text-sm">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium text-foreground text-right ml-4">{formatValue(value)}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }

  // Render flat specifications (backward compatibility) with accordion
  const items = Object.entries(specifications);

  return (
    <Accordion type="multiple" defaultValue={["all"]} className="w-full">
      <AccordionItem value="all" className="border-b border-border">
        <AccordionTrigger className="hover:no-underline py-4">
          <h3 className="font-semibold text-base text-foreground text-left">Specifications</h3>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 pb-4">
            {items.map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-border/50 text-sm">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium text-foreground text-right ml-4">{formatValue(value)}</span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
