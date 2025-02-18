
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

export const Portfolio = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "/lovable-uploads/1da101aa-bac2-4df1-82e8-8d4fea1c28c3.png",
    "/lovable-uploads/77b55dc6-a81e-4ec0-b301-885308d24652.png"
  ];

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">עבודות אחרונות</h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-video relative rounded-lg overflow-hidden"
          >
            <img 
              src={images[currentImageIndex]}
              alt={`Portfolio image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={handlePrev}
              className="bg-black/50 hover:bg-black/75 text-white p-2 rounded-r-lg transition-colors"
            >
              ←
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={handleNext}
              className="bg-black/50 hover:bg-black/75 text-white p-2 rounded-l-lg transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
