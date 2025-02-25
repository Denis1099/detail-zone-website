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

  const nextSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium mb-4 inline-block">
            השירותים שלנו
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            טיפול מושלם לרכב שלך
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
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
              {services.map((service) => (
                <div
                  key={service.id}
                  style={{ width: `${100 / services.length}%` }}
                  className="px-2"
                >
                  <motion.div 
                    className="group relative h-[400px] bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="relative z-20 p-6 h-full flex flex-col">
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-2 text-white">
                          {service.title}
                        </h3>
                        <p className="text-gray-300 text-sm opacity-90">
                          {service.description}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Button 
                          variant="ghost" 
                          className="w-full border border-primary/20 bg-black/50 hover:bg-primary/20 backdrop-blur-sm group-hover:border-primary transition-all duration-300"
                          asChild
                        >
                          <Link to={`/blog/${blogPosts.find(post => post.serviceSlug === service.slug)?.id}`} className="flex items-center justify-center gap-2">
                            פרטים נוספים
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex === 0}
              className="rounded-full bg-background/50 backdrop-blur-sm border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex >= maxIndex}
              className="rounded-full bg-background/50 backdrop-blur-sm border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
