
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/products";

interface ProductImageProps {
  product: Product;
}

export function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="relative">
      <div className="aspect-square relative rounded-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      {product.recommended && (
        <Badge className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 text-sm font-bold">מומלץ</Badge>
      )}
      {product.discount_percent > 0 && (
        <Badge className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-sm font-bold">
          {product.discount_percent}% הנחה
        </Badge>
      )}
    </div>
  );
}
