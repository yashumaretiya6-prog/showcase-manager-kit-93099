import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Product } from "@/types/product";

interface AddProductDialogProps {
  showDialog: boolean;
  newProduct: Partial<Product>;
  onDialogChange: (open: boolean) => void;
  onProductChange: (product: Partial<Product>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const AddProductDialog = ({
  showDialog,
  newProduct,
  onDialogChange,
  onProductChange,
  onSave,
}: AddProductDialogProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={onDialogChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) => onProductChange({ ...newProduct, name: e.target.value })}
              placeholder="Enter product name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => onProductChange({ ...newProduct, price: Number(e.target.value) })}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input
                id="originalPrice"
                type="number"
                value={newProduct.originalPrice}
                onChange={(e) => onProductChange({ ...newProduct, originalPrice: Number(e.target.value) })}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newProduct.category}
                onChange={(e) => onProductChange({ ...newProduct, category: e.target.value })}
                placeholder="e.g., Kurtis, Sarees"
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={newProduct.brand}
                onChange={(e) => onProductChange({ ...newProduct, brand: e.target.value })}
                placeholder="Brand name"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={newProduct.image}
              onChange={(e) => onProductChange({ ...newProduct, image: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newProduct.description}
              onChange={(e) => onProductChange({ ...newProduct, description: e.target.value })}
              placeholder="Product description"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onDialogChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSave} className="bg-primary hover:bg-primary/90">
              Add Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
