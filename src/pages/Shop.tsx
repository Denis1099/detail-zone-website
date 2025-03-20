
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/products";
import { useToast } from "@/components/ui/use-toast";
import { ProductList } from "@/components/products/ProductList";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          console.log('Fetched products:', data);
          setProducts(data);
        } else {
          console.log('No products found in Supabase, loading from local data...');
          // Fallback to local data
          import('@/data/products').then(module => {
            setProducts(module.products);
          });
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
          setProducts(module.products);
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">חנות המוצרים שלנו</h1>
          <p className="text-muted-foreground">מוצרי טיפול מקצועיים לרכב שלך</p>
        </div>
        
        <ProductList 
          products={products} 
          isLoading={isLoading} 
        />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
