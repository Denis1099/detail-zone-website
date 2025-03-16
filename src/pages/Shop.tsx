import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { products } from "@/data/products";
import { toast } from "sonner";

export default function Shop() {
  const addToCart = (product: any) => {
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add new item
    cart.push(product);
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch event to notify navbar
    window.dispatchEvent(new Event('cartUpdate'));
    
    // Show toast
    toast.success('המוצר נוסף לסל');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">חנות המוצרים שלנו</h1>
          <p className="text-muted-foreground">מוצרי טיפול מקצועיים לרכב שלך</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <Link to={`/shop/${product.id}`}>
                <CardHeader>
                  <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
              </Link>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">₪{product.price}</span>
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  הוסף לסל
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}