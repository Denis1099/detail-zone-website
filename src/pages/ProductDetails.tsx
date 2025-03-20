import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CreditCard, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Link as RouterLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/products";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const reviews = [
  { id: 1, author: "דני כהן", rating: 5, content: "מוצר מעולה, ממליץ בחום!" },
  { id: 2, author: "רונית לוי", rating: 4, content: "איכות טובה מאוד, משתלם." },
  { id: 3, author: "משה דוד", rating: 5, content: "התוצאות מדהימות, בדיוק מה שחיפשתי." },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        
        const numericId = parseInt(id, 10);

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', numericId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setProduct(data);
          fetchSimilarProducts(data.category);
        }
      } catch (error: any) {
        console.error('Error fetching product:', error);
        toast({
          variant: 'destructive',
          title: 'שגיאה בטעינת המוצר',
          description: error.message || 'אירעה שגיאה בטעינת פרטי המוצר',
        });
        
        import('@/data/products').then(module => {
          const localProduct = module.products.find(p => p.id === Number(id));
          if (localProduct) {
            setProduct(localProduct);
            const similar = module.products
              .filter(p => p.id !== Number(id))
              .slice(0, 3);
            setSimilarProducts(similar);
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSimilarProducts = async (category?: string) => {
      try {
        const numericId = parseInt(id!, 10);
        
        let query = supabase
          .from('products')
          .select('*')
          .neq('id', numericId)
          .limit(3);
          
        if (category) {
          query = query.eq('category', category);
        }
        
        const { data, error } = await query;

        if (error) {
          throw error;
        }

        if (data) {
          setSimilarProducts(data);
        }
      } catch (error) {
        console.error('Error fetching similar products:', error);
      }
    };

    fetchProduct();
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-12 pt-24 flex-1 flex justify-center items-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-12 pt-24 flex-1 flex justify-center items-center flex-col">
          <h2 className="text-2xl font-bold mb-4">המוצר לא נמצא</h2>
          <Button asChild>
            <RouterLink to="/shop">חזרה לחנות</RouterLink>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const discountedPrice = product.discount_percent 
    ? product.price * (1 - (product.discount_percent / 100)) 
    : product.price;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">ביקורות</h2>
          <div className="grid gap-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="font-bold">{review.author}</span>
                  </div>
                  <p className="text-muted-foreground">{review.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">מוצרים דומים</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProducts.map((similarProduct) => (
                <Card key={similarProduct.id}>
                  <Link to={`/shop/${similarProduct.id}`}>
                    <div className="relative">
                      <CardHeader>
                        <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                          <img 
                            src={similarProduct.image} 
                            alt={similarProduct.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        {similarProduct.recommended && (
                          <Badge className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 text-sm font-bold">מומלץ</Badge>
                        )}
                        {similarProduct.discount_percent > 0 && (
                          <Badge className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-sm font-bold">
                            {similarProduct.discount_percent}% הנחה
                          </Badge>
                        )}
                        <CardTitle className="mt-2">{similarProduct.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {similarProduct.discount_percent > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">
                              ₪{(similarProduct.price * (1 - similarProduct.discount_percent / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₪{similarProduct.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <p className="text-lg font-bold mb-2">₪{similarProduct.price.toFixed(2)}</p>
                        )}
                      </CardContent>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
