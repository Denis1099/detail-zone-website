import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Save, Trash2, Edit, Upload, Percent } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/products';

interface ProductFormData {
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
}

export default function ShopEditor() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    discount_percent: 0,
    image: '',
    imageFile: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        console.log('Fetched products:', data);
        setProductsList(data);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה בטעינת המוצרים',
        description: error.message || 'אירעה שגיאה בטעינת המוצרים מהמסד נתונים',
      });
    } finally {
      setIsInitialLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      name: '',
      description: '',
      price: 0,
      discount_percent: 0,
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

  const handleEditProduct = (product: Product) => {
    setCurrentProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount_percent: product.discount_percent || 0,
      image: product.image,
      imageFile: null,
      category: product.category,
      featured: product.featured,
      stock: product.stock,
      recommended: product.recommended
    });
    setImagePreview(product.image);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = currentProduct.image;
      
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
      
      const productData = {
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        discount_percent: currentProduct.discount_percent || 0,
        image: imageUrl,
        category: currentProduct.category,
        featured: currentProduct.featured,
        stock: currentProduct.stock,
        recommended: currentProduct.recommended,
        updated_at: new Date().toISOString()
      };
      
      if (isEditing && currentProduct.id) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', currentProduct.id);
          
        if (error) throw error;
        
        toast({
          title: 'המוצר עודכן',
          description: 'המוצר עודכן בהצלחה',
        });
        
        setProductsList(prevList => 
          prevList.map(product => 
            product.id === currentProduct.id 
              ? { ...product, ...productData, id: currentProduct.id } 
              : product
          )
        );
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert(productData)
          .select();
          
        if (error) throw error;
        
        if (data && data[0]) {
          toast({
            title: 'מוצר נוסף',
            description: 'המוצר נוסף בהצלחה',
          });
          
          setProductsList(prevList => [data[0], ...prevList]);
        }
      }
      
      resetForm();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'שמירת המוצר נכשלה',
      });
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setProductsList(prevList => prevList.filter(product => product.id !== id));
      
      toast({
        title: 'המוצר נמחק',
        description: 'המוצר נמחק בהצלחה',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה במחיקת המוצר',
        description: error.message || 'מחיקת המוצר נכשלה',
      });
      console.error('Error deleting product:', error);
    }
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
                <Label htmlFor="name">שם המוצר</Label>
                <Input
                  id="name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  placeholder="שם המוצר"
                  className="mt-1"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">מחיר (₪)</Label>
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
                  <Label htmlFor="discount">הנחה (%)</Label>
                  <div className="relative mt-1">
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={currentProduct.discount_percent}
                      onChange={(e) => setCurrentProduct({...currentProduct, discount_percent: parseInt(e.target.value) || 0})}
                      placeholder="0"
                      className="pr-8"
                    />
                    <Percent className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="category">קטגוריה</Label>
                <Input
                  id="category"
                  value={currentProduct.category || ''}
                  onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                  placeholder="קטגוריה (אופציונלי)"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">תיאור</Label>
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

              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  id="recommended"
                  checked={currentProduct.recommended || false}
                  onChange={(e) => setCurrentProduct({...currentProduct, recommended: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="recommended">מוצר מומלץ</Label>
              </div>
              
              <div>
                <Label htmlFor="image">תמונת המוצר</Label>
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
            {isInitialLoading ? (
              <div className="flex justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              </div>
            ) : (
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
                            src={product.image || 'https://placehold.co/100x100?text=No+Image'}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="mr-4">
                          <div className="font-medium">{product.name}</div>
                          <div className="flex items-center text-xs">
                            <span className={product.discount_percent ? "text-muted-foreground line-through mr-2" : "text-muted-foreground"}>
                              ₪{product.price.toFixed(2)}
                            </span>
                            {product.discount_percent > 0 && (
                              <>
                                <span className="text-green-500 mr-1">
                                  ₪{(product.price * (1 - product.discount_percent / 100)).toFixed(2)}
                                </span>
                                <span className="text-primary bg-primary/10 rounded-full px-2 py-0.5 mr-1">
                                  {product.discount_percent}% הנחה
                                </span>
                              </>
                            )}
                          </div>
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
