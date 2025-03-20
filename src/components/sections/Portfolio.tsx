
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PortfolioHeader } from "@/components/gallery/PortfolioHeader";
import { PortfolioGrid } from "@/components/gallery/PortfolioGrid";
import { useState, useEffect } from "react";
import { BeforeAfterPair } from "@/data/portfolio";
import { supabase } from "@/lib/supabase";

export const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<BeforeAfterPair[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        // Get first 6 items from Supabase for the homepage
        const { data, error } = await supabase
          .from('gallery_items')
          .select('before, after, label')
          .order('id', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error fetching portfolio items:', error);
          // Fallback to local data
          import('@/data/portfolio').then(({ beforeAfterPairs }) => {
            setPortfolioItems(beforeAfterPairs);
            setIsLoading(false);
          });
        } else {
          console.log('Fetched portfolio items from Supabase:', data);
          setPortfolioItems(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error in fetchPortfolioItems:', error);
        // Fallback to local data
        import('@/data/portfolio').then(({ beforeAfterPairs }) => {
          setPortfolioItems(beforeAfterPairs);
          setIsLoading(false);
        });
      }
    };

    fetchPortfolioItems();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-card to-background" id="portfolio">
      <div className="container mx-auto px-4">
        <PortfolioHeader />
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <PortfolioGrid items={portfolioItems} />
        )}

        {/* "See More" Button */}
        <div className="flex justify-center mt-10">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 font-medium py-6 px-8 text-lg shadow-lg shadow-primary/20"
            asChild
          >
            <Link to="/gallery">
              ראה עוד
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
