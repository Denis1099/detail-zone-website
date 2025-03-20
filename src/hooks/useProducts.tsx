
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/products';
import { useToast } from '@/components/ui/use-toast';

export function useProducts() {
  const [productsList, setProductsList] = useState<Product[]>([]);
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
      
      // Fallback to local data
      import('@/data/products').then(module => {
        setProductsList(module.products);
      });
    } finally {
      setIsInitialLoading(false);
    }
  };

  const saveProduct = async (
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
    setIsLoading(true);

    try {
      let imageUrl = productData.image;
      
      if (productData.imageFile) {
        const fileExt = productData.imageFile.name.split('.').pop();
        const fileName = `products/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('admin-uploads')
          .upload(fileName, productData.imageFile);
          
        if (uploadError) {
          throw new Error('שגיאה בהעלאת התמונה');
        }
        
        const { data } = supabase.storage
          .from('admin-uploads')
          .getPublicUrl(fileName);
          
        imageUrl = data.publicUrl;
      }
      
      const dataToSave = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        discount_percent: productData.discount_percent || 0,
        image: imageUrl,
        category: productData.category,
        featured: productData.featured,
        stock: productData.stock,
        recommended: productData.recommended,
        updated_at: new Date().toISOString()
      };
      
      if (isEditing && productData.id) {
        const { error } = await supabase
          .from('products')
          .update(dataToSave)
          .eq('id', productData.id);
          
        if (error) throw error;
        
        toast({
          title: 'המוצר עודכן',
          description: 'המוצר עודכן בהצלחה',
        });
        
        setProductsList(prevList => 
          prevList.map(product => 
            product.id === productData.id 
              ? { ...product, ...dataToSave, id: productData.id } 
              : product
          )
        );
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert(dataToSave)
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
      
      return true;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'שמירת המוצר נכשלה',
      });
      console.error('Error saving product:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
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
      
      return true;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה במחיקת המוצר',
        description: error.message || 'מחיקת המוצר נכשלה',
      });
      console.error('Error deleting product:', error);
      return false;
    }
  };

  return {
    productsList,
    isLoading,
    isInitialLoading,
    saveProduct,
    deleteProduct
  };
}
