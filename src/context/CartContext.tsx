import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem as CartItemType, ProductVariant } from '@/types/product';

interface CartItem extends CartItemType {}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string, selectedVariant?: ProductVariant) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (
    product: Product, 
    quantity: number = 1,
    selectedSize?: string,
    selectedColor?: string,
    selectedVariant?: ProductVariant
  ) => {
    setItems(prev => {
      // Create unique key based on product + variant
      const variantKey = `${product.id}-${selectedSize || ''}-${selectedColor || ''}`;
      const existing = prev.find(item => {
        const itemKey = `${item.productId}-${item.selectedSize || ''}-${item.selectedColor || ''}`;
        return itemKey === variantKey;
      });
      
      if (existing) {
        return prev.map(item => {
          const itemKey = `${item.productId}-${item.selectedSize || ''}-${item.selectedColor || ''}`;
          return itemKey === variantKey
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      }

      const price = selectedVariant?.price || product.price;
      const image = selectedVariant?.images?.[0] || product.image;
      const maxQuantity = selectedVariant?.stock || product.stock_quantity || 999;

      return [...prev, { 
        id: variantKey,
        productId: product.id,
        name: product.name,
        price,
        image,
        quantity,
        selectedSize,
        selectedColor,
        selectedVariant,
        maxQuantity
      }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
