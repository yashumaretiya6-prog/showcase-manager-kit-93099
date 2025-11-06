import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

interface ProductImageGalleryProps {
  productName: string;
  mainImage: string;
  additionalImages?: string[];
  product?: Product;
  rating?: number;
  reviewCount?: number;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  productName,
  mainImage,
  additionalImages = [],
  product,
  rating,
  reviewCount
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
  const images = additionalImages.length > 0 
    ? [mainImage, ...additionalImages.filter(Boolean)] 
    : [mainImage];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product);
      toast({
        title: isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
        description: isInWishlist(product.id) 
          ? `${product.name} removed from your wishlist` 
          : `${product.name} added to your wishlist`
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out this product: ${productName}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Product link copied to clipboard"
        });
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive"
        });
      }
    }
  };

  const isWishlisted = product ? isInWishlist(product.id) : false;

  return (
    <div className="bg-muted/30 p-2 sm:p-4">
      <div className="relative aspect-square bg-background rounded-lg overflow-hidden mb-2 sm:mb-4">
        <img
          src={images[selectedImageIndex]}
          alt={productName}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image';
          }}
        />

        {/* Overlay Action Buttons */}
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex flex-col gap-1.5 sm:gap-2">
          {/* Rating Badge */}
          {rating && (
            <div className="flex items-center gap-1 bg-background/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg text-xs">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="font-semibold">{rating}</span>
              {reviewCount && (
                <span className="text-muted-foreground">| {reviewCount}+</span>
              )}
            </div>
          )}
          
          {/* Wishlist Button */}
          {product && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlistToggle}
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-background/95 backdrop-blur-sm hover:bg-background shadow-lg"
            >
              <Heart 
                className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
          )}
          
          {/* Share Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-background/95 backdrop-blur-sm hover:bg-background shadow-lg"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            {/* Image indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedImageIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-1 sm:gap-2 justify-center overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
                index === selectedImageIndex ? 'border-primary' : 'border-border'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=No+Image';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
