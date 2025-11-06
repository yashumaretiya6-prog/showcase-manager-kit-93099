import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";

interface ProductFormProps {
  onClose: () => void;
  onSubmit: (product: any) => void;
  initialData?: any;
}

export const ProductForm = ({ onClose, onSubmit, initialData }: ProductFormProps) => {
  const [formData, setFormData] = useState(initialData || {
    name: "",
    brand: "",
    category: "",
    sellingPrice: "",
    originalPrice: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-[var(--shadow-elegant)] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Add New Product</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Fill in the product details below to add a new item to your inventory.
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <Tabs defaultValue="basic" className="w-full">
            <div className="px-6 pt-4 border-b border-border">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="attributes">Attributes</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="basic" className="space-y-4 mt-0">
                <div>
                  <Label htmlFor="name" className="text-foreground">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand" className="text-foreground">Brand</Label>
                    <Input
                      id="brand"
                      placeholder="Enter brand name"
                      value={formData.brand}
                      onChange={(e) => handleChange("brand", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-foreground">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kurtis">Kurtis</SelectItem>
                        <SelectItem value="sarees">Sarees</SelectItem>
                        <SelectItem value="dresses">Dresses</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sellingPrice" className="text-foreground">Selling Price (₹) *</Label>
                    <Input
                      id="sellingPrice"
                      type="number"
                      placeholder="0.00"
                      value={formData.sellingPrice}
                      onChange={(e) => handleChange("sellingPrice", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice" className="text-foreground">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="0.00"
                      value={formData.originalPrice}
                      onChange={(e) => handleChange("originalPrice", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-foreground">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="images" className="mt-0">
                <div className="text-center py-12 text-muted-foreground">
                  Image upload functionality will be implemented here
                </div>
              </TabsContent>

              <TabsContent value="inventory" className="mt-0">
                <div className="text-center py-12 text-muted-foreground">
                  Inventory management will be implemented here
                </div>
              </TabsContent>

              <TabsContent value="attributes" className="mt-0">
                <div className="text-center py-12 text-muted-foreground">
                  Product attributes will be implemented here
                </div>
              </TabsContent>

              <TabsContent value="seo" className="mt-0">
                <div className="text-center py-12 text-muted-foreground">
                  SEO settings will be implemented here
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-0">
                <div className="text-center py-12 text-muted-foreground">
                  Shipping options will be implemented here
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="p-6 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
