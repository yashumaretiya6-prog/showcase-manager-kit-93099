import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  open,
  onOpenChange,
  category
}) => {
  const getSizeChart = () => {
    const isClothing = category.toLowerCase().includes('cloth') || 
                       category.toLowerCase().includes('shirt') ||
                       category.toLowerCase().includes('dress');
    
    if (isClothing) {
      return (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Size</th>
              <th className="py-2 text-center">Chest (inches)</th>
              <th className="py-2 text-center">Waist (inches)</th>
              <th className="py-2 text-center">Length (inches)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium">S</td>
              <td className="py-2 text-center">36-38</td>
              <td className="py-2 text-center">30-32</td>
              <td className="py-2 text-center">26-27</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">M</td>
              <td className="py-2 text-center">38-40</td>
              <td className="py-2 text-center">32-34</td>
              <td className="py-2 text-center">27-28</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">L</td>
              <td className="py-2 text-center">40-42</td>
              <td className="py-2 text-center">34-36</td>
              <td className="py-2 text-center">28-29</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">XL</td>
              <td className="py-2 text-center">42-44</td>
              <td className="py-2 text-center">36-38</td>
              <td className="py-2 text-center">29-30</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">XXL</td>
              <td className="py-2 text-center">44-46</td>
              <td className="py-2 text-center">38-40</td>
              <td className="py-2 text-center">30-31</td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <div className="text-sm text-muted-foreground">
        Size guide not available for this category
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            Size Guide
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">How to Measure</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Chest: Measure around the fullest part of your chest</li>
              <li>• Waist: Measure around your natural waistline</li>
              <li>• Length: Measure from the highest point of shoulder to hem</li>
            </ul>
          </div>
          {getSizeChart()}
          <p className="text-xs text-muted-foreground mt-4">
            Note: All measurements are approximate and may vary slightly
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
