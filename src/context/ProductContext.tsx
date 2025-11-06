import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product } from '@/types/product';

interface ProductContextType {
  products: Product[];
  addProducts: (products: Product[]) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  refreshProducts: () => Promise<void>;
  loadMoreProducts: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  exportProducts: () => Promise<void>;
  importProducts: (products: Product[]) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Ethnic Embroidered Kurti",
      price: 799,
      originalPrice: 1599,
      discount: 50,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      images: ["https://images.unsplash.com/photo-1583391733981-8b1b29bdd2ca?w=800"],
      category: "Kurtis",
      brand: "Store Brand",
      description: "Elegant embroidered kurti with traditional patterns. Perfect for festive occasions. Features intricate embroidery work and comfortable fabric for all-day wear.",
      specifications: {
        'Design & Style': {
          'Pattern': 'Embroidered',
          'Sleeve Length': '3/4 Sleeve',
          'Neck Type': 'V-Neck',
          'Length': 'Calf Length',
          'Occasion': 'Festive, Party',
          'Ornamentation': 'Thread Work, Sequins'
        },
        'Fabric & Material': {
          'Fabric': 'Rayon',
          'Lining': 'Cotton',
          'Wash Care': 'Hand wash or gentle machine wash',
          'Fade Resistant': 'Yes'
        },
        'General': {
          'Brand': 'Store Brand',
          'Model': 'KRT-001',
          'Country of Origin': 'India',
          'Available Sizes': 'S, M, L, XL, XXL'
        }
      },
      keyFeatures: [
        'Intricate thread work embroidery',
        'Comfortable rayon fabric',
        'Perfect for festive occasions',
        'Easy to maintain',
        'Flattering fit for all body types'
      ],
      warrantyDetails: {
        duration: '15 days return policy',
        coverage: [
          'Size mismatch',
          'Manufacturing defects',
          'Fabric quality issues'
        ],
        terms: [
          'Product must be unworn and unwashed',
          'Original packaging required',
          'Tags should be intact'
        ]
      },
      rating: 4.7,
      reviews: 189,
      freeDelivery: true,
      specialOffers: ["Buy 2 Get 1 FREE"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock_quantity: 6,
      featured: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const addProducts = useCallback(async (newProducts: Product[]) => {
    setProducts(prev => [...prev, ...newProducts]);
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    // Simulated refresh
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  }, []);

  const loadMoreProducts = useCallback(async () => {
    // Simulated pagination
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  }, []);

  const exportProducts = useCallback(async () => {
    const csv = [
      'id,name,price,originalPrice,discount,category,brand,description,rating,reviews',
      ...products.map(p => 
        `${p.id},${p.name},${p.price},${p.originalPrice},${p.discount},${p.category},${p.brand},"${p.description}",${p.rating},${p.reviews}`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
  }, [products]);

  const importProducts = useCallback(async (newProducts: Product[]) => {
    setProducts(prev => [...prev, ...newProducts]);
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      addProducts,
      deleteProduct,
      updateProduct,
      refreshProducts,
      loadMoreProducts,
      hasMore,
      loading,
      exportProducts,
      importProducts,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
