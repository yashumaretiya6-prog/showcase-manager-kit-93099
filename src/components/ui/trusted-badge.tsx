import { Shield } from "lucide-react";

export const TrustedBadge = () => {
  return (
    <div className="flex items-center gap-2 text-success">
      <Shield className="h-4 w-4" />
      <span className="text-sm font-medium">Trusted by 10,000+ customers</span>
    </div>
  );
};
