
import { motion } from "framer-motion";

export const GalleryHero = () => {
  return (
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
  );
};
