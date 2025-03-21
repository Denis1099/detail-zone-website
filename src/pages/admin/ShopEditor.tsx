
import React, { useState, useEffect } from 'react';
import { ShopHeader } from '@/components/admin/shop/ShopHeader';
import { ProductSection } from '@/components/admin/shop/ProductSection';
import { ProductsListSection } from '@/components/admin/shop/ProductsListSection';
import { Product } from '@/types/products';
import { useProducts } from '@/hooks/useProducts';
import { useProductReviews } from '@/hooks/useProductReviews';

export default function ShopEditor() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  const {
    productsList,
    isLoading,
    isInitialLoading,
    saveProduct,
    deleteProduct
  } = useProducts();
  
  const {
    reviews,
    isLoading: reviewsLoading,
    isInitialLoading: reviewsInitialLoading,
    fetchReviews,
    saveReview,
    deleteReview
  } = useProductReviews(currentProduct?.id || 0);

  useEffect(() => {
    if (currentProduct?.id) {
      fetchReviews();
    }
  }, [currentProduct?.id]);

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleResetForm = () => {
    setCurrentProduct(null);
    setIsEditing(false);
  };

  const handleSubmit = async (
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
  ): Promise<boolean> => {
    const success = await saveProduct(productData, isEditing);
    
    if (success) {
      // Don't reset the form after successful edit to allow adding reviews
      if (!isEditing) {
        handleResetForm();
      }
    }
    
    return success;
  };

  return (
    <div className="space-y-6">
      <ShopHeader 
        title="ניהול חנות" 
        description="הוספה ועריכה של מוצרים בחנות שלך"
      />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductSection 
          isEditing={isEditing}
          currentProduct={currentProduct}
          reviews={reviews}
          reviewsLoading={reviewsLoading}
          onSaveProduct={handleSubmit}
          onResetForm={handleResetForm}
          onSaveReview={saveReview}
          onDeleteReview={deleteReview}
          isLoading={isLoading}
        />
        
        <ProductsListSection 
          products={productsList}
          isLoading={isInitialLoading}
          onEdit={handleEditProduct}
          onDelete={deleteProduct}
        />
      </div>
    </div>
  );
}
