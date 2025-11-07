import { useState, useCallback } from 'react';
import { Product } from '@/types/product';
import { ProductService } from '@/services/productService';
import { mockProducts } from '@/data/mockProducts';

const PRODUCTS_PER_PAGE = 20;

export const useProductOperations = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  // Initialize products - load from Supabase or fallback to mock data
  const initializeProducts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Initializing products...');
      
      const existingProducts = await ProductService.fetchProducts(0, PRODUCTS_PER_PAGE);

      if (existingProducts && existingProducts.length > 0) {
        console.log(`Found ${existingProducts.length} existing products`);
        setProducts(existingProducts);
        setOffset(existingProducts.length);
        setHasMore(existingProducts.length === PRODUCTS_PER_PAGE);
      } else {
        console.log('No products in database, using mock data');
        setProducts(mockProducts);
        setOffset(mockProducts.length);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to initialize products, using mock data:', error);
      setProducts(mockProducts);
      setOffset(mockProducts.length);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more products for infinite scroll
  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      console.log(`Loading more products from offset ${offset}...`);
      
      const moreProducts = await ProductService.fetchProducts(offset, PRODUCTS_PER_PAGE);

      if (moreProducts && moreProducts.length > 0) {
        setProducts(prev => [...prev, ...moreProducts]);
        setOffset(prev => prev + moreProducts.length);
        setHasMore(moreProducts.length === PRODUCTS_PER_PAGE);
        console.log(`Loaded ${moreProducts.length} more products`);
      } else {
        setHasMore(false);
        console.log('No more products to load');
      }
    } catch (error) {
      console.error('Failed to load more products:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset]);

  // Add products to database
  const addProducts = async (newProducts: Product[]) => {
    await ProductService.addProducts(newProducts);
  };

  // Delete product from database
  const deleteProduct = async (id: string) => {
    await ProductService.deleteProduct(id);
  };

  // Update product in database
  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    await ProductService.updateProduct(id, updatedProduct);
  };

  // Refresh all products
  const refreshProducts = useCallback(async () => {
    setOffset(0);
    setHasMore(true);
    await initializeProducts();
  }, [initializeProducts]);

  // Enhanced export with better formatting and validation
  const exportProducts = () => {
    try {
      // Create a clean export format
      const exportData = products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        image: product.image,
        images: product.images || [],
        rating: product.rating,
        reviews: product.reviews,
        category: product.category,
        brand: product.brand || '',
        description: product.description || '',
        specifications: product.specifications || {},
        freeDelivery: product.freeDelivery !== false,
        specialOffers: product.specialOffers || []
      }));
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `products_backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      console.log(`Exported ${exportData.length} products successfully`);
    } catch (error) {
      console.error('Failed to export products:', error);
      throw error;
    }
  };

  // Enhanced import with comprehensive error handling
  const importProducts = async (importedProducts: Product[]) => {
    try {
      console.log('Starting import of', importedProducts.length, 'products...');
      
      // Use the enhanced import method from ProductService
      const importedCount = await ProductService.importProducts(importedProducts);
      console.log(`Import completed successfully: ${importedCount} products`);
      
      // Force refresh the products immediately
      await refreshProducts();
      
      return importedCount;
    } catch (error) {
      console.error('Failed to import products:', error);
      throw error;
    }
  };

  return {
    products,
    loading,
    hasMore,
    initializeProducts,
    loadMoreProducts,
    addProducts,
    deleteProduct,
    updateProduct,
    exportProducts,
    importProducts,
    refreshProducts
  };
};