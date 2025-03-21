
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Extend the Window interface to include YouTube API properties
declare global {
  interface Window {
    YT: {
      Player: any;
      PlayerState: {
        PLAYING: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export const VideoTestimonials = () => {
  const isMobile = useIsMobile();
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  
  // YouTube short links converted to embed format
  const videoLinks = [
    "https://www.youtube.com/embed/d9yHOep_dcY",
    "https://www.youtube.com/embed/-JaYsFr35ok",
    "https://www.youtube.com/embed/vMyqMDwLSP4",
    "https://www.youtube.com/embed/yCuDjwdbXcU"
  ];

  // Update all YouTube embed URLs to include autoplay and enable fullscreen on load
  useEffect(() => {
    const updatedVideoLinks = videoLinks.map(url => {
      // Add parameters for better fullscreen support
      return `${url}?enablejsapi=1&rel=0`;
    });

    // Initialize YouTube API if it's not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, [videoLinks]);

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

        {/* Responsive grid layout - 1 column on mobile, 2 columns on medium, 4 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 md:max-w-6xl mx-auto">
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
                  ref={el => videoRefs.current[index] = el}
                  src={`${videoUrl}?enablejsapi=1&rel=0`}
                  title={`Video testimonial ${index + 1}`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  id={`youtube-player-${index}`}
                ></iframe>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
