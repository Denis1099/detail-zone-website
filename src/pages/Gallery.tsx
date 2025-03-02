
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { beforeAfterPairs } from "@/data/gallery";

const Gallery = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <GalleryHero />
        <GalleryGrid items={beforeAfterPairs} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Gallery;
