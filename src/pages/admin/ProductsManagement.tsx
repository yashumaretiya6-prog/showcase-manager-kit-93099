import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProductForm } from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Package, TrendingDown, Star, Filter, Plus, MoreVertical, RefreshCw, Trash2, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const ProductsManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "yashkumar umaretiya",
      category: "Sarees",
      brand: "SS",
      price: 230,
      originalPrice: 1225,
      discount: 48,
      rating: 4.4,
      reviews: 0,
      images: 2,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
    },
    {
      id: "2",
      name: "Floral Print Cotton Kurti",
      category: "Kurtis",
      brand: "Store Brand",
      price: 499,
      originalPrice: 999,
      discount: 50,
      rating: 4.5,
      reviews: 234,
      images: 2,
      image: "https://images.unsplash.com/photo-1583391733981-8b1b29bdd2ca?w=400",
    },
    {
      id: "3",
      name: "Ethnic Embroidered Kurti",
      category: "Kurtis",
      brand: "Store Brand",
      price: 799,
      originalPrice: 1599,
      discount: 50,
      rating: 4.7,
      reviews: 189,
      images: 2,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
    },
  ]);

  const handleAddProduct = (productData: any) => {
    console.log("Adding product:", productData);
    setShowForm(false);
    // Add product logic here
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <header className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Products Management</h1>
              <p className="text-muted-foreground">{products.length} total products</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete All
              </Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products by name, category, brand, description..."
              className="pl-10"
            />
          </div>
        </header>

        {/* Filters */}
        <div className="p-6 border-b border-border">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Best Sellers
            </Button>
            <Button variant="ghost" size="sm">
              <Package className="h-4 w-4 mr-2" />
              New Arrivals
            </Button>
            <Button variant="ghost" size="sm">
              <TrendingDown className="h-4 w-4 mr-2" />
              Low Stock
            </Button>
            <Button variant="ghost" size="sm">
              <Star className="h-4 w-4 mr-2" />
              Featured Products
            </Button>
          </div>
        </div>

        <div className="p-6 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              Sort: None
            </Button>
            <Button variant="outline" size="sm">
              Columns (8/8)
            </Button>
          </div>
        </div>

        {/* Products List */}
        <div className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Checkbox id="select-all" />
            <label htmlFor="select-all" className="text-sm text-muted-foreground">
              Select All ({products.length} selected)
            </label>
          </div>

          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-lg border border-border p-4 hover:shadow-[var(--shadow-card)] transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <Checkbox />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{product.category}</span>
                      <span>•</span>
                      <span>{product.brand}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground">₹{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                      <Badge className="bg-success text-success-foreground">{product.discount}% off</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-foreground">{product.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.reviews} reviews
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.images} images
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && <ProductForm onClose={() => setShowForm(false)} onSubmit={handleAddProduct} />}
    </div>
  );
};

export default ProductsManagement;
