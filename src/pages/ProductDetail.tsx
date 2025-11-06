import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { Product, ProductVariant, ColorOption } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductDetails } from '@/components/product/ProductDetails';
import { RecommendedProducts } from '@/components/product/RecommendedProducts';
import { ProductActions } from '@/components/product/ProductActions';
import { SizeSelector } from '@/components/product/SizeSelector';
import { ColorSelector } from '@/components/product/ColorSelector';
import { QuantitySelector } from '@/components/product/QuantitySelector';
import { DeliveryChecker } from '@/components/product/DeliveryChecker';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { BulkDiscountBanner } from '@/components/product/BulkDiscountBanner';
import { CategorySpecificDetails } from '@/components/product/CategorySpecificDetails';
import { TrustIndicators } from '@/components/product/TrustIndicators';
import { UrgencyIndicators } from '@/components/product/UrgencyIndicators';
import { Buy2Get1FreeOffer } from '@/components/product/Buy2Get1FreeOffer';
import { EMIOptions } from '@/components/product/EMIOptions';
import { FAQSection } from '@/components/product/FAQSection';
import { isClothingCategory } from '@/utils/categoryUtils';
import { Ruler } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const { products } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isClothingProduct, setIsClothingProduct] = useState<boolean>(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | undefined>();
  const [maxQuantity, setMaxQuantity] = useState<number>(999);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        const isClothing = isClothingCategory(foundProduct.category, foundProduct.description, foundProduct.name);
        setIsClothingProduct(isClothing);
        setProduct(foundProduct);

        // Initialize color options
        if (foundProduct.colorOptions && foundProduct.colorOptions.length > 0) {
          const firstAvailableColor = foundProduct.colorOptions.find(c => c.available);
          if (firstAvailableColor) {
            setSelectedColor(firstAvailableColor.name);
          }
        }
        
        // Initialize size for clothing
        if (isClothing) {
          let productSizes = foundProduct.sizes;
          if (!productSizes || productSizes.length === 0) {
            productSizes = ['S', 'M', 'L', 'XL', 'XXL'];
          }
          setSelectedSize(productSizes[0]);
        }

        // Set max quantity
        setMaxQuantity(foundProduct.stock_quantity || 999);
        setQuantity(1);
      }
    }
  }, [id, products]);

  // Update variant when size or color changes
  useEffect(() => {
    if (product?.variants && (selectedSize || selectedColor)) {
      const variant = product.variants.find(v => 
        (!selectedSize || v.size === selectedSize) &&
        (!selectedColor || v.color === selectedColor)
      );
      setCurrentVariant(variant);
      if (variant) {
        setMaxQuantity(variant.stock);
      } else {
        setMaxQuantity(product.stock_quantity || 999);
      }
    }
  }, [selectedSize, selectedColor, product]);

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
    // Validate size for clothing
    if (isClothingProduct && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Size selection is required for clothing items",
        variant: "destructive"
      });
      return;
    }

    // Validate color if color options exist
    if (product.colorOptions && product.colorOptions.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        description: "Color selection is required for this product",
        variant: "destructive"
      });
      return;
    }

    // Check stock
    if (quantity > maxQuantity) {
      toast({
        title: "Insufficient stock",
        description: `Only ${maxQuantity} items available`,
        variant: "destructive"
      });
      return;
    }

    addItem(product, quantity, selectedSize, selectedColor, currentVariant);
    
    const details = [];
    if (selectedSize) details.push(`Size: ${selectedSize}`);
    if (selectedColor) details.push(`Color: ${selectedColor}`);
    if (quantity > 1) details.push(`Qty: ${quantity}`);
    const detailsText = details.length > 0 ? ` (${details.join(', ')})` : '';
    
    toast({
      title: "Added to cart",
      description: `${product.name}${detailsText} has been added to your cart`
    });

    // Reset quantity after adding
    setQuantity(1);
  };

  const handleBuyNow = () => {
    // Same validation as add to cart
    if (isClothingProduct && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Size selection is required for clothing items",
        variant: "destructive"
      });
      return;
    }

    if (product.colorOptions && product.colorOptions.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        description: "Color selection is required for this product",
        variant: "destructive"
      });
      return;
    }

    if (quantity > maxQuantity) {
      toast({
        title: "Insufficient stock",
        description: `Only ${maxQuantity} items available`,
        variant: "destructive"
      });
      return;
    }

    addItem(product, quantity, selectedSize, selectedColor, currentVariant);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton />
      
      <main className="pb-24">
        <ProductImageGallery 
          productName={product.name} 
          mainImage={currentVariant?.images?.[0] || product.image} 
          additionalImages={currentVariant?.images || product.images}
          product={product}
          rating={product.rating}
          reviewCount={product.reviews}
        />

        <ProductInfo product={product} />
        
        <UrgencyIndicators product={product} />
        
        {product.bulkDiscounts && product.bulkDiscounts.length > 0 && (
          <BulkDiscountBanner bulkDiscounts={product.bulkDiscounts} currentQuantity={quantity} />
        )}
        
        <Buy2Get1FreeOffer product={product} />
        
        <TrustIndicators />

        {/* Color Selector */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <ColorSelector 
            colors={product.colorOptions} 
            selectedColor={selectedColor} 
            onColorChange={setSelectedColor} 
          />
        )}
        
        {/* Size Selector */}
        {isClothingProduct && (
          <div className="border-t border-border">
            <div className="px-4 py-3 flex items-center justify-between">
              <SizeSelector 
                sizes={product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL', 'XXL']} 
                selectedSize={selectedSize} 
                onSizeChange={setSelectedSize} 
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSizeGuideOpen(true)}
                className="text-primary"
              >
                <Ruler className="w-4 h-4 mr-1" />
                Size Guide
              </Button>
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <QuantitySelector 
          quantity={quantity}
          maxQuantity={maxQuantity}
          onQuantityChange={setQuantity}
          showBulkDiscount={!!product.bulkDiscounts && product.bulkDiscounts.length > 0}
        />

        {/* Delivery Checker */}
        <DeliveryChecker />
        
        {/* Product Details */}
        <ProductDetails product={product} />

        {/* Category Specific Details */}
        <CategorySpecificDetails product={product} />

        {/* EMI Options */}
        {product.emiAvailable && product.price >= 3000 && (
          <EMIOptions price={currentVariant?.price || product.price} />
        )}

        {/* FAQ Section */}
        <FAQSection category={product.category} />

        {/* Reviews Section */}
        <ReviewsSection 
          reviews={product.reviews_data || []}
          averageRating={product.rating}
          totalReviews={product.reviews}
        />

        {/* Recommended Products */}
        <RecommendedProducts products={products} excludeProductId={product.id} />
      </main>

      {/* Size Guide Modal */}
      <SizeGuideModal 
        open={sizeGuideOpen}
        onOpenChange={setSizeGuideOpen}
        category={product.category}
      />

      <ProductActions 
        product={product} 
        onAddToCart={handleAddToCart} 
        onBuyNow={handleBuyNow} 
      />
    </div>
  );
};

export default ProductDetail;
