
import React, { createContext, useContext, useEffect } from 'react';
import { useProductOperations } from '@/hooks/useProductOperations';
import { Product } from '@/types/product';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  addProducts: (products: Product[]) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => Promise<void>;
  refreshProducts: () => Promise<void>;
  loadMoreProducts: () => Promise<void>;
  exportProducts: () => void;
  importProducts: (products: Product[]) => Promise<number>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const productOperations = useProductOperations();

  useEffect(() => {
    productOperations.initializeProducts();
  }, []);

  return (
    <ProductContext.Provider value={productOperations}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
