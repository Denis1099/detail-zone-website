
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/products";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductImage } from "@/components/products/ProductImage";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ReviewsSection } from "@/components/products/ReviewsSection";
import { SimilarProducts } from "@/components/products/SimilarProducts";
import { LoadingState, NotFoundState } from "@/components/products/ProductDetailsState";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        
        const numericId = parseInt(id, 10);

        // Use maybeSingle instead of single to avoid errors when no rows are returned
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', numericId)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setProduct(data);
          fetchSimilarProducts(data.category);
        } else {
          // No product found, try local fallback
          import('@/data/products').then(module => {
            const localProduct = module.products.find(p => p.id === Number(id));
            if (localProduct) {
              setProduct(localProduct);
              const similar = module.products
                .filter(p => p.id !== Number(id))
                .slice(0, 3);
              setSimilarProducts(similar);
            }
          });
        }
      } catch (error: any) {
        console.error('Error fetching product:', error);
        toast({
          variant: 'destructive',
          title: 'שגיאה בטעינת המוצר',
          description: error.message || 'אירעה שגיאה בטעינת פרטי המוצר',
        });
        
        import('@/data/products').then(module => {
          const localProduct = module.products.find(p => p.id === Number(id));
          if (localProduct) {
            setProduct(localProduct);
            const similar = module.products
              .filter(p => p.id !== Number(id))
              .slice(0, 3);
            setSimilarProducts(similar);
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSimilarProducts = async (category?: string) => {
      try {
        const numericId = parseInt(id!, 10);
        
        let query = supabase
          .from('products')
          .select('*')
          .neq('id', numericId)
          .limit(3);
          
        if (category) {
          query = query.eq('category', category);
        }
        
        const { data, error } = await query;

        if (error) {
          throw error;
        }

        if (data) {
          setSimilarProducts(data);
        }
      } catch (error) {
        console.error('Error fetching similar products:', error);
      }
    };

    fetchProduct();
  }, [id, toast]);

  if (isLoading) {
    return <LoadingState isLoading={true} />;
  }

  if (!product) {
    return <NotFoundState isNotFound={true} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImage product={product} />
          <ProductInfo product={product} />
        </div>

        <ReviewsSection productId={product.id} />
        <SimilarProducts products={similarProducts} />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
