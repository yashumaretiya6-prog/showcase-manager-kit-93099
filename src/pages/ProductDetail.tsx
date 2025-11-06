import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductDetails } from '@/components/product/ProductDetails';
import { RecommendedProducts } from '@/components/product/RecommendedProducts';
import { ProductActions } from '@/components/product/ProductActions';
import { SizeSelector } from '@/components/product/SizeSelector';
import { TrustIndicators } from '@/components/product/TrustIndicators';
import { UrgencyIndicators } from '@/components/product/UrgencyIndicators';
import { Buy2Get1FreeOffer } from '@/components/product/Buy2Get1FreeOffer';
import { TrustedBadge } from '@/components/ui/trusted-badge';
import { isClothingCategory } from '@/utils/categoryUtils';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const { products } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isClothingProduct, setIsClothingProduct] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        console.log('Product found:', foundProduct);
        console.log('Product category:', foundProduct.category);
        
        const isClothing = isClothingCategory(foundProduct.category, foundProduct.description, foundProduct.name);
        setIsClothingProduct(isClothing);
        console.log('Is clothing product:', isClothing);
        
        setProduct(foundProduct);
        
        if (isClothing) {
          let productSizes = foundProduct.sizes;
          if (!productSizes || productSizes.length === 0) {
            productSizes = ['S', 'M', 'L', 'XL', 'XXL'];
          }
          setSelectedSize(productSizes[0]);
          console.log('Auto-selected size for clothing:', productSizes[0]);
        } else {
          setSelectedSize('');
          console.log('No size selection needed for non-clothing product');
        }
      }
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton title="Product" />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Product not found</h2>
            <Button onClick={() => navigate('/')}>Go back to home</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (isClothingProduct && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Size selection is required for clothing items",
        variant: "destructive"
      });
      return;
    }

    addItem(product);
    
    const sizeMessage = isClothingProduct ? ` (Size: ${selectedSize})` : '';
    toast({
      title: "Added to cart",
      description: `${product.name}${sizeMessage} has been added to your cart`
    });
  };

  const handleBuyNow = () => {
    if (isClothingProduct && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Size selection is required for clothing items",
        variant: "destructive"
      });
      return;
    }

    addItem(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton />
      
      <main className="pb-24">
        <ProductImageGallery 
          productName={product.name} 
          mainImage={product.image} 
          additionalImages={product.images} 
        />

        <ProductInfo product={product} />
        
        <UrgencyIndicators productId={product.id} />
        
        <Buy2Get1FreeOffer />
        
        <TrustIndicators />
        
        {isClothingProduct && (
          <SizeSelector 
            sizes={product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL', 'XXL']} 
            selectedSize={selectedSize} 
            onSizeChange={(size) => {
              console.log('Size changed to:', size);
              setSelectedSize(size);
            }} 
          />
        )}
        
        <ProductDetails product={product} />

        <RecommendedProducts products={products} excludeProductId={product.id} />
      </main>

      <ProductActions 
        product={product} 
        onAddToCart={handleAddToCart} 
        onBuyNow={handleBuyNow} 
      />
    </div>
  );
};

export default ProductDetail;
