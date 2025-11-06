import { CheckCircle2, RotateCcw, Shield } from "lucide-react";

export const TrustBadges = () => {
  const badges = [
    { icon: CheckCircle2, text: "COD", color: "text-success" },
    { icon: RotateCcw, text: "Easy Returns", color: "text-success" },
    { icon: Shield, text: "Secure Payment", color: "text-success" },
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          <badge.icon className={`h-4 w-4 ${badge.color}`} />
          <span className="text-sm text-foreground">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};
