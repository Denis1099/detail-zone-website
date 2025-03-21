
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Plus, Trash2, Image } from "lucide-react";
import { ProductImageUpload } from './ProductImageUpload';

export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  content: string;
  image?: string;
  product_id: number;
}

interface ProductReviewsManagerProps {
  productId: number;
  existingReviews: ProductReview[];
  onSaveReview: (review: Omit<ProductReview, 'id'>) => Promise<boolean>;
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
  const [reviews, setReviews] = useState<ProductReview[]>(existingReviews);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    rating: 5,
    content: '',
    image: '',
    imageFile: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setFormData({ ...formData, imageFile: file });
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImagePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, imageFile: null, image: '' });
    setImagePreview(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author || !formData.content) {
      return;
    }
    
    const success = await onSaveReview({
      author: formData.author,
      rating: formData.rating,
      content: formData.content,
      image: formData.image,
      product_id: productId
    });
    
    if (success) {
      setShowForm(false);
      setFormData({
        author: '',
        rating: 5,
        content: '',
        image: '',
        imageFile: null
      });
      setImagePreview(null);
    }
  };

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
          <form onSubmit={handleAddReview} className="space-y-4 mb-6 p-4 border border-border rounded-lg">
            <div>
              <Label htmlFor="author">שם הלקוח</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="שם הלקוח"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="rating">דירוג</Label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`w-6 h-6 ${formData.rating >= star 
                        ? 'fill-primary text-primary' 
                        : 'text-muted-foreground'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="content">תוכן הביקורת</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="תוכן הביקורת"
                className="mt-1"
                rows={3}
                required
              />
            </div>
            
            <div>
              <Label>תמונה (אופציונלי)</Label>
              <ProductImageUpload 
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
                onImageRemove={handleImageRemove}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
                disabled={isLoading}
              >
                ביטול
              </Button>
              <Button 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'שומר...' : 'הוסף ביקורת'}
              </Button>
            </div>
          </form>
        )}

        {/* List of existing reviews */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              אין ביקורות למוצר זה
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-4 h-4 ${review.rating >= star 
                            ? 'fill-primary text-primary' 
                            : 'text-muted-foreground'}`} 
                        />
                      ))}
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
                <p className="text-muted-foreground mb-2">{review.content}</p>
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
