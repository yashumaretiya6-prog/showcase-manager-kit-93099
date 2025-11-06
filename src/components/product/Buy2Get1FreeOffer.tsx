import { Button } from "@/components/ui/button";

export const Buy2Get1FreeOffer = () => {
  return (
    <div className="container mx-auto px-4 py-2">
      <div className="bg-accent/10 border border-accent rounded-lg p-3">
        <div className="flex items-start gap-2">
          <div className="bg-accent text-accent-foreground rounded-lg p-1.5">
            <span className="text-xl">🎁</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-0.5">Buy 2 Get 1 FREE</h3>
            <p className="text-xs text-muted-foreground">
              Add 2 items to cart and get the lowest priced item free!
            </p>
            <Button variant="outline" size="sm" className="mt-1.5 h-7 text-xs border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              OFFER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
