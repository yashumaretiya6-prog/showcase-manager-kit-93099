import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ProductType {
  id: string;
  name: string;
  image: string;
  product_count?: number;
  display_order: number;
  is_active: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  product_types: ProductType[];
  display_order: number;
  is_active: boolean;
}

export interface SidebarCategory {
  id: string;
  name: string;
  icon_name: string;
  color: string;
  display_order: number;
  is_active: boolean;
  subcategories?: Subcategory[];
}

export interface FeaturedCategory {
  id: string;
  name: string;
  image: string;
  badge: string | null;
  display_order: number;
  is_active: boolean;
}

export interface PopularCategory {
  id: string;
  name: string;
  image: string;
  color: string;
  display_order: number;
  is_active: boolean;
}

interface CategoriesContextType {
  sidebarCategories: SidebarCategory[];
  featuredCategories: FeaturedCategory[];
  popularCategories: PopularCategory[];
  subcategories: Subcategory[];
  productTypes: ProductType[];
  addSidebarCategory: (category: Omit<SidebarCategory, 'id' | 'display_order'>) => void;
  updateSidebarCategory: (id: string, category: Partial<SidebarCategory>) => void;
  deleteSidebarCategory: (id: string) => void;
  reorderSidebarCategories: (categories: SidebarCategory[]) => void;
  addFeaturedCategory: (category: Omit<FeaturedCategory, 'id' | 'display_order'>) => void;
  updateFeaturedCategory: (id: string, category: Partial<FeaturedCategory>) => void;
  deleteFeaturedCategory: (id: string) => void;
  reorderFeaturedCategories: (categories: FeaturedCategory[]) => void;
  addPopularCategory: (category: Omit<PopularCategory, 'id' | 'display_order'>) => void;
  updatePopularCategory: (id: string, category: Partial<PopularCategory>) => void;
  deletePopularCategory: (id: string) => void;
  reorderPopularCategories: (categories: PopularCategory[]) => void;
  addSubcategory: (parentId: string, subcategory: Omit<Subcategory, 'id' | 'display_order' | 'product_types'>) => void;
  updateSubcategory: (id: string, subcategory: Partial<Subcategory>) => void;
  deleteSubcategory: (id: string) => void;
  addProductType: (subcategoryId: string, productType: Omit<ProductType, 'id' | 'display_order'>) => void;
  updateProductType: (id: string, productType: Partial<ProductType>) => void;
  deleteProductType: (id: string) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

const initialSidebarCategories: SidebarCategory[] = [
  { 
    id: 'popular', 
    name: 'Popular', 
    icon_name: 'Star', 
    color: 'text-yellow-500', 
    display_order: 1, 
    is_active: true,
    subcategories: []
  },
  { 
    id: 'women-ethnic', 
    name: 'Women\nEthnic', 
    icon_name: 'Shirt', 
    color: 'text-orange-500', 
    display_order: 2, 
    is_active: true,
    subcategories: [
      {
        id: 'sarees',
        name: 'Sarees',
        display_order: 1,
        is_active: true,
        product_types: [
          { id: 'all-sarees', name: 'All Sarees', image: '🥻', product_count: 1200, display_order: 1, is_active: true },
          { id: 'silk-sarees', name: 'Silk Sarees', image: '👗', product_count: 450, display_order: 2, is_active: true },
          { id: 'cotton-sarees', name: 'Cotton Sarees', image: '👘', product_count: 380, display_order: 3, is_active: true },
        ]
      },
      {
        id: 'kurtis',
        name: 'Kurtis',
        display_order: 2,
        is_active: true,
        product_types: [
          { id: 'all-kurtis', name: 'All Kurtis', image: '👗', product_count: 890, display_order: 1, is_active: true },
          { id: 'anarkali', name: 'Anarkali Kurtis', image: '👗', product_count: 320, display_order: 2, is_active: true },
        ]
      }
    ]
  },
  { 
    id: 'women-western', 
    name: 'Women\nWestern', 
    icon_name: 'Sparkles', 
    color: 'text-black', 
    display_order: 3, 
    is_active: true,
    subcategories: []
  },
  { 
    id: 'lingerie', 
    name: 'Lingerie', 
    icon_name: 'Heart', 
    color: 'text-red-500', 
    display_order: 4, 
    is_active: true,
    subcategories: []
  },
  { 
    id: 'men', 
    name: 'Men', 
    icon_name: 'User', 
    color: 'text-red-600', 
    display_order: 5, 
    is_active: true,
    subcategories: []
  },
  { 
    id: 'kids', 
    name: 'Kids & Toys', 
    icon_name: 'Baby', 
    color: 'text-amber-600', 
    display_order: 6, 
    is_active: true,
    subcategories: []
  },
  { 
    id: 'home', 
    name: 'Home &\nKitchen', 
    icon_name: 'Home', 
    color: 'text-gray-700', 
    display_order: 7, 
    is_active: true,
    subcategories: []
  },
];

const initialFeaturedCategories: FeaturedCategory[] = [
  { id: '1', name: 'Smartphones', image: '📱', badge: 'Mall', display_order: 1, is_active: true },
  { id: '2', name: 'Top Brands', image: '⌚', badge: 'Mall', display_order: 2, is_active: true },
  { id: '3', name: 'Premium\nCollection', image: '👗', badge: 'COD', display_order: 3, is_active: true },
  { id: '4', name: 'Fresh Apples', image: '🍎', badge: null, display_order: 4, is_active: true },
  { id: '5', name: 'Mom & Kids\nStore', image: '👪', badge: null, display_order: 5, is_active: true },
  { id: '6', name: 'Cookware', image: '🍳', badge: null, display_order: 6, is_active: true },
];

const initialPopularCategories: PopularCategory[] = [
  { id: '1', name: 'Kurtis & Dress\nMaterials', image: '👗', color: 'bg-gradient-to-br from-pink-100 to-red-100', display_order: 1, is_active: true },
  { id: '2', name: 'Sarees', image: '🥻', color: 'bg-gradient-to-br from-pink-100 to-orange-100', display_order: 2, is_active: true },
  { id: '3', name: 'Westernwear', image: '👖', color: 'bg-gradient-to-br from-gray-100 to-slate-100', display_order: 3, is_active: true },
  { id: '4', name: 'Jewellery', image: '📿', color: 'bg-gradient-to-br from-yellow-100 to-amber-100', display_order: 4, is_active: true },
  { id: '5', name: 'Men Fashion', image: '👔', color: 'bg-gradient-to-br from-red-100 to-orange-100', display_order: 5, is_active: true },
  { id: '6', name: 'Kids', image: '👶', color: 'bg-gradient-to-br from-blue-100 to-purple-100', display_order: 6, is_active: true },
  { id: '7', name: 'Footwear', image: '👟', color: 'bg-gradient-to-br from-red-100 to-blue-100', display_order: 7, is_active: true },
  { id: '8', name: 'Beauty &\nPersonal C...', image: '💄', color: 'bg-gradient-to-br from-pink-100 to-purple-100', display_order: 8, is_active: true },
  { id: '9', name: 'Grocery', image: '🛒', color: 'bg-gradient-to-br from-orange-100 to-yellow-100', display_order: 9, is_active: true },
];

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarCategories, setSidebarCategories] = useState<SidebarCategory[]>(initialSidebarCategories);
  const [featuredCategories, setFeaturedCategories] = useState<FeaturedCategory[]>(initialFeaturedCategories);
  const [popularCategories, setPopularCategories] = useState<PopularCategory[]>(initialPopularCategories);

  // Derived state for flat lists
  const subcategories = sidebarCategories.flatMap(cat => cat.subcategories || []);
  const productTypes = subcategories.flatMap(sub => sub.product_types || []);

  const addSidebarCategory = (category: Omit<SidebarCategory, 'id' | 'display_order'>) => {
    const newCategory: SidebarCategory = {
      ...category,
      id: Date.now().toString(),
      display_order: sidebarCategories.length + 1,
    };
    setSidebarCategories([...sidebarCategories, newCategory]);
  };

  const updateSidebarCategory = (id: string, updates: Partial<SidebarCategory>) => {
    setSidebarCategories(sidebarCategories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const deleteSidebarCategory = (id: string) => {
    setSidebarCategories(sidebarCategories.filter(cat => cat.id !== id));
  };

  const reorderSidebarCategories = (categories: SidebarCategory[]) => {
    setSidebarCategories(categories.map((cat, index) => ({ ...cat, display_order: index + 1 })));
  };

  const addFeaturedCategory = (category: Omit<FeaturedCategory, 'id' | 'display_order'>) => {
    const newCategory: FeaturedCategory = {
      ...category,
      id: Date.now().toString(),
      display_order: featuredCategories.length + 1,
    };
    setFeaturedCategories([...featuredCategories, newCategory]);
  };

  const updateFeaturedCategory = (id: string, updates: Partial<FeaturedCategory>) => {
    setFeaturedCategories(featuredCategories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const deleteFeaturedCategory = (id: string) => {
    setFeaturedCategories(featuredCategories.filter(cat => cat.id !== id));
  };

  const reorderFeaturedCategories = (categories: FeaturedCategory[]) => {
    setFeaturedCategories(categories.map((cat, index) => ({ ...cat, display_order: index + 1 })));
  };

  const addPopularCategory = (category: Omit<PopularCategory, 'id' | 'display_order'>) => {
    const newCategory: PopularCategory = {
      ...category,
      id: Date.now().toString(),
      display_order: popularCategories.length + 1,
    };
    setPopularCategories([...popularCategories, newCategory]);
  };

  const updatePopularCategory = (id: string, updates: Partial<PopularCategory>) => {
    setPopularCategories(popularCategories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const deletePopularCategory = (id: string) => {
    setPopularCategories(popularCategories.filter(cat => cat.id !== id));
  };

  const reorderPopularCategories = (categories: PopularCategory[]) => {
    setPopularCategories(categories.map((cat, index) => ({ ...cat, display_order: index + 1 })));
  };

  const addSubcategory = (parentId: string, subcategory: Omit<Subcategory, 'id' | 'display_order' | 'product_types'>) => {
    const newSubcategory: Subcategory = {
      ...subcategory,
      id: Date.now().toString(),
      display_order: (subcategories.length || 0) + 1,
      product_types: []
    };
    
    setSidebarCategories(sidebarCategories.map(cat => 
      cat.id === parentId 
        ? { ...cat, subcategories: [...(cat.subcategories || []), newSubcategory] }
        : cat
    ));
  };

  const updateSubcategory = (id: string, updates: Partial<Subcategory>) => {
    setSidebarCategories(sidebarCategories.map(cat => ({
      ...cat,
      subcategories: (cat.subcategories || []).map(sub =>
        sub.id === id ? { ...sub, ...updates } : sub
      )
    })));
  };

  const deleteSubcategory = (id: string) => {
    setSidebarCategories(sidebarCategories.map(cat => ({
      ...cat,
      subcategories: (cat.subcategories || []).filter(sub => sub.id !== id)
    })));
  };

  const addProductType = (subcategoryId: string, productType: Omit<ProductType, 'id' | 'display_order'>) => {
    const newProductType: ProductType = {
      ...productType,
      id: Date.now().toString(),
      display_order: (productTypes.length || 0) + 1
    };

    setSidebarCategories(sidebarCategories.map(cat => ({
      ...cat,
      subcategories: (cat.subcategories || []).map(sub =>
        sub.id === subcategoryId
          ? { ...sub, product_types: [...sub.product_types, newProductType] }
          : sub
      )
    })));
  };

  const updateProductType = (id: string, updates: Partial<ProductType>) => {
    setSidebarCategories(sidebarCategories.map(cat => ({
      ...cat,
      subcategories: (cat.subcategories || []).map(sub => ({
        ...sub,
        product_types: sub.product_types.map(pt =>
          pt.id === id ? { ...pt, ...updates } : pt
        )
      }))
    })));
  };

  const deleteProductType = (id: string) => {
    setSidebarCategories(sidebarCategories.map(cat => ({
      ...cat,
      subcategories: (cat.subcategories || []).map(sub => ({
        ...sub,
        product_types: sub.product_types.filter(pt => pt.id !== id)
      }))
    })));
  };

  return (
    <CategoriesContext.Provider
      value={{
        sidebarCategories,
        featuredCategories,
        popularCategories,
        subcategories,
        productTypes,
        addSidebarCategory,
        updateSidebarCategory,
        deleteSidebarCategory,
        reorderSidebarCategories,
        addFeaturedCategory,
        updateFeaturedCategory,
        deleteFeaturedCategory,
        reorderFeaturedCategories,
        addPopularCategory,
        updatePopularCategory,
        deletePopularCategory,
        reorderPopularCategories,
        addSubcategory,
        updateSubcategory,
        deleteSubcategory,
        addProductType,
        updateProductType,
        deleteProductType,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within CategoriesProvider');
  }
  return context;
};
