import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile on initial load
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Run on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const videoSrc = isMobile ? "/hero-mobile-video.mp4" : "/hero-desktop-video.mp4";
  const posterSrc = isMobile 
    ? "https://images.unsplash.com/photo-mobile-poster.jpg" 
    : "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container relative z-20 mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-primary font-medium mb-4 inline-block">
            הדיטיילינג המקצועי בדרום
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-glow">
            שירותי דיטיילינג
            <br />
            ברמה אחרת
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            אנחנו מתמחים בטיפול מקצועי ברכב שלך, עם אפשרות הגעה עד אליך
          </p>
          <Button size="lg" className="animate-pulse">
            השאירו פרטים עכשיו
            <PhoneCall className="mr-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};