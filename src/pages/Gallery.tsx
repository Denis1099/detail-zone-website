
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ColorFilter } from "@/components/gallery/ColorFilter";
import { CarColor, getFilteredGalleryItems } from "@/data/gallery";

const Gallery = () => {
  const [selectedColor, setSelectedColor] = useState<CarColor>("all");
  const filteredItems = getFilteredGalleryItems(selectedColor);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <GalleryHero />
        <ColorFilter 
          selectedColor={selectedColor} 
          onColorChange={setSelectedColor} 
        />
        <GalleryGrid items={filteredItems} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Gallery;
