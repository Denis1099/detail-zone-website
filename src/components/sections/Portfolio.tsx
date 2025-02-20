
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const beforeAfterPairs = [
  {
    before: "/lovable-uploads/mercedes-jeep-before.webp",
    after: "/lovable-uploads/mercedes-jeep-after.webp"
  },
  {
    before: "/lovable-uploads/skoda-back-before.webp",
    after: "/lovable-uploads/skoda-back-after.webp"
  },
  {
    before: "/lovable-uploads/rover-before.webp",
    after: "/lovable-uploads/rover-after.webp"
  },
  {
    before: "/lovable-uploads/infinity-before.webp",
    after: "/lovable-uploads/infinity-after.webp"
  },
  {
    before: "/lovable-uploads/infinity-back-before.webp",
    after: "/lovable-uploads/infinity-back-after.webp"
  },
  {
    before: "/lovable-uploads/byd-before.webp",
    after: "/lovable-uploads/byd-after.webp"
  }
];

const BeforeAfterSlider = ({ before, after }) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [containerRef, setContainerRef] = useState(null);
  const x = useMotionValue(0);
  
  // Create transform values outside of any conditions
  const clipPathPercentage = useTransform(x, [0, sliderWidth], [100, 0]);

  useEffect(() => {
    if (containerRef) {
      const width = containerRef.offsetWidth;
      setSliderWidth(width);
      
      // Set initial position to middle
      x.set(width / 2);
    }
  }, [containerRef, x]);

  return (
    <div 
      className="relative aspect-video rounded-lg overflow-hidden shadow-xl" 
      ref={setContainerRef}
    >
      {/* Before image (base layer) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${before})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* After image (revealed by slider) */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${after})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: `inset(0 ${clipPathPercentage.get()}% 0 0)`
        }}
      />
      
      {/* Slider handle */}
      <motion.div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: sliderWidth }}
        dragElastic={0}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="text-black">⟷</div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded-full text-white text-xs">
        לפני ואחרי
      </div>
    </div>
  );
};

export const Portfolio = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-card to-background" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">עבודות אחרונות</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            הצצה לתוצאות העבודה שלנו. הזז את הסליידר כדי לראות את ההבדל
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterPairs.map((pair, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlider {...pair} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
