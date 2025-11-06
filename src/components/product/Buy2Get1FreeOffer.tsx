import { Button } from "@/components/ui/button";

export const Buy2Get1FreeOffer = () => {
  return (
    <div className="container mx-auto px-4 py-4">
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
    </div>
  );
};
