
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/products";
import { useToast } from "@/components/ui/use-toast";
import { ProductList } from "@/components/products/ProductList";
import { ProductFilters, FilterOptions } from "@/components/products/ProductFilters";
import { ShopPagination } from "@/components/products/ShopPagination";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

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

        if (data) {
          console.log('Fetched products:', data);
          setProducts(data);
          setFilteredProducts(data);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(data.map(product => product.category).filter(Boolean))
          ) as string[];
          setCategories(uniqueCategories);
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
          setFilteredProducts(module.products);
          
          // Extract unique categories from local data
          const uniqueCategories = Array.from(
            new Set(module.products.map(product => product.category).filter(Boolean))
          ) as string[];
          setCategories(uniqueCategories);
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const handleFilter = (filterOptions: FilterOptions) => {
    setCurrentPage(1); // Reset to first page when filtering
    
    const filtered = products.filter(product => {
      // Apply search filter
      const matchesSearch = filterOptions.search 
        ? product.name.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
          product.description.toLowerCase().includes(filterOptions.search.toLowerCase())
        : true;
      
      // Apply category filter
      const matchesCategory = filterOptions.category && filterOptions.category !== "all"
        ? product.category === filterOptions.category
        : true;
      
      // Apply discount filter
      const matchesDiscount = filterOptions.onlyDiscount 
        ? (product.discount_percent || 0) > 0
        : true;
      
      // Apply recommended filter
      const matchesRecommended = filterOptions.onlyRecommended 
        ? product.recommended
        : true;
      
      return matchesSearch && matchesCategory && matchesDiscount && matchesRecommended;
    });
    
    setFilteredProducts(filtered);
  };

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">חנות המוצרים שלנו</h1>
          <p className="text-muted-foreground">מוצרי טיפול מקצועיים לרכב שלך</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProductFilters 
              onFilter={handleFilter} 
              categories={categories} 
            />
          </div>
          
          <div className="md:col-span-3">
            <ProductList 
              products={currentProducts} 
              isLoading={isLoading} 
            />
            
            <ShopPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
