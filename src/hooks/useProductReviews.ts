
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { uploadGalleryImage } from '@/utils/galleryUpload';
import { ProductReview } from '@/components/admin/shop/ProductReviewsManager';

export function useProductReviews(productId: number) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { toast } = useToast();

  const fetchReviews = async () => {
    if (!productId) return;
    
    setIsInitialLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('id', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        setReviews(data);
      }
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה בטעינת הביקורות',
        description: error.message || 'לא ניתן היה לטעון את ביקורות המוצר',
      });
    } finally {
      setIsInitialLoading(false);
    }
  };

  const saveReview = async (reviewData: Omit<ProductReview, 'id'>) => {
    setIsLoading(true);
    
    try {
      let imageUrl = '';
      
      if (reviewData.image) {
        imageUrl = reviewData.image;
      }
      
      if ('imageFile' in reviewData && reviewData.imageFile) {
        const result = await uploadGalleryImage(
          reviewData.imageFile, 
          'reviews', 
          `product-${productId}-review`
        );
        
        if (result.error) throw result.error;
        imageUrl = result.url;
      }
      
      const dataToSave = {
        product_id: productId,
        author: reviewData.author,
        rating: reviewData.rating,
        content: reviewData.content,
        image: imageUrl,
      };
      
      const { data, error } = await supabase
        .from('product_reviews')
        .insert(dataToSave)
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        toast({
          title: 'הביקורת נוספה',
          description: 'הביקורת נוספה בהצלחה',
        });
        
        setReviews(prevReviews => [data[0], ...prevReviews]);
      }
      
      return true;
    } catch (error: any) {
      console.error('Error saving review:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה בשמירת הביקורת',
        description: error.message || 'לא ניתן היה לשמור את הביקורת',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReview = async (reviewId: number) => {
    try {
      const { error } = await supabase
        .from('product_reviews')
        .delete()
        .eq('id', reviewId);
        
      if (error) throw error;
      
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      
      toast({
        title: 'הביקורת נמחקה',
        description: 'הביקורת נמחקה בהצלחה',
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting review:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה במחיקת הביקורת',
        description: error.message || 'לא ניתן היה למחוק את הביקורת',
      });
      return false;
    }
  };

  return {
    reviews,
    isLoading,
    isInitialLoading,
    fetchReviews,
    saveReview,
    deleteReview
  };
}
