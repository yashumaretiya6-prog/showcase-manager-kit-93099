import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Trash2, Search, Filter, Columns } from "lucide-react";
import { ProductFilters } from "@/types/product";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColumnConfig } from "./filters/ColumnVisibility";

interface ProductManagementHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  onDeleteAll: () => void;
  isDeleting: boolean;
  productCount: number;
  filters: ProductFilters;
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
  categories: string[];
  columns: ColumnConfig[];
  onColumnToggle: (columnId: string) => void;
  onResetColumns: () => void;
}

export const ProductManagementHeader = ({
  onRefresh,
  isRefreshing,
  onDeleteAll,
  isDeleting,
  productCount,
  filters,
  onFiltersChange,
  categories,
}: ProductManagementHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Products Management</h2>
          <p className="text-muted-foreground">{productCount} total products</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onDeleteAll}
            disabled={isDeleting}
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete All
          </Button>
          <Button variant="outline" onClick={onRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
          />
        </div>
        <Select 
          value={filters.category || "all"} 
          onValueChange={(value) => onFiltersChange({ category: value === "all" ? "" : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
