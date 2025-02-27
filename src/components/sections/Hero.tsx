import { Button } from "@/components/ui/button";
import { PhoneCall, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount and add event listener
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const videoSrc = isMobile ? "/hero-mobile-video.mp4" : "/hero-desktop-video.mp4";
  const posterSrc = "https://images.unsplash.com/photo-1496307653780-42ee777d4833";

  return (
    <section 
      className="relative h-[100svh] flex items-center justify-center overflow-hidden" 
      aria-label="דף הבית"
    >
      {/* Enhanced overlay with richer gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/85 z-10" />
      
      {/* Video background with better loading handling */}
      <video
        key={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        poster={posterSrc}
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container relative z-20 mx-auto px-4 mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge/Tag */}
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary font-medium mb-0 inline-block px-6 py-2 rounded-full bg-primary/15 backdrop-blur-md border border-primary/25 shadow-lg shadow-primary/5"
          >
            הדיטיילינג המקצועי בדרום
          </motion.span>
          
          {/* Main title with increased margins */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold my-10 md:my-16 text-text"
          >
            <span className="text-primary/95 drop-shadow-md">כי לרכב שלך מגיע יותר</span>
          </motion.h1>
          
          {/* Subtext with improved contrast */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-text/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            אנחנו מתמחים בטיפול מקצועי לרכב שלך, עם אפשרות הגעה עד אליך
          </motion.p>
          
          {/* CTA Button with enhanced hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 font-medium py-6 px-8 text-lg shadow-lg shadow-primary/20"
            >
              השאירו פרטים עכשיו
              <PhoneCall className="mr-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with improved animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        aria-label="גלול למטה"
      >
        <ChevronDown className="w-7 h-7 text-primary animate-bounce shadow-md" />
      </motion.div>
    </section>
  );
};