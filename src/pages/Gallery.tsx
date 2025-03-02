
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

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
