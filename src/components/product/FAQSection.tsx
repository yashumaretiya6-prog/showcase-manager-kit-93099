import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  category: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ category }) => {
  // Category-specific FAQs
  const getFAQs = () => {
    const commonFAQs = [
      {
        question: "What is the return policy?",
        answer: "You can return this product within 7 days of delivery for a full refund. The product should be unused and in original packaging."
      },
      {
        question: "How long does delivery take?",
        answer: "Delivery typically takes 3-7 business days depending on your location. You can check the estimated delivery date by entering your pincode above."
      },
      {
        question: "Is Cash on Delivery available?",
        answer: "Yes, Cash on Delivery (COD) is available for this product. You can select COD as payment option during checkout."
      }
    ];

    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('electron') || categoryLower.includes('mobile')) {
      return [
        ...commonFAQs,
        {
          question: "What is the warranty period?",
          answer: "This product comes with a 1-year manufacturer warranty covering manufacturing defects."
        },
        {
          question: "Is the product compatible with...?",
          answer: "Please check the technical specifications section above for detailed compatibility information."
        }
      ];
    }

    if (categoryLower.includes('cloth') || categoryLower.includes('fashion')) {
      return [
        ...commonFAQs,
        {
          question: "How do I choose the right size?",
          answer: "Please refer to our size guide above. If you're between sizes, we recommend ordering the larger size."
        },
        {
          question: "Can I exchange for a different size/color?",
          answer: "Yes, exchanges are available within 7 days of delivery. The product should be unworn with tags attached."
        }
      ];
    }

    return commonFAQs;
  };

  const faqs = getFAQs();

  return (
    <div className="px-4 py-6 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
