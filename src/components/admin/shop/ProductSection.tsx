
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Product } from '@/types/products';
import { ProductForm } from '@/components/admin/shop/ProductForm';
import { ProductReviewsManager } from '@/components/admin/shop/ProductReviewsManager';
import { ProductReview } from '@/hooks/useProductReviews';

interface ProductSectionProps {
  isEditing: boolean;
  currentProduct: Product | null;
  reviews: ProductReview[];
  reviewsLoading: boolean;
  onSaveProduct: (
    productData: {
      id?: number;
      name: string;
      description: string;
      price: number;
      discount_percent: number;
      image: string;
      imageFile: File | null;
      category?: string;
      featured?: boolean;
      stock?: number;
      recommended?: boolean;
    },
    isEditing: boolean
  ) => Promise<boolean>;
  onResetForm: () => void;
  onSaveReview: (review: any) => Promise<boolean>;
  onDeleteReview: (reviewId: number) => Promise<boolean>;
  isLoading: boolean;
}

export function ProductSection({
  isEditing,
  currentProduct,
  reviews,
  reviewsLoading,
  onSaveProduct,
  onResetForm,
  onSaveReview,
  onDeleteReview,
  isLoading
}: ProductSectionProps) {
  return (
    <div className="space-y-6">
      {isEditing && (
        <Button 
          variant="outline" 
          onClick={onResetForm}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          חזרה למוצר חדש
        </Button>
      )}
      
      <ProductForm
        isEditing={isEditing}
        currentProduct={currentProduct}
        onSubmit={onSaveProduct}
        onCancel={onResetForm}
        isLoading={isLoading}
      />
      
      {/* Show product reviews manager when editing a product */}
      {isEditing && currentProduct && (
        <ProductReviewsManager
          productId={currentProduct.id}
          existingReviews={reviews}
          onSaveReview={onSaveReview}
          onDeleteReview={onDeleteReview}
          isLoading={reviewsLoading}
        />
      )}
    </div>
  );
}
