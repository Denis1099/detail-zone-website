
import { useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Expand } from "lucide-react";

export const VideoTestimonials = () => {
  const isMobile = useIsMobile();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
  // YouTube short links converted to embed format
  const videoLinks = [
    "https://www.youtube.com/embed/d9yHOep_dcY",
    "https://www.youtube.com/embed/-JaYsFr35ok",
    "https://www.youtube.com/embed/vMyqMDwLSP4",
    "https://www.youtube.com/embed/yCuDjwdbXcU"
  ];

  // Handle fullscreen toggling for iframe
  const toggleFullscreen = (videoUrl: string) => {
    setActiveVideo(videoUrl);
    
    // Find the iframe element by its src attribute
    const iframe = document.querySelector(`iframe[src="${videoUrl}"]`) as HTMLIFrameElement;
    
    if (iframe) {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          iframe.requestFullscreen();
        }
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background/95 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-3 md:mb-4 inline-block px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20"
          >
            צפו בנו בפעולה
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-text"
          >
            סרטוני העבודה שלנו
          </motion.h2>
        </div>

        {/* Grid layout - full width on mobile, 2x2 grid on desktop */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8'} md:max-w-[39.6%] mx-auto`}>
          {videoLinks.map((videoUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-secondary/20 to-primary/10 backdrop-blur-md border border-accent/10 relative"
            >
              <div className="aspect-[9/16] w-full relative">
                <iframe
                  src={videoUrl}
                  title={`Video testimonial ${index + 1}`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                
                {/* Expand button overlay */}
                <button
                  onClick={() => toggleFullscreen(videoUrl)}
                  className="absolute top-2 right-2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                  aria-label="הפעל במסך מלא"
                >
                  <Expand className="h-4 w-4 text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
