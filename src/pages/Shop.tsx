
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/products";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          console.log('Fetched products:', data);
          setProducts(data);
        }
      } catch (error: any) {
        console.error('Error fetching products:', error);
        toast({
          variant: 'destructive',
          title: 'שגיאה בטעינת המוצרים',
          description: error.message || 'אירעה שגיאה בטעינת המוצרים מהמסד נתונים',
        });
        
        // Fallback to local data
        import('@/data/products').then(module => {
          setProducts(module.products);
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">חנות המוצרים שלנו</h1>
          <p className="text-muted-foreground">מוצרי טיפול מקצועיים לרכב שלך</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <div className="relative">
                  <Link to={`/shop/${product.id}`}>
                    <div className="aspect-square relative rounded-lg overflow-hidden m-4">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </Link>
                  {product.recommended && (
                    <Badge className="absolute top-6 right-6 bg-yellow-500 text-black px-3 py-1 text-sm font-bold">מומלץ</Badge>
                  )}
                  {product.discount_percent > 0 && (
                    <Badge className="absolute top-6 left-6 bg-primary text-white px-3 py-1 text-sm font-bold">
                      {product.discount_percent}% הנחה
                    </Badge>
                  )}
                </div>
                
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
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
