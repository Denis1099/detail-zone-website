import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
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
  // Calculate how many slides we need based on total items and items per page
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
              className="flex gap-4"
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
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-full flex flex-col">
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full aspect-video object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">
                        {String(service.id).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </div>
                      <Button asChild className="w-full mt-4" variant="outline">
                        <Link to={`/services/${service.slug}`} className="flex items-center justify-center gap-2">
                          פרטים נוספים
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
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
              className="rounded-full bg-white hover:bg-white/90 text-black"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex >= maxIndex}
              className="rounded-full bg-white hover:bg-white/90 text-black"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};