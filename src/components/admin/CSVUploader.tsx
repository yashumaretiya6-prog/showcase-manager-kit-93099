import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CSVUploader = () => {
  return (
    <Button variant="outline">
      <Upload className="h-4 w-4 mr-2" />
      Import CSV
    </Button>
  );
};
