
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Link } from "react-router-dom";

export const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = {
    desktop: 3,
    mobile: 2
  };

  const isMobile = window.innerWidth < 768;
  const displayCount = isMobile ? itemsPerPage.mobile : itemsPerPage.desktop;
  const maxIndex = services.length - displayCount;

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
              className="flex gap-4 px-1"
              animate={{
                x: `${currentIndex * -33.33}%`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.75rem)] flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
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
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-gray-600">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <Button asChild className="w-full" variant="outline">
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

          <div className="flex justify-end gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex >= maxIndex}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
