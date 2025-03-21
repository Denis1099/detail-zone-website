
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Review {
  id: number;
  author: string;
  rating: number;
  content: string;
  image?: string;
  product_id: number;
}

interface ReviewsSectionProps {
  productId?: number;
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) {
        // If no product ID, use default reviews
        setReviews([
          { id: 1, author: "דני כהן", rating: 5, content: "מוצר מעולה, ממליץ בחום!", product_id: 0 },
          { id: 2, author: "רונית לוי", rating: 4, content: "איכות טובה מאוד, משתלם.", product_id: 0 },
          { id: 3, author: "משה דוד", rating: 5, content: "התוצאות מדהימות, בדיוק מה שחיפשתי.", product_id: 0 },
        ]);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('product_reviews')
          .select('*')
          .eq('product_id', productId)
          .order('id', { ascending: false });
          
        if (error) {
          console.error('Error fetching reviews:', error);
          throw error;
        }
        
        if (data && data.length > 0) {
          setReviews(data);
        } else {
          // Fallback to default reviews if none exist for this product
          setReviews([
            { id: 1, author: "דני כהן", rating: 5, content: "מוצר מעולה, ממליץ בחום!", product_id: productId },
            { id: 2, author: "רונית לוי", rating: 4, content: "איכות טובה מאוד, משתלם.", product_id: productId },
          ]);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">ביקורות</h2>
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">ביקורות</h2>
      <div className="grid gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="font-bold">{review.author}</span>
              </div>
              <p className="text-muted-foreground">{review.content}</p>
              
              {review.image && (
                <div className="mt-4">
                  <img 
                    src={review.image} 
                    alt={`Review by ${review.author}`} 
                    className="max-h-40 rounded-md object-cover" 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
