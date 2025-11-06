import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/home/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/product-skeleton';

interface RecommendedProductsProps {
  products: Product[];
  excludeProductId: string;
}

export const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  products,
  excludeProductId
}) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [smoothLoading, setSmoothLoading] = useState(false);
  
  const PRODUCTS_PER_LOAD = 6;

  // Get all products except current one for recommendations
  const recommendedProducts = products.filter(p => p.id !== excludeProductId);
  const hasMoreProducts = displayedProducts.length < recommendedProducts.length;

  // Initialize with first batch - fixed dependency to prevent infinite loop
  useEffect(() => {
    if (recommendedProducts.length > 0) {
      setDisplayedProducts(recommendedProducts.slice(0, PRODUCTS_PER_LOAD));
    }
  }, [excludeProductId]); // Only depend on excludeProductId, not the entire array

  // Load more products handler with smooth loading
  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || !hasMoreProducts || smoothLoading) return;
    
    setSmoothLoading(true);
    setIsLoadingMore(true);
    
    // Enhanced loading delay for smoother UX
    setTimeout(() => {
      setDisplayedProducts(prev => {
        const nextBatch = recommendedProducts.slice(0, prev.length + PRODUCTS_PER_LOAD);
        return nextBatch;
      });
      setTimeout(() => {
        setIsLoadingMore(false);
        setSmoothLoading(false);
      }, 150);
    }, 400);
  }, [isLoadingMore, hasMoreProducts, smoothLoading, excludeProductId]); // Fixed dependencies

  // Enhanced intersection observer for smooth infinite scroll
  const lastProductRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingMore || smoothLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreProducts && !smoothLoading) {
        loadMoreProducts();
      }
    }, { 
      threshold: 0.1,
      rootMargin: '100px'
    });
    
    if (node) observerRef.current.observe(node);
  }, [isLoadingMore, hasMoreProducts, loadMoreProducts, smoothLoading]);

  // Cleanup observer
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (displayedProducts.length === 0) {
    return null;
  }

  return (
    <div className="px-3 sm:px-4 mb-6">
      <h3 className="font-semibold text-foreground mb-4">More Products For You</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
        {displayedProducts.map((recProduct, index) => {
          // Use unique key combining id and index to avoid duplicate key warnings
          const uniqueKey = `${recProduct.id}-${index}`;
          
          // Attach observer to the last product
          if (displayedProducts.length === index + 1) {
            return (
              <div key={uniqueKey} ref={lastProductRef} className="animate-fade-in">
                <ProductCard product={recProduct} />
              </div>
            );
          }
          return (
            <div key={uniqueKey} className="animate-fade-in">
              <ProductCard product={recProduct} />
            </div>
          );
        })}
      </div>
      
      {/* Smooth loading skeleton */}
      {(isLoadingMore || smoothLoading) && (
        <div className="mt-4">
          <ProductGridSkeleton count={4} />
        </div>
      )}
      
      {/* End message */}
      {!hasMoreProducts && displayedProducts.length > PRODUCTS_PER_LOAD && (
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">You've seen all related products!</p>
        </div>
      )}
    </div>
  );
};
