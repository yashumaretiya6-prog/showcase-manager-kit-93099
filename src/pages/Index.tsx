import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/home/ProductCard";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  useEffect(() => {
    console.log('Products available:', products.length);
  }, [products]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">TROZZE</h1>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/products")}
            >
              Admin Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Featured Products</h2>
          <p className="text-muted-foreground">
            Discover our collection of quality products
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products available</p>
            <Button onClick={() => navigate("/admin/products")}>
              Add Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
