import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    rating: 5,
    text: "שירות מעולה, מקצועי ואדיב. הרכב נראה כמו חדש!",
    name: "יוסי כהן",
  },
  {
    rating: 5,
    text: "הגעה עד הבית, עבודה נקייה ומחיר הוגן. ממליץ בחום!",
    name: "דני לוי",
  },
  {
    rating: 5,
    text: "תוצאות מדהימות, צוות מקצועי ושירותי. אחזור שוב!",
    name: "מירי דוד",
  },
];

export const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState(null);

  // Update current slide whenever carousel changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      const slideCount = testimonials.length;
      setCurrentSlide(((selectedIndex % slideCount) + slideCount) % slideCount);
    };

    api.on("select", onSelect);
    api.on("settle", onSelect);

    // Initial selection
    onSelect();

    return () => {
      api.off("select", onSelect);
      api.off("settle", onSelect);
    };
  }, [api]);

  // Fixed navigation handlers for RTL mode
  const goToNext = useCallback(() => {
    if (!api) return;
    // In RTL mode, "next" means moving visually right but programmatically left
    api.scrollPrev();
  }, [api]);

  const goToPrev = useCallback(() => {
    if (!api) return;
    // In RTL mode, "prev" means moving visually left but programmatically right
    api.scrollNext();
  }, [api]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            מה הלקוחות אומרים
          </h2>
        </div>

        {/* Left arrow - positioned better */}
        <div className="absolute left-4 md:left-0 top-1/2 mt-6 transform -translate-y-1/2 z-10">
          <button
            onClick={goToPrev}
            className="h-10 w-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md hover:bg-slate-50 hover:border-primary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="הקודם"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
        </div>

        {/* Right arrow - positioned better */}
        <div className="absolute right-4 md:right-0 top-1/2 mt-6 transform -translate-y-1/2 z-10">
          <button
            onClick={goToNext}
            className="h-10 w-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md hover:bg-slate-50 hover:border-primary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="הבא"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>

        <div className="overflow-hidden px-4 md:px-12">
          <Carousel
            dir="rtl"
            opts={{
              align: "center",
              loop: true,
              direction: "rtl",
              skipSnaps: false,
              dragFree: false,
              containScroll: "keepSnaps",
            }}
            className="w-full touch-pan-y"
            setApi={setApi}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="w-full md:w-1/2 lg:w-1/3">
                  <div className="p-1">
                    <Card className="glass-card p-6 h-full">
                      {/* Vehicle Image - Smaller size with fixed height */}
                      <div className="flex justify-center mb-8">
                        <div className="w-32 h-24 rounded-lg overflow-hidden">
                          <img 
                            src={`/api/placeholder/250/150`} 
                            alt={`רכב של ${testimonial.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Profile Image - Round, positioned with a subtle overlap */}
                      <div className="flex justify-center -mt-6 mb-4 relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                          <img 
                            src={`/api/placeholder/200/200`} 
                            alt={`תמונה של ${testimonial.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? "text-primary fill-primary"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-4 text-center">
                        {testimonial.text}
                      </p>
                      <div className="font-medium text-center">
                        {testimonial.name}
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`עבור לדף ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;