
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { TestimonialNavButtons } from "@/components/testimonials/TestimonialNavButtons";
import { TestimonialStyles } from "@/components/testimonials/TestimonialStyles";
import { useTestimonialCarousel } from "@/hooks/useTestimonialCarousel";

export const Testimonials = () => {
  const {
    currentSlide,
    setApi,
    dragState,
    animationInProgress,
    carouselRef,
    goToNext,
    goToPrev,
    getCardStyles,
    handlePointerStart,
    handlePointerMove,
    handlePointerEnd,
    handleCardClick
  } = useTestimonialCarousel(testimonials);

  return (
    <section className="py-16 md:py-20 mb-20 md:mb-24 overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-8 md:mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold">
            מה הלקוחות אומרים
          </h2>
        </div>

        {/* Navigation buttons */}
        <TestimonialNavButtons 
          onPrev={goToPrev} 
          onNext={goToNext} 
          disabled={animationInProgress}
        />
        
        {/* Main carousel */}
        <div 
          className="relative h-[580px] md:h-[680px] mx-auto" 
          ref={carouselRef}
          style={{ perspective: "1500px" }}
          role="region"
          aria-roledescription="carousel"
          aria-label="חוות דעת של לקוחות"
        >
          {/* Hidden navigation carousel */}
          <Carousel
            dir="rtl"
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              dragFree: false,
              containScroll: "keepSnaps",
            }}
            className="hidden"
            setApi={setApi}
          >
            <CarouselContent>
              {testimonials.map((_, index) => (
                <CarouselItem key={index}>
                  <div className="h-1 w-1"></div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Cards container */}
          <div 
            className="h-[520px] md:h-[620px] mx-auto relative overflow-visible"
            onTouchStart={handlePointerStart}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerEnd}
            onMouseDown={handlePointerStart}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerEnd}
            onMouseLeave={handlePointerEnd}
            onDragStart={(e) => e.preventDefault()}
          >
            <div className="relative w-full max-w-lg mx-auto h-full">
              <div className="relative h-full" aria-live="polite">
                {testimonials.map((testimonial, index) => {
                  const isActive = index === currentSlide;
                  
                  return (
                    <TestimonialCard
                      key={index}
                      testimonial={testimonial}
                      style={getCardStyles(index)}
                      isActive={isActive}
                      onClick={() => handleCardClick(index)}
                      isDragging={dragState.isDragging}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <TestimonialStyles />
    </section>
  );
};

export default Testimonials;
