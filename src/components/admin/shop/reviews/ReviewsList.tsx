
import React from 'react';
import { ProductReview } from '@/hooks/useProductReviews';
import { ReviewItem } from './ReviewItem';

interface ReviewsListProps {
  reviews: ProductReview[];
  onDeleteReview: (reviewId: number) => Promise<boolean>;
  isLoading: boolean;
}

export function ReviewsList({ reviews, onDeleteReview, isLoading }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        אין ביקורות למוצר זה
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem 
          key={review.id} 
          review={review} 
          onDeleteReview={onDeleteReview}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
