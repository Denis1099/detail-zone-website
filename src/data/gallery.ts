
import { BeforeAfterPair } from "./portfolio";

// Add color information to each before/after pair
export interface BeforeAfterPairWithColor extends BeforeAfterPair {
  color: CarColor;
}

// Define available car colors
export type CarColor = 
  | "all" 
  | "white" 
  | "black" 
  | "silver" 
  | "red" 
  | "blue" 
  | "gray";

// Map of color names to hex values for the UI
export const colorMap: Record<Exclude<CarColor, "all">, string> = {
  white: "#fff1e1",
  black: "#000000",
  silver: "#c8c8c9",
  red: "#ea384c",
  blue: "#1babbb",
  gray: "#8E9196",
};

// Use the same data from portfolio but add color information
export const beforeAfterPairs: BeforeAfterPairWithColor[] = [
  {
    before: "/lovable-uploads/before-after/mercedes-jeep-before.webp",
    after: "/lovable-uploads/before-after/mercedes-jeep-after.webp",
    label: "מרצדס AMG GLE",
    color: "black"
  },
  {
    before: "/lovable-uploads/before-after/seat-before.webp",
    after: "/lovable-uploads/before-after/seat-after.webp",
    label: "סיאט",
    color: "white"
  },
  {
    before: "/lovable-uploads/before-after/rover-before.webp",
    after: "/lovable-uploads/before-after/rover-after.webp",
    label: "ריינג׳ רובר ספורט",
    color: "gray"
  },
  {
    before: "/lovable-uploads/before-after/kia-before.webp",
    after: "/lovable-uploads/before-after/kia-after.webp",
    label: "קיה",
    color: "silver"
  },
  {
    before: "/lovable-uploads/before-after/infinity-back-before.webp",
    after: "/lovable-uploads/before-after/infinity-back-after.webp",
    label: "אינפיניטי",
    color: "blue"
  },
  {
    before: "/lovable-uploads/before-after/byd-before.webp",
    after: "/lovable-uploads/before-after/byd-after.webp",
    label: "BYD",
    color: "red"
  }
];

// Helper function to get a filtered list based on color
export const getFilteredGalleryItems = (selectedColor: CarColor) => {
  if (selectedColor === "all") {
    return beforeAfterPairs;
  }
  
  return beforeAfterPairs.filter(item => item.color === selectedColor);
};
