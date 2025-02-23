
import { Card } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

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

const videoTestimonials = [
  "4naJH4_3qFY",
  "4naJH4_3qFY",
  "4naJH4_3qFY",
  "4naJH4_3qFY",
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const itemsPerView = isMobile ? 1 : 3;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videoTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? videoTestimonials.length - 1 : prev - 1
    );
  };

  // Create an array that repeats the videos for infinite scroll effect
  const extendedVideos = [
    ...videoTestimonials,
    ...videoTestimonials,
    ...videoTestimonials,
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium mb-4 inline-block">
            ממליצים עלינו
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            מה הלקוחות אומרים
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card p-6">
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
                <p className="text-gray-300 mb-4 text-center">{testimonial.text}</p>
                <div className="font-medium text-center">{testimonial.name}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              className="flex gap-4"
              animate={{
                x: `${-100 * currentIndex}%`,
              }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                width: `${(100 * extendedVideos.length) / itemsPerView}%`,
              }}
            >
              {extendedVideos.map((videoId, index) => (
                <div
                  key={index}
                  style={{ width: `${100 / extendedVideos.length}%` }}
                  className="px-2"
                >
                  <div className="aspect-[9/16] w-full max-w-[400px] mx-auto">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      title={`Video testimonial ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-white hover:bg-white/90 text-black"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
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
