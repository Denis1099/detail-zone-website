
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

// This could come from an API in the future
const reviews = [
  { id: 1, author: "דני כהן", rating: 5, content: "מוצר מעולה, ממליץ בחום!" },
  { id: 2, author: "רונית לוי", rating: 4, content: "איכות טובה מאוד, משתלם." },
  { id: 3, author: "משה דוד", rating: 5, content: "התוצאות מדהימות, בדיוק מה שחיפשתי." },
];

export function ReviewsSection() {
  return (
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
  );
}
