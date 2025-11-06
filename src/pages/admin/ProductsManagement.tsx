import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/types/product';
import { ProductManagementHeader } from '@/components/admin/ProductManagementHeader';
import { AddProductDialog } from '@/components/admin/AddProductDialog';
import { ProductFormAdvanced } from '@/components/admin/ProductFormAdvanced';
import { ProductList } from '@/components/admin/ProductList';
import { ProductService } from '@/services/productService';
import { isClothingCategory, getClothingSizes } from '@/utils/categoryUtils';
import { useProductFilters } from '@/hooks/useProductFilters';
import { ColumnConfig } from '@/components/admin/filters/ColumnVisibility';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

const ProductsManagement: React.FC = () => {
  const { toast } = useToast();
  const { products, addProducts, deleteProduct, updateProduct, refreshProducts, loadMoreProducts, hasMore, loading } = useProducts();
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    image: '',
    images: [],
    category: '',
    brand: '',
    description: '',
    rating: 4.0,
    reviews: 0
  });

  const { filters, filteredProducts, updateFilters, availableCategories } = useProductFilters(products);

  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'image', label: 'Image', visible: true },
    { id: 'name', label: 'Name', visible: true },
    { id: 'price', label: 'Price', visible: true },
    { id: 'category', label: 'Category', visible: true },
    { id: 'stock', label: 'Stock', visible: true },
    { id: 'rating', label: 'Rating', visible: true },
    { id: 'status', label: 'Status', visible: true },
    { id: 'actions', label: 'Actions', visible: true },
  ]);

  const handleColumnToggle = (columnId: string) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    ));
  };

  const handleResetColumns = () => {
    setColumns(prev => prev.map(col => ({ ...col, visible: true })));
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refreshProducts();
      toast({
        title: "Products refreshed",
        description: "Product list has been updated.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Failed to refresh products.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      toast({
        title: "Product deleted",
        description: "Product has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete product.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAllProducts = async () => {
    try {
      setIsDeletingAll(true);
      await ProductService.deleteAllProducts();
      await refreshProducts();
      toast({
        title: "All products deleted",
        description: "Successfully deleted all products.",
      });
    } catch (error) {
      toast({
        title: "Delete all failed",
        description: "Failed to delete all products.",
        variant: "destructive"
      });
    } finally {
      setIsDeletingAll(false);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      toast({
        title: "Missing required fields",
        description: "Product name and price are required.",
        variant: "destructive"
      });
      return;
    }

    try {
      const category = newProduct.category || 'General';
      const isClothing = isClothingCategory(category, newProduct.description, newProduct.name);
      const sizes = isClothing ? getClothingSizes() : undefined;

      const price = Number(newProduct.price) || 0;
      const originalPrice = Number(newProduct.originalPrice) || price;
      const discount = originalPrice > price ? 
        Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

      const product: Product = {
        id: crypto.randomUUID(),
        name: newProduct.name!,
        price: price,
        originalPrice: originalPrice,
        discount: discount,
        image: newProduct.image || 'https://via.placeholder.com/300',
        images: newProduct.images || [],
        category: category,
        brand: newProduct.brand || 'Generic',
        description: newProduct.description || 'No description available',
        rating: Number(newProduct.rating) || 4.0,
        reviews: Number(newProduct.reviews) || 0,
        freeDelivery: true,
        specialOffers: [],
        sizes: sizes
      };

      await addProducts([product]);
      setNewProduct({
        name: '',
        price: 0,
        originalPrice: 0,
        discount: 0,
        image: '',
        images: [],
        category: '',
        brand: '',
        description: '',
        rating: 4.0,
        reviews: 0
      });
      setShowAddDialog(false);
      toast({
        title: "Product added",
        description: "New product has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Add failed",
        description: "Failed to add product.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const isClothing = isClothingCategory(editingProduct.category, editingProduct.description, editingProduct.name);
      
      const price = Number(editingProduct.price) || 0;
      const originalPrice = Number(editingProduct.originalPrice) || 0;
      const discount = originalPrice > price ? 
        Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
      
      const updatedProduct = {
        ...editingProduct,
        price: price,
        originalPrice: originalPrice,
        discount,
        rating: Number(editingProduct.rating) || 4.0,
        reviews: Number(editingProduct.reviews) || 0,
        sizes: editingProduct.sizes || (isClothing ? getClothingSizes() : undefined)
      };

      await updateProduct(editingProduct.id, updatedProduct);
      setEditingProduct(null);
      toast({
        title: "Product updated",
        description: "Product has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update product.",
        variant: "destructive"
      });
    }
  };

  const handleBulkUpdate = async (productIds: string[], updates: Partial<Product>) => {
    try {
      await Promise.all(
        productIds.map(id => updateProduct(id, updates))
      );

      toast({
        title: "Bulk update completed",
        description: `Successfully updated ${productIds.length} products.`,
      });
    } catch (error) {
      toast({
        title: "Bulk update failed",
        description: "Failed to update products.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 p-6 space-y-6">
        <Card className="p-6">
          <ProductManagementHeader 
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            onDeleteAll={handleDeleteAllProducts}
            isDeleting={isDeletingAll}
            productCount={products.length}
            filters={filters}
            onFiltersChange={updateFilters}
            categories={availableCategories}
            columns={columns}
            onColumnToggle={handleColumnToggle}
            onResetColumns={handleResetColumns}
          />
        </Card>

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {filteredProducts.length !== products.length && (
              <span>Showing {filteredProducts.length} of {products.length} products</span>
            )}
          </div>
          <AddProductDialog
            showDialog={showAddDialog}
            newProduct={newProduct}
            onDialogChange={setShowAddDialog}
            onProductChange={setNewProduct}
            onSave={handleAddProduct}
            onCancel={() => setShowAddDialog(false)}
          />
        </div>

        <Card className="p-6">
          <ProductList
            products={filteredProducts}
            loading={loading}
            hasMore={hasMore}
            editingProduct={editingProduct}
            onLoadMore={loadMoreProducts}
            onEdit={setEditingProduct}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
            onCancelEdit={() => setEditingProduct(null)}
            onProductChange={(updatedProduct) => setEditingProduct(prev => prev ? { ...prev, ...updatedProduct } : null)}
            onBulkUpdate={handleBulkUpdate}
            visibleColumns={columns}
          />
        </Card>
      </div>
    </div>
  );
};

export default ProductsManagement;
