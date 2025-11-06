import React from 'react';
import { CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface EMIOptionsProps {
  price: number;
}

export const EMIOptions: React.FC<EMIOptionsProps> = ({ price }) => {
  const emiPlans = [
    { months: 3, interest: 0, bank: 'All Banks' },
    { months: 6, interest: 0, bank: 'HDFC, ICICI' },
    { months: 9, interest: 12, bank: 'SBI, Axis' },
    { months: 12, interest: 13, bank: 'All Banks' },
  ];

  const calculateEMI = (principal: number, months: number, interestRate: number) => {
    if (interestRate === 0) {
      return principal / months;
    }
    const monthlyRate = interestRate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return emi;
  };

  return (
    <div className="px-4 py-3 border-t border-border">
      <div className="flex items-center gap-2 mb-3">
        <CreditCard className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-foreground">EMI Options Available</h3>
      </div>
      
      <div className="space-y-2">
        {emiPlans.map((plan) => {
          const emiAmount = calculateEMI(price, plan.months, plan.interest);
          return (
            <Card key={plan.months} className="p-3 bg-muted/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground">
                    ₹{Math.round(emiAmount).toLocaleString()}/month
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {plan.months} months • {plan.interest}% interest
                  </p>
                  <p className="text-xs text-primary mt-1">{plan.bank}</p>
                </div>
                {plan.interest === 0 && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    No Cost EMI
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
