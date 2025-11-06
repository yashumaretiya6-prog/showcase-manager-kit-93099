import { Product } from "@/types/product";
import { Separator } from "@/components/ui/separator";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const specifications = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "Rating", value: `${product.rating}/5` },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Specifications</h2>
        <div className="space-y-2">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
              <span className="text-muted-foreground">{spec.label}</span>
              <span className="text-foreground font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Product Description</h2>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
};
