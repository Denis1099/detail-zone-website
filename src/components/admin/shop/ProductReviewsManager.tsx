
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductReview, ReviewFormData } from '@/hooks/useProductReviews';
import { ReviewForm } from './reviews/ReviewForm';
import { ReviewsList } from './reviews/ReviewsList';

interface ProductReviewsManagerProps {
  productId: number;
  existingReviews: ProductReview[];
  onSaveReview: (review: ReviewFormData) => Promise<boolean>;
  onDeleteReview: (reviewId: number) => Promise<boolean>;
  isLoading: boolean;
}

export function ProductReviewsManager({ 
  productId, 
  existingReviews = [],
  onSaveReview,
  onDeleteReview,
  isLoading
}: ProductReviewsManagerProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>ביקורות מוצר</CardTitle>
        {!showForm && (
          <Button 
            size="sm" 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            הוסף ביקורת
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {showForm && (
          <ReviewForm
            productId={productId}
            onSaveReview={onSaveReview}
            onCancel={() => setShowForm(false)}
            isLoading={isLoading}
          />
        )}

        {/* List of existing reviews */}
        <ReviewsList
          reviews={existingReviews}
          onDeleteReview={onDeleteReview}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
