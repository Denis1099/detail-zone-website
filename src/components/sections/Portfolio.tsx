
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const beforeAfterPairs = [
  {
    before: "/lovable-uploads/mercedes-jeep-before.webp",
    after: "/lovable-uploads/mercedes-jeep-after.webp",
    label: "מרצדס AMG GLE"
  },
  {
    before: "/lovable-uploads/skoda-back-before.webp",
    after: "/lovable-uploads/skoda-back-after.webp",
    label: "סקודה - חידוש פנסים"
  },
  {
    before: "/lovable-uploads/rover-before.webp",
    after: "/lovable-uploads/rover-after.webp",
    label: "ריינג׳ רובר ספורט"
  },
  {
    before: "/lovable-uploads/infinity-before.webp",
    after: "/lovable-uploads/infinity-after.webp",
    label: "אינפיניטי QX70"
  },
  {
    before: "/lovable-uploads/infinity-back-before.webp",
    after: "/lovable-uploads/infinity-back-after.webp",
    label: "אינפיניטי - טיפול חוץ"
  },
  {
    before: "/lovable-uploads/byd-before.webp",
    after: "/lovable-uploads/byd-after.webp",
    label: "BYD האן"
  }
];

const BeforeAfterSlider = ({ before, after, label }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50); // Start at 50% (middle)
  
  // Initialize container width on mount and window resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  const handleMove = (e) => {
    if (!containerRef.current || !isDragging) return;
    
    // Get container bounds
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate position (reversed for RTL)
    let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const containerRight = rect.right;
    const distance = containerRight - clientX;
    
    // Convert to percentage (reversed for RTL)
    let newPosition = (distance / rect.width) * 100;
    
    // Clamp between 0 and 100
    newPosition = Math.max(0, Math.min(100, newPosition));
    setPosition(newPosition);
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e);
  };

  // Handle mouse events
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const handleMouseMove = (e) => {
      handleMove(e);
    };
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl">
      {/* Card container with 1:1 aspect ratio */}
      <AspectRatio ratio={1} className="w-full">
        <div 
          ref={containerRef}
          className="relative w-full h-full overflow-hidden cursor-ew-resize"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Label */}
          {label && (
            <div className="absolute top-3 right-3 z-30 bg-black/70 px-3 py-1 rounded-full text-white text-sm font-medium">
              {label}
            </div>
          )}
          
          {/* Before image (background) */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${before})`,
            }}
          >
            {/* "Before" Label */}
            <div className="absolute bottom-3 right-3 bg-red-500/80 px-2 py-0.5 rounded text-white text-xs font-medium">
              לפני
            </div>
          </div>
          
          {/* After image (revealed by slider) */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${after})`,
              clipPath: `polygon(${100-position}% 0%, 100% 0%, 100% 100%, ${100-position}% 100%)`,
            }}
          >
            {/* "After" Label */}
            <div className="absolute bottom-3 left-3 bg-green-500/80 px-2 py-0.5 rounded text-white text-xs font-medium">
              אחרי
            </div>
          </div>
          
          {/* Divider line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white z-10"
            style={{ right: `${position}%` }}
          >
            {/* Handle with bidirectional arrow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">&lt;&gt;</span>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export const Portfolio = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-card to-background" id="portfolio">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-3 inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            הפורטפוליו שלנו
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-text mb-3"
          >
            עבודות אחרונות
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            הצצה לתוצאות העבודה שלנו. הזיזו את הסליידר כדי לראות את ההבדל
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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
