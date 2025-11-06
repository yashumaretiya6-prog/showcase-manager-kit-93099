import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ColumnConfig } from "./filters/ColumnVisibility";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  editingProduct: Product | null;
  onLoadMore: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onUpdate: () => void;
  onCancelEdit: () => void;
  onProductChange: (product: Partial<Product>) => void;
  onBulkUpdate: (ids: string[], updates: Partial<Product>) => void;
  visibleColumns: ColumnConfig[];
}

export const ProductList = ({
  products,
  loading,
  editingProduct,
  onEdit,
  onDelete,
  onUpdate,
  onCancelEdit,
  onProductChange,
}: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No products found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => {
        const isEditing = editingProduct?.id === product.id;

        return (
          <div
            key={product.id}
            className="bg-card rounded-lg border border-border p-4 hover:shadow-[var(--shadow-card)] transition-shadow"
          >
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editingProduct.name}
                  onChange={(e) => onProductChange({ name: e.target.value })}
                  placeholder="Product name"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => onProductChange({ price: Number(e.target.value) })}
                    placeholder="Price"
                  />
                  <Input
                    value={editingProduct.category}
                    onChange={(e) => onProductChange({ category: e.target.value })}
                    placeholder="Category"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={onUpdate}>Save</Button>
                  <Button size="sm" variant="outline" onClick={onCancelEdit}>Cancel</Button>
                </div>
              </div>
            ) : (
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
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(product.id)}
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {loading && (
        <div className="text-center py-4 text-muted-foreground">Loading...</div>
      )}
    </div>
  );
};
