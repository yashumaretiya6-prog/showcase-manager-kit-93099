import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-5xl font-bold text-primary mb-4">TROZZE</h1>
        <p className="text-xl text-muted-foreground mb-8">E-Commerce Product Management System</p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/product/1")}
            className="bg-primary hover:bg-primary/90"
          >
            View Product Page
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/admin/products")}
          >
            Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
