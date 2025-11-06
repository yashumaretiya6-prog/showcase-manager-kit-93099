import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  productName: string;
  mainImage: string;
  additionalImages?: string[];
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  productName,
  mainImage,
  additionalImages = []
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const images = additionalImages.length > 0 
    ? [mainImage, ...additionalImages.filter(Boolean)] 
    : [mainImage];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
