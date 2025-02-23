
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CreditCard, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

const reviews = [
  { id: 1, author: "דני כהן", rating: 5, content: "מוצר מעולה, ממליץ בחום!" },
  { id: 2, author: "רונית לוי", rating: 4, content: "איכות טובה מאוד, משתלם." },
  { id: 3, author: "משה דוד", rating: 5, content: "התוצאות מדהימות, בדיוק מה שחיפשתי." },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  
  const similarProducts = products
    .filter(p => p.id !== Number(id))
    .slice(0, 3); // Show up to 3 similar products

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24">
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
            
            <div className="flex gap-4">
              <Button className="flex-1 flex items-center gap-2">
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
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">מוצרים דומים</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map((similarProduct) => (
              <Card key={similarProduct.id}>
                <Link to={`/shop/${similarProduct.id}`}>
                  <CardHeader>
                    <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                      <img 
                        src={similarProduct.image} 
                        alt={similarProduct.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardTitle>{similarProduct.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold mb-2">₪{similarProduct.price}</p>
                    <p className="text-muted-foreground line-clamp-2">{similarProduct.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
