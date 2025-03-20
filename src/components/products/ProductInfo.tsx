
import { Button } from "@/components/ui/button";
import { Product } from "@/types/products";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();
  
  const discountedPrice = product.discount_percent 
    ? product.price * (1 - (product.discount_percent / 100)) 
    : product.price;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      
      <div>
        {product.discount_percent > 0 ? (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">₪{discountedPrice.toFixed(2)}</span>
            <span className="text-lg text-muted-foreground line-through">₪{product.price.toFixed(2)}</span>
          </div>
        ) : (
          <p className="text-xl font-bold">₪{product.price.toFixed(2)}</p>
        )}
      </div>
      
      <p className="text-muted-foreground">{product.description}</p>
      
      <div className="flex gap-4">
        <Button 
          className="flex-1 flex items-center gap-2"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="w-4 h-4" />
          הוסף לסל
        </Button>
        <Button className="flex-1 flex items-center gap-2" variant="secondary">
          <CreditCard className="w-4 h-4" />
          קנה עכשיו
        </Button>
      </div>
    </div>
  );
}
