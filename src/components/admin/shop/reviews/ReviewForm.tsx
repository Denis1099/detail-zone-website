
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { ProductImageUpload } from '../ProductImageUpload';
import { ReviewFormData } from '@/hooks/useProductReviews';

interface ReviewFormProps {
  productId: number;
  onSaveReview: (review: ReviewFormData) => Promise<boolean>;
  onCancel: () => void;
  isLoading: boolean;
}

export function ReviewForm({ productId, onSaveReview, onCancel, isLoading }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    author: '',
    rating: 5,
    content: '',
    image: '',
    profile_image: '',
    product_id: productId,
    imageFile: null,
    profileImageFile: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

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

  const handleProfileImageChange = (file: File | null) => {
    if (file) {
      setFormData({ ...formData, profileImageFile: file });
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setProfileImagePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, imageFile: null, image: '' });
    setImagePreview(null);
  };

  const handleProfileImageRemove = () => {
    setFormData({ ...formData, profileImageFile: null, profile_image: '' });
    setProfileImagePreview(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author || !formData.content) {
      return;
    }
    
    const success = await onSaveReview(formData);
    
    if (success) {
      setFormData({
        author: '',
        rating: 5,
        content: '',
        image: '',
        profile_image: '',
        product_id: productId,
        imageFile: null,
        profileImageFile: null
      });
      setImagePreview(null);
      setProfileImagePreview(null);
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border border-border rounded-lg">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>תמונת מוצר (אופציונלי)</Label>
          <ProductImageUpload 
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onImageRemove={handleImageRemove}
          />
        </div>
        
        <div>
          <Label>תמונת פרופיל (אופציונלי)</Label>
          <ProductImageUpload 
            imagePreview={profileImagePreview}
            onImageChange={handleProfileImageChange}
            onImageRemove={handleProfileImageRemove}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
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
  );
}
