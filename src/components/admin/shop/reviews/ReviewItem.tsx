
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, User } from "lucide-react";
import { ProductReview } from '@/hooks/useProductReviews';
import { StarRating } from './StarRating';

interface ReviewItemProps {
  review: ProductReview;
  onDeleteReview: (reviewId: number) => Promise<boolean>;
  isLoading: boolean;
}

export function ReviewItem({ review, onDeleteReview, isLoading }: ReviewItemProps) {
  return (
    <div className="p-4 border border-border rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          {review.profile_image ? (
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={review.profile_image}
                alt={`תמונת פרופיל של ${review.author}`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
          <div>
            <div className="font-medium">{review.author}</div>
            <StarRating rating={review.rating} />
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onDeleteReview(review.id)}
          disabled={isLoading}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
      <p className="text-muted-foreground mt-2 mb-2">{review.content}</p>
      {review.image && (
        <div className="mt-2">
          <img 
            src={review.image} 
            alt={`Review by ${review.author}`} 
            className="max-h-24 rounded-md object-cover"
          />
        </div>
      )}
    </div>
  );
}
