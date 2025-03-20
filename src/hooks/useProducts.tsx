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
      console.log('Fetching products from Supabase...');
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        console.log('Fetched products from Supabase:', data);
        setProductsList(data);
      } else {
        console.log('No products found in Supabase, loading from local data...');
        await loadLocalProducts();
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה בטעינת המוצרים',
        description: error.message || 'אירעה שגיאה בטעינת המוצרים מהמסד נתונים',
      });
      
      await loadLocalProducts();
    } finally {
      setIsInitialLoading(false);
    }
  };

  const loadLocalProducts = async () => {
    try {
      const { products } = await import('@/data/products');
      console.log('Loading products from local data:', products);
      
      if (products && products.length > 0) {
        setProductsList(products);
      } else {
        console.warn('No local products found either');
      }
    } catch (localError) {
      console.error('Could not load local product data:', localError);
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
