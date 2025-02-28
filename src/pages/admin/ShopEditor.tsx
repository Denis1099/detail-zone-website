
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Save, Trash2, Edit, Upload } from 'lucide-react';
import { products } from '@/data/products';
import { supabase } from '@/lib/supabase';

interface ProductFormData {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  imageFile: File | null;
}

export default function ShopEditor() {
  const [productsList, setProductsList] = useState(products);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    image: '',
    imageFile: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setCurrentProduct({
      name: '',
      description: '',
      price: 0,
      image: '',
      imageFile: null
    });
    setImagePreview(null);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentProduct({
        ...currentProduct,
        imageFile: file
      });
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImagePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProduct = (product: any) => {
    setCurrentProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      imageFile: null
    });
    setImagePreview(product.image);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = currentProduct.image;
      
      // Upload new image if selected
      if (currentProduct.imageFile) {
        const fileExt = currentProduct.imageFile.name.split('.').pop();
        const fileName = `products/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('admin-uploads')
          .upload(fileName, currentProduct.imageFile);
          
        if (uploadError) {
          throw new Error('שגיאה בהעלאת התמונה');
        }
        
        const { data } = supabase.storage
          .from('admin-uploads')
          .getPublicUrl(fileName);
          
        imageUrl = data.publicUrl;
      }
      
      const updatedProduct = {
        id: currentProduct.id || productsList.length + 1,
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        image: imageUrl
      };
      
      if (isEditing) {
        // Update existing product
        const updatedProducts = productsList.map(product => 
          product.id === updatedProduct.id ? updatedProduct : product
        );
        setProductsList(updatedProducts);
        toast({
          title: 'המוצר עודכן',
          description: 'המוצר עודכן בהצלחה',
        });
      } else {
        // Add new product
        setProductsList([...productsList, updatedProduct]);
        toast({
          title: 'מוצר נוסף',
          description: 'המוצר נוסף בהצלחה',
        });
      }
      
      resetForm();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'שמירת המוצר נכשלה',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setProductsList(productsList.filter(product => product.id !== id));
    toast({
      title: 'המוצר נמחק',
      description: 'המוצר נמחק בהצלחה',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ניהול חנות</h1>
        <p className="text-muted-foreground">הוספה ועריכה של מוצרים בחנות שלך</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'עריכת מוצר' : 'הוספת מוצר חדש'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  שם המוצר
                </label>
                <Input
                  id="name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  placeholder="שם המוצר"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium">
                  מחיר (₪)
                </label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
                  placeholder="0.00"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium">
                  תיאור
                </label>
                <Textarea
                  id="description"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  placeholder="תיאור המוצר"
                  className="mt-1"
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium">
                  תמונת המוצר
                </label>
                <div className="mt-1 flex items-center">
                  <label className="flex cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-accent">
                    <Upload className="ml-2 h-4 w-4" />
                    <span>{currentProduct.imageFile || currentProduct.image ? 'שנה תמונה' : 'העלה תמונה'}</span>
                    <Input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border border-input">
                      <img
                        src={imagePreview}
                        alt="תצוגה מקדימה"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  ביטול
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent ml-2" />
                      שומר...
                    </>
                  ) : (
                    <>
                      <Save className="ml-2 h-4 w-4" />
                      {isEditing ? 'עדכן מוצר' : 'הוסף מוצר'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>רשימת מוצרים</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productsList.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  אין מוצרים עדיין
                </div>
              ) : (
                productsList.map((product) => (
                  <div key={product.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 overflow-hidden rounded-md">
                        <img
                          src={product.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop'}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="mr-4">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">₪{product.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProduct(product)}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
