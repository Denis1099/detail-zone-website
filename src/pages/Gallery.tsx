
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ColorFilter } from "@/components/gallery/ColorFilter";
import { CarColor, BeforeAfterPairWithColor } from "@/data/gallery";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Gallery = () => {
  const [selectedColor, setSelectedColor] = useState<CarColor>("all");
  const [galleryItems, setGalleryItems] = useState<BeforeAfterPairWithColor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching gallery items:', error);
        toast({
          variant: 'destructive',
          title: 'שגיאה',
          description: 'לא ניתן לטעון את פריטי הגלריה',
        });
        // Fallback to local data
        import('@/data/gallery').then(({ beforeAfterPairs }) => {
          setGalleryItems(beforeAfterPairs);
          setIsLoading(false);
        });
      } else {
        console.log('Fetched gallery items from Supabase:', data);
        // Convert database string colors to CarColor type with explicit type casting
        const typedItems: BeforeAfterPairWithColor[] = data.map(item => ({
          id: item.id,
          before: item.before,
          after: item.after,
          label: item.label,
          color: item.color as CarColor
        }));
        
        setGalleryItems(typedItems);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Error in fetchGalleryItems:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: 'אירעה שגיאה בטעינת הגלריה',
      });
      // Fallback to local data
      import('@/data/gallery').then(({ beforeAfterPairs }) => {
        setGalleryItems(beforeAfterPairs);
        setIsLoading(false);
      });
    }
  };

  // Filter the items based on selected color
  const filteredItems = selectedColor === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.color === selectedColor);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <GalleryHero />
        <ColorFilter 
          selectedColor={selectedColor} 
          onColorChange={setSelectedColor} 
        />
        {isLoading ? (
          <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <GalleryGrid items={filteredItems} />
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Gallery;
