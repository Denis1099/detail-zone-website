
import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  style: React.CSSProperties;
  isActive: boolean;
  onClick: () => void;
  isDragging: boolean;
}

export const TestimonialCard = ({ 
  testimonial, 
  style, 
  isActive, 
  onClick, 
  isDragging 
}: TestimonialCardProps) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 carousel-card-transition will-change-transform"
      style={{
        ...style,
        transformOrigin: "center center",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onClick={onClick}
      role="group"
      aria-roledescription="slide"
      aria-label={`חוות דעת של ${testimonial.name}`}
      aria-hidden={!isActive}
    >
      <Card className="glass-card w-full max-w-[20rem] mx-auto h-[580px] md:h-[620px] bg-gradient-to-br from-purple-500/20 to-orange-400/20 backdrop-blur-md border border-white/10 shadow-xl relative">
        {/* Vehicle Image - Fixed height */}
        <div className="w-full h-52 md:h-52 rounded-t-lg overflow-hidden">
          <img
            src={testimonial.vehicleImage || '/api/placeholder/320/250'}
            alt={`רכב של ${testimonial.name}`}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
            draggable="false"
            loading="lazy"
          />
        </div>
        <div className="p-4 md:p-6 pt-3 md:pt-4 flex flex-col h-[320px] md:h-[320px] justify-between">
          {/* Testimonial Text */}
          <div className="mb-8">
            <p className="testimonial-quote text-gray-300 text-center text-sm md:text-base max-w-80 mx-auto">
              {testimonial.text}
            </p>
          </div>

          <div className="mt-auto pb-4">
            {/* Rating Stars */}
            <div className="flex items-center justify-center mb-6 max-w-80 mx-auto">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 md:h-6 md:w-6 ${
                    i < testimonial.rating 
                      ? "text-primary fill-primary"
                      : "text-gray-600"
                  }`}
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">דירוג {testimonial.rating} מתוך 5</span>
            </div>
            
            {/* Profile Image */}
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md border-2 border-white/20">
                <img
                  src={testimonial.profileImage || '/api/placeholder/200/200'}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable="false"
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>
            </div>
            
            {/* Profile name */}
            <div className="font-medium text-center text-base md:text-lg">
              {testimonial.name}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
