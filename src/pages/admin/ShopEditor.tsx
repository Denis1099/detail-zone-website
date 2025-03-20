
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/products';
import { ProductForm } from '@/components/admin/shop/ProductForm';
import { ProductsList } from '@/components/admin/shop/ProductsList';
import { useProducts } from '@/hooks/useProducts';

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
  ) => {
    const success = await saveProduct(productData, isEditing);
    
    if (success) {
      handleResetForm();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ניהול חנות</h1>
        <p className="text-muted-foreground">הוספה ועריכה של מוצרים בחנות שלך</p>
      </div>
      
      {isEditing && (
        <Button 
          variant="outline" 
          onClick={handleResetForm}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          חזרה למוצר חדש
        </Button>
      )}
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductForm
          isEditing={isEditing}
          currentProduct={currentProduct}
          onSubmit={handleSubmit}
          onCancel={handleResetForm}
          isLoading={isLoading}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>רשימת מוצרים</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductsList
              products={productsList}
              isLoading={isInitialLoading}
              onEdit={handleEditProduct}
              onDelete={deleteProduct}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
