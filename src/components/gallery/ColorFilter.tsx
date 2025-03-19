
import { motion } from "framer-motion";
import { CarColor, colorMap } from "@/data/gallery";
import { cn } from "@/lib/utils";

interface ColorFilterProps {
  selectedColor: CarColor;
  onColorChange: (color: CarColor) => void;
}

export const ColorFilter = ({ selectedColor, onColorChange }: ColorFilterProps) => {
  return (
    <div className="pb-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {/* All colors option */}
          <button
            onClick={() => onColorChange("all")}
            className={cn(
              "relative px-6 py-2 rounded-full text-sm font-medium transition-all",
              selectedColor === "all" 
                ? "bg-primary text-white" 
                : "bg-background border border-primary/30 text-text hover:bg-primary/10"
            )}
          >
            הכל
          </button>
          
          {/* Individual color options */}
          {(Object.entries(colorMap) as [Exclude<CarColor, "all">, string][]).map(([color, hexValue]) => (
            <button
              key={color}
              onClick={() => onColorChange(color as CarColor)}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all",
                selectedColor === color 
                  ? "bg-primary text-white" 
                  : "bg-background border border-primary/30 text-text hover:bg-primary/10"
              )}
            >
              <span 
                className="w-4 h-4 rounded-full inline-block border"
                style={{ backgroundColor: hexValue }}
              />
              {color === "white" ? "לבן" : 
               color === "black" ? "שחור" : 
               color === "silver" ? "כסוף" : 
               color === "red" ? "אדום" : 
               color === "blue" ? "כחול" : 
               color === "gray" ? "אפור" : color}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
