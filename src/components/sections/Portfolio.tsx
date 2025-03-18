
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PortfolioHeader } from "@/components/gallery/PortfolioHeader";
import { PortfolioGrid } from "@/components/gallery/PortfolioGrid";
import { beforeAfterPairs } from "@/data/portfolio";

export const Portfolio = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-card to-background" id="portfolio">
      <div className="container mx-auto px-4">
        <PortfolioHeader />
        
        <PortfolioGrid items={beforeAfterPairs} />

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
