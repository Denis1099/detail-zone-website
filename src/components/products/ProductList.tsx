
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/products";
import { ProductImage } from "./ProductImage";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

export function ProductList({ products, isLoading }: ProductListProps) {
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">לא נמצאו מוצרים</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <ProductImage product={product} />
          
          <CardHeader>
            <CardTitle>
              <div className="select-text">{product.name}</div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <div className="text-muted-foreground select-text">{product.description}</div>
          </CardContent>
          
          <CardFooter className="flex justify-between items-center">
            <div>
              {product.discount_percent > 0 ? (
                <div className="flex flex-col">
                  <span className="text-muted-foreground line-through text-sm">₪{product.price}</span>
                  <span className="text-lg font-bold text-primary">
                    ₪{(product.price * (1 - (product.discount_percent / 100))).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold">₪{product.price}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex items-center gap-2"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="w-4 h-4" />
                הוסף לסל
              </Button>
              <Link to={`/shop/${product.id}`}>
                <Button variant="outline">פרטים</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
