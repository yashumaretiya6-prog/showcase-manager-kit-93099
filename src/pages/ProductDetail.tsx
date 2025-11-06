import { useState } from "react";
import { ArrowLeft, Heart, Share2, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { SizeSelector } from "@/components/SizeSelector";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TrustBadges } from "@/components/TrustBadges";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");

  // Sample product data
  const product = {
    id: "1",
    name: "Ethnic Embroidered Kurti",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    rating: 4.7,
    reviews: 189,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1583391733981-8b1b29bdd2ca?w=800",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    boughtToday: 37,
    stockLeft: 6,
    description: "Elegant embroidered kurti with traditional patterns. Perfect for festive occasions.",
    specifications: [
      { label: "Fabric", value: "Cotton Blend" },
      { label: "Pattern", value: "Embroidered" },
      { label: "Occasion", value: "Festive, Casual" },
      { label: "Care", value: "Machine Wash" },
    ],
  };

  const saleEndTime = new Date();
  saleEndTime.setHours(saleEndTime.getHours() + 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">TROZZE</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 bg-success px-2 py-1 rounded">
                  <span className="text-sm font-bold text-success-foreground">{product.rating}</span>
                  <Star className="h-3 w-3 fill-success-foreground text-success-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviews} ratings and reviews
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                <Badge className="bg-success text-success-foreground">{product.discount}% off</Badge>
              </div>
            </div>

            <CountdownTimer endTime={saleEndTime} />

            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-accent">🔥</span>
                <span className="text-foreground">{product.boughtToday} bought today</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-destructive">⚡</span>
                <span className="text-destructive font-medium">Only {product.stockLeft} left!</span>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-accent text-accent-foreground rounded-lg p-2">
                  <span className="text-2xl">🎁</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Buy 2 Get 1 FREE</h3>
                  <p className="text-sm text-muted-foreground">
                    Add 2 items to cart and get the lowest priced item free!
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    OFFER
                  </Button>
                </div>
              </div>
            </div>

            <TrustBadges />

            <SizeSelector sizes={product.sizes} onSizeChange={setSelectedSize} />

            <Separator />

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Specifications</h2>
              <div className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="text-foreground font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Product Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg p-4 z-50">
        <div className="container mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            disabled={!selectedSize}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={!selectedSize}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
