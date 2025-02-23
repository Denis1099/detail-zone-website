
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Premium Car Wax",
    description: "High-quality car wax for ultimate shine and protection",
    price: 129.99,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Interior Cleaner Pro",
    description: "Professional-grade interior cleaning solution",
    price: 79.99,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Microfiber Towel Set",
    description: "Ultra-soft microfiber towels for gentle cleaning",
    price: 49.99,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Ceramic Coating Kit",
    description: "Long-lasting ceramic protection for your vehicle",
    price: 299.99,
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Wheel Cleaner",
    description: "Advanced wheel cleaning formula",
    price: 89.99,
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Paint Sealant",
    description: "Professional paint protection sealant",
    price: 159.99,
    image: "/placeholder.svg"
  }
];

export default function Shop() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">חנות המוצרים שלנו</h1>
        <p className="text-muted-foreground">מוצרי טיפול מקצועיים לרכב שלך</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
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
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">₪{product.price}</span>
              <Button className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                הוסף לסל
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
