
import { motion } from "framer-motion";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BeforeAfterPairWithColor } from "@/data/gallery";

interface GalleryGridProps {
  items: BeforeAfterPairWithColor[];
}

export const GalleryGrid = ({ items }: GalleryGridProps) => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-muted-foreground">לא נמצאו תמונות שתואמות את הסינון שבחרת</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((pair, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <BeforeAfterSlider {...pair} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
