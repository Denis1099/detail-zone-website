
import { motion } from "framer-motion";

export const PortfolioHeader = () => {
  return (
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
  );
};
