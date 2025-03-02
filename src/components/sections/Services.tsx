
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { Link } from "react-router-dom";

export const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const itemsPerPage = {
    desktop: 3, // Changed from 4 to 3 to match the reference image
    mobile: 1
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayCount = isMobile ? itemsPerPage.mobile : itemsPerPage.desktop;
  const totalSlides = Math.ceil(services.length / displayCount) - 1;
  const maxIndex = totalSlides;

  // ORIGINAL SLIDER LOGIC PRESERVED
  const nextSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-4 md:mb-6 inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            השירותים שלנו
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-text"
          >
            טיפול מושלם לרכב שלך
          </motion.h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            {/* ORIGINAL MOTION LOGIC PRESERVED */}
            <motion.div
              className="flex gap-6"
              style={{
                width: `${100 * (services.length / displayCount)}%`,
              }}
              animate={{
                x: `${currentIndex * (100 / (services.length / displayCount))}%`
              }}
              transition={{ 
                type: "tween",
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  style={{ width: `${100 / services.length}%` }}
                  className="px-2"
                >
                  <motion.div 
                    className="group relative h-[400px] md:h-[380px] rounded-3xl overflow-hidden shadow-xl bg-white"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Service button on top */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
                      <h3 className="text-lg md:text-xl font-bold text-black">
                        {service.title}
                      </h3>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="rounded-full bg-white hover:bg-primary/10 transition-all w-10 h-10"
                        asChild
                      >
                        <Link to={`/blog/${blogPosts.find(post => post.serviceSlug === service.slug)?.id}`}>
                          <ArrowUpRight className="h-5 w-5 text-black" />
                        </Link>
                      </Button>
                    </div>
                    
                    {/* Service image - Updated for 16:9 aspect ratio with margin */}
                    <div className="w-full h-full mt-16 p-5 pb-8">
                      <div className="w-full h-[calc(100%-20px)] aspect-video rounded-2xl overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center gap-6 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex === 0}
              className="rounded-full bg-background/70 border-primary text-primary hover:bg-primary hover:text-white transition-colors h-12 w-12 shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex >= maxIndex}
              className="rounded-full bg-background/70 border-primary text-primary hover:bg-primary hover:text-white transition-colors h-12 w-12 shadow-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
