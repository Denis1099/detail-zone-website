
import { Card } from "@/components/ui/card";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export const Portfolio = () => {
  const x = useMotionValue(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  
  const images = [
    "/lovable-uploads/77b55dc6-a81e-4ec0-b301-885308d24652.png",
    "/lovable-uploads/1da101aa-bac2-4df1-82e8-8d4fea1c28c3.png"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">עבודות אחרונות</h2>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="relative aspect-square rounded-lg overflow-hidden" 
               onMouseDown={(e) => setSliderWidth(e.currentTarget.offsetWidth)}>
            <motion.div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <motion.div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${images[1]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                clipPath: useTransform(x, [0, sliderWidth], 
                  ["polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                   "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"]
                )
              }}
            />
            
            <motion.div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ 
                x: useTransform(x, [0, sliderWidth], [sliderWidth, 0]),
                left: 'auto',
                right: 0
              }}
              drag="x"
              dragConstraints={{ left: 0, right: sliderWidth }}
              dragElastic={0}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="text-black">⟷</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
