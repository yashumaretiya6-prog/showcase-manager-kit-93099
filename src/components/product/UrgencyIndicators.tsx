import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface UrgencyIndicatorsProps {
  productId: string;
}

export const UrgencyIndicators = ({ productId }: UrgencyIndicatorsProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 5, seconds: 54 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) hours = 0;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-accent text-accent-foreground rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4" />
          <span className="font-semibold text-sm">Daily Sale Ends In:</span>
        </div>
        <div className="text-2xl font-bold">
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-accent">🔥</span>
          <span className="text-foreground">37 bought today</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-destructive">⚡</span>
          <span className="text-destructive font-medium">Only 6 left!</span>
        </div>
      </div>
    </div>
  );
};
