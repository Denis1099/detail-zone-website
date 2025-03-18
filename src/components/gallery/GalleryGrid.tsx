
import { motion } from "framer-motion";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Define the types for the before-after pairs
interface BeforeAfterPair {
  before: string;
  after: string;
  label?: string;
}

interface GalleryGridProps {
  items: BeforeAfterPair[];
}

export const GalleryGrid = ({ items }: GalleryGridProps) => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((pair, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AspectRatio ratio={1} className="w-full">
                <BeforeAfterSlider {...pair} />
              </AspectRatio>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
