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
    desktop: 4,
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card" id="services">
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
          <div className="overflow-hidden rounded-xl">
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
                    className="group relative h-[380px] md:h-[450px] bg-card/30 rounded-2xl overflow-hidden border border-white/20 shadow-lg shadow-black/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Lighter gradient overlay to let image show through */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                    
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Content area without the blur effect */}
                    <div className="relative z-20 p-5 md:p-7 h-full flex flex-col">
                      <div className="flex-grow">
                        {/* Service title with improved visibility */}
                        <h3 className="text-xl md:text-2xl font-bold mb-3 text-white drop-shadow-md">
                          {service.title}
                        </h3>
                        
                        {/* Service description with better contrast */}
                        <p className="text-gray-100 text-sm md:text-base leading-relaxed drop-shadow-sm">
                          {service.description}
                        </p>
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          variant="ghost" 
                          className="w-full border border-primary/30 bg-black/60 hover:bg-primary/30 group-hover:border-primary transition-all duration-300 py-5 text-white font-medium"
                          asChild
                        >
                          <Link to={`/blog/${blogPosts.find(post => post.serviceSlug === service.slug)?.id}`} className="flex items-center justify-center gap-2">
                            פרטים נוספים
                            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Improved navigation controls - larger and more spaced out */}
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
          
          {/* Removed pagination dots as requested */}
        </div>
      </div>
    </section>
  );
};