
import { motion } from "framer-motion";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { BeforeAfterPair } from "@/data/portfolio";

interface PortfolioGridProps {
  items: BeforeAfterPair[];
}

export const PortfolioGrid = ({ items }: PortfolioGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {items.map((pair, index) => (
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
  );
};
