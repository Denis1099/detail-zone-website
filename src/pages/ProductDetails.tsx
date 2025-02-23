
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { products } from "@/data/products";

const reviews = [
  { id: 1, author: "דני כהן", rating: 5, content: "מוצר מעולה, ממליץ בחום!" },
  { id: 2, author: "רונית לוי", rating: 4, content: "איכות טובה מאוד, משתלם." },
  { id: 3, author: "משה דוד", rating: 5, content: "התוצאות מדהימות, בדיוק מה שחיפשתי." },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-xl font-bold">₪{product.price}</p>
            <p className="text-muted-foreground">{product.description}</p>
            
            <Button className="w-full md:w-auto flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              הוסף לסל
            </Button>
          </div>
        </div>

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
      </div>
    </>
  );
}
