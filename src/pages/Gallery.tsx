
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Use the same data from the Portfolio component
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
  },
  // Add more examples here in the future
];

const BeforeAfterSlider = ({ before, after, label }) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  
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
      {/* Card container */}
      <div 
        ref={containerRef}
        className="relative aspect-video overflow-hidden cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Label */}
        {label && (
          <div className="absolute top-3 right-3 z-30 bg-black/70 px-3 py-1 rounded-full text-white text-sm font-medium">
            {label}
          </div>
        )}
        
        {/* Before image */}
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
        
        {/* After image */}
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
    </div>
  );
};

const Gallery = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Hero section for Gallery */}
        <section className="bg-gradient-to-b from-black to-card py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-primary text-sm font-medium mb-4 inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
              >
                הפורטפוליו שלנו
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-text mb-4"
              >
                גלריית עבודות
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-muted-foreground max-w-2xl mx-auto"
              >
                תוצאות עבודה מרשימות של הצוות המקצועי שלנו. הזיזו את הסליידר כדי לראות את ההבדל
              </motion.p>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beforeAfterPairs.map((pair, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BeforeAfterSlider {...pair} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Gallery;
