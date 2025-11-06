import { Button } from "@/components/ui/button";

export const Buy2Get1FreeOffer = () => {
  return (
    <div className="container mx-auto px-4 py-1.5">
      <div className="bg-accent/10 border border-accent rounded-lg p-2">
        <div className="flex items-start gap-1.5">
          <div className="bg-accent text-accent-foreground rounded p-1">
            <span className="text-base">🎁</span>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground mb-0.5">Buy 2 Get 1 FREE</h3>
            <p className="text-[10px] text-muted-foreground">
              Add 2 items to cart and get the lowest priced item free!
            </p>
            <Button variant="outline" size="sm" className="mt-1 h-6 text-[10px] px-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              OFFER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
