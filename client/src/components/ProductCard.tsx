import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock_status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const getStockBadgeVariant = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'default';
      case 'Low Stock':
        return 'secondary';
      case 'Out of Stock':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-product-${product.id}`}>
      <div className="aspect-square overflow-hidden bg-muted">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            data-testid={`img-product-${product.id}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-base line-clamp-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <Badge
            variant={getStockBadgeVariant(product.stock_status)}
            className="text-xs shrink-0"
            data-testid={`badge-stock-${product.id}`}
          >
            {product.stock_status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2" data-testid={`text-category-${product.id}`}>
          {product.category}
        </p>
        <p className="text-lg font-semibold" data-testid={`text-price-${product.id}`}>
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" data-testid={`button-add-cart-${product.id}`}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
