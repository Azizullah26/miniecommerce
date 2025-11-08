import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4" data-testid="empty-state">
      <div className="rounded-full bg-muted p-6 mb-4">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No Products Found</h3>
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-md">
        {message || "No products yet. Add your first product to get started."}
      </p>
      {action && (
        <Button onClick={action.onClick} data-testid="button-empty-action">
          {action.label}
        </Button>
      )}
    </div>
  );
}
