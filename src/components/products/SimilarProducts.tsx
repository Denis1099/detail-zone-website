
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Product } from "@/types/products";

interface SimilarProductsProps {
  products: Product[];
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">מוצרים דומים</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <Link to={`/shop/${product.id}`}>
              <div className="relative">
                <CardHeader>
                  <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
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
                  <CardTitle className="mt-2">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.discount_percent > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        ₪{(product.price * (1 - product.discount_percent / 100)).toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₪{product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <p className="text-lg font-bold mb-2">₪{product.price.toFixed(2)}</p>
                  )}
                </CardContent>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
