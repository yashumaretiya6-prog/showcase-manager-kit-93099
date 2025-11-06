import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Users } from 'lucide-react';

interface UrgencyIndicatorsProps {
  productId: string;
}

export const UrgencyIndicators: React.FC<UrgencyIndicatorsProps> = ({ productId }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 15,
    seconds: 0
  });

  // Generate realistic numbers based on product ID
  const buyerCount = Math.floor(Math.abs(productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 50) + 10;
  const stockLeft = Math.floor(Math.abs(productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 8) + 3;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to next day sale
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="p-4 py-1.5 space-y-1.5">
      {/* Daily Sale Timer */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-1.5 rounded-lg">
        <div className="flex items-center gap-1 mb-0.5">
          <Clock className="h-2.5 w-2.5" />
          <span className="text-[10px] font-medium">Daily Sale Ends In:</span>
        </div>
        <div className="text-sm font-bold">
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </div>
      </div>

      {/* Social Proof & Stock */}
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-0.5 text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
          <Users className="h-2.5 w-2.5" />
          <span className="font-medium">{buyerCount} bought today</span>
        </div>
        <div className="flex items-center gap-0.5 text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
          <TrendingUp className="h-2.5 w-2.5" />
          <span className="font-medium">Only {stockLeft} left!</span>
        </div>
      </div>
    </div>
  );
};
