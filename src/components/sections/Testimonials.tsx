import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Define testimonial type
type Testimonial = {
  rating: number;
  text: string;
  name: string;
  profileImage: string;
  vehicleImage: string;
};

const testimonials: Testimonial[] = [
  {
    rating: 5,
    text: "תודה לכם אלופים, אהבתי את השירות הכל קל ומהיר והתוצאה מבריקה כמו שלא ראיתי את האופנוע כשהוא חדש",
    name: "מתן ניסטור",
    profileImage: "/testimonial-profiles/matan-pfp.webp",
    vehicleImage: "/testimonial-cars/matan-motorcycle.webp",
  },
  {
    rating: 5,
    text: "עבודה טובה מאוד בדיטייל זון. עשו לי ציפוי ננו לרכב והוא נראה מדהים. שירות מהיר ומקצועי, מומלץ בחום.",
    name: "פז פליישר",
    profileImage: "/testimonial-profiles/paz-pfp.webp",
    vehicleImage: "/testimonial-cars/paz-car.webp",
  },
  {
    rating: 5,
    text: "אחרי שהם עשו לי ציפוי למרצדס G class הכנסתי גם את ה מרצדס מייבאך השחורה לציפוי ננו ולמרות שצבע שחור זה הצבע הכי קשה להוציא אותו יפה, הם הוציאו אותה מבריקה מאוד כל רכב שלי אני מביא אליהם",
    name: "יקיר אבעדי",
    profileImage: "/testimonial-profiles/yakir-pfp.webp",
    vehicleImage: "/testimonial-cars/yakir-car.webp",
  },
  {
    rating: 5,
    text: "שירות ברמה הכי גבוהה שפגשתי! דניאל הסביר לי הכל בסבלנות, עמד במה שהבטיח, והתוצאה פשוט מדהימה, נראה כמו מראה פשות. הרכב נראה מבריק וחלק, והלכלוך לא נתפס עליו בכלל. ממליץ בחום",
    name: "שרון אדרי",
    profileImage: "/testimonial-profiles/sharon-edri-pfp.webp",
    vehicleImage: "/testimonial-cars/sharon-car.webp",
  },
  {
    rating: 5,
    text: "ציפוי ננו ברמה אחרת! מהשיחה הראשונה ועד קבלת הרכב – הכל היה מקצועי, ברור ועם יחס אישי.  התוצאה עלתה על הציפיות שלי, והכי חשוב – קיבלתי בדיוק מה שהובטח, בלי עיכובים",
    name: "אור רם",
    profileImage: "/testimonial-profiles/or-ram-pfp.webp",
    vehicleImage: "/testimonial-cars/or-car.webp",
  },
  {
    rating: 5,
    text: "אמינות ושירות שהיום לא רואים בכל מקום מהרגע שהגעתי, קיבלתי יחס חם והסבר מפורט על התהליך. הציפוי חידש את הרכב, שיפר משמעותית את הברק וההגנה של הרכב, ואני רואה את זה בכל יום מחדש. ממליץ לכל מי שרוצה שהרכב שלו יראה הכי טוב ",
    name: "דוד אבירם",
    profileImage: "/testimonial-profiles/david-aviram-pfp.webp",
    vehicleImage: "/testimonial-cars/david-car.webp",
  },
  {
    rating: 5,
    text: "תודה על השירות והמקצועיות, בהתחלה התלבטתי על התהליך אבל אחרי שהסברתם לי וכשראיתי בעיניים את השינוי על רכב חדש כמובן שאני מרוצה ואחזור שוב כדי לשמור על התוצאה תודה לכם ",
    name: "יוחאי מנדבי",
    profileImage: "/testimonial-profiles/yohai-pfp.webp",
    vehicleImage: "/testimonial-cars/yohai-car.webp",
  },
];

// Create a reversed order of testimonials for the reverse indicator logic
const reversedOrder = [...testimonials].map((_, index) => (testimonials.length - 1) - index);

export const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<any>(null);
  const [dragState, setDragState] = useState({
    isDragging: false,
    startX: 0,
    isDragged: false,
    startTime: 0
  });
  const [animationInProgress, setAnimationInProgress] = useState(false);
  
  // Refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDesktop = useRef(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const screenWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const timeoutRefs = useRef<{[key: string]: NodeJS.Timeout | null}>({
    touch: null,
    animation: null,
    resize: null
  });
  
  // Navigation functions - unchanged
  const goToNext = useCallback(() => {
    if (!api || animationInProgress) return;
    setAnimationInProgress(true);
    api.scrollNext(); // Move right
  }, [api, animationInProgress]);

  const goToPrev = useCallback(() => {
    if (!api || animationInProgress) return;
    setAnimationInProgress(true);
    api.scrollPrev(); // Move left
  }, [api, animationInProgress]);
  
  // Window resize handler
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      if (timeoutRefs.current.resize) clearTimeout(timeoutRefs.current.resize);
      
      timeoutRefs.current.resize = setTimeout(() => {
        isDesktop.current = window.innerWidth >= 1024;
        screenWidth.current = window.innerWidth;
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // API event handling with reversed indicator mapping
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      const slideCount = testimonials.length;
      const normalizedIndex = ((selectedIndex % slideCount) + slideCount) % slideCount;
      
      // Use the carousel's internal index for the actual content
      setCurrentSlide(normalizedIndex);
    };

    api.on("select", handleSelect);
    api.on("settle", () => {
      handleSelect();
      setAnimationInProgress(false);
    });
    api.on("dragStart", () => setAnimationInProgress(true));
    
    handleSelect();
    return () => {
      api.off("select", handleSelect);
      api.off("settle");
      api.off("dragStart");
    };
  }, [api]);

  // Animation timeout
  useEffect(() => {
    if (animationInProgress) {
      timeoutRefs.current.animation = setTimeout(() => {
        setAnimationInProgress(false);
      }, 600);
    }
    
    return () => {
      if (timeoutRefs.current.animation) {
        clearTimeout(timeoutRefs.current.animation);
      }
    };
  }, [animationInProgress]);

  // Keyboard navigation - unchanged
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animationInProgress) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev(); // Left arrow moves left
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext(); // Right arrow moves right
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, animationInProgress]);

  // Get card styles based on position
  const getCardStyles = useCallback((index: number) => {
    const diff = (index - currentSlide + testimonials.length) % testimonials.length;
    const offsetMultiplier = isDesktop.current ? 1.5 : 1;
    
    if (diff === 0) { 
      return {
        transform: "translateX(0) scale(1)",
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1)",
      };
    } 
    else if (diff === 1 || diff === testimonials.length - 1) {
      return {
        transform: diff === 1 
          ? `translateX(${90 * offsetMultiplier}px) scale(0.92)` 
          : `translateX(${-90 * offsetMultiplier}px) scale(0.92)`,
        zIndex: 20,
        opacity: 0.8,
        filter: "brightness(0.9)",
      };
    } 
    else if (diff === 2 || diff === testimonials.length - 2) {
      return {
        transform: diff === 2 
          ? `translateX(${150 * offsetMultiplier}px) scale(0.85)` 
          : `translateX(${-150 * offsetMultiplier}px) scale(0.85)`,
        zIndex: 10,
        opacity: 0.5,
        filter: "brightness(0.8)",
      };
    } 
    else {
      return {
        transform: diff > 2 
          ? `translateX(${180 * offsetMultiplier}px) scale(0.8)` 
          : `translateX(${-180 * offsetMultiplier}px) scale(0.8)`,
        zIndex: 0,
        opacity: 0,
        filter: "brightness(0.7)",
      };
    }
  }, [currentSlide]);

  // Touch/Mouse event handlers - unchanged
  const getClientX = useCallback((e: React.TouchEvent | React.MouseEvent): number => {
    return 'touches' in e ? e.touches[0].clientX : e.clientX;
  }, []);
  
  const getChangedClientX = useCallback((e: React.TouchEvent | React.MouseEvent): number => {
    return 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
  }, []);
  
  const handlePointerStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (animationInProgress) {
      e.preventDefault();
      return;
    }
    
    if (timeoutRefs.current.touch) clearTimeout(timeoutRefs.current.touch);
    
    setDragState({
      isDragging: true,
      startX: getClientX(e),
      isDragged: false,
      startTime: Date.now()
    });
  }, [animationInProgress, getClientX]);

  const handlePointerMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!dragState.isDragging) return;
    
    const diff = getClientX(e) - dragState.startX;
    if (Math.abs(diff) > screenWidth.current * 0.05) {
      setDragState(prev => ({...prev, isDragged: true}));
    }
  }, [dragState.isDragging, dragState.startX, getClientX]);

  const handlePointerEnd = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!dragState.isDragging) return;
    
    const diff = getChangedClientX(e) - dragState.startX;
    const velocity = Math.abs(diff) / (Date.now() - dragState.startTime);
    
    if ((Math.abs(diff) > screenWidth.current * 0.1 || velocity > 0.5) && !animationInProgress) {
      setAnimationInProgress(true);
      // Reverse the swipe direction to match arrow behavior - unchanged
      diff > 0 ? api?.scrollPrev() : api?.scrollNext();
    }
    
    setDragState(prev => ({...prev, isDragging: false}));
    timeoutRefs.current.touch = setTimeout(() => setAnimationInProgress(false), 500);
  }, [dragState.isDragging, dragState.startX, dragState.startTime, animationInProgress, getChangedClientX, api]);

  // Card click handler
  const handleCardClick = useCallback((index: number) => {
    if (dragState.isDragged || animationInProgress || index === currentSlide) return;
    setAnimationInProgress(true);
    api?.scrollTo(index);
  }, [dragState.isDragged, animationInProgress, currentSlide, api]);

  // Clean up all timeouts
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(
        timeout => timeout && clearTimeout(timeout)
      );
    };
  }, []);

  // Get the reversed index for indicators to make them move in the opposite direction
  const getReversedIndex = useCallback((index: number) => {
    return (testimonials.length - 1) - index;
  }, []);

  return (
    <section className="py-16 md:py-20 mb-20 md:mb-24" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-8 md:mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold">
            מה הלקוחות אומרים
          </h2>
        </div>

        {/* Navigation buttons - unchanged */}
        <div className="absolute left-2 md:left-8 top-1/2 mt-6 transform -translate-y-1/2 z-40">
          <button
            onClick={goToPrev}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md hover:bg-slate-50 hover:border-primary/30 transition-all carousel-focus-visible disabled:opacity-50"
            aria-label="לדף הקודם"
            disabled={animationInProgress}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 md:h-6 md:w-6"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
        </div>

        <div className="absolute right-2 md:right-8 top-1/2 mt-6 transform -translate-y-1/2 z-40">
          <button
            onClick={goToNext}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md hover:bg-slate-50 hover:border-primary/30 transition-all carousel-focus-visible disabled:opacity-50"
            aria-label="לדף הבא"
            disabled={animationInProgress}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 md:h-6 md:w-6"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
        
        {/* Main carousel - unchanged */}
        <div 
          className="relative h-[580px] md:h-[680px] mx-auto" 
          ref={carouselRef}
          style={{ perspective: "1500px" }}
          role="region"
          aria-roledescription="carousel"
          aria-label="חוות דעת של לקוחות"
        >
          {/* Hidden navigation carousel - unchanged */}
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

          {/* Cards container - unchanged */}
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
                    <div
                      key={index}
                      className="absolute top-0 left-0 right-0 carousel-card-transition will-change-transform"
                      style={{
                        ...getCardStyles(index),
                        transformOrigin: "center center",
                        cursor: dragState.isDragging ? "grabbing" : "grab",
                      }}
                      onClick={() => handleCardClick(index)}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`חוות דעת של ${testimonial.name}`}
                      aria-hidden={!isActive}
                    >
                      <Card className="glass-card w-full max-w-[20rem] mx-auto h-[580px] md:h-[620px] bg-gradient-to-br from-purple-500/20 to-orange-400/20 backdrop-blur-md border border-white/10 shadow-xl relative">
                        {/* Vehicle Image */}
                        <div className="w-full h-40 md:h-48 rounded-t-lg overflow-hidden mx-auto">
                          <img
                            src={testimonial.vehicleImage || '/api/placeholder/320/250'}
                            alt={`רכב של ${testimonial.name}`}
                            className="w-full h-full object-contain md:object-cover"
                            style={{ objectPosition: 'center' }}
                            draggable="false"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4 md:p-6 pt-3 md:pt-4 flex flex-col h-[350px] md:h-[350px] justify-between">
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
                })}
              </div>
            </div>
          </div>

          {/* Indicators with reversed mapping */}
          <div 
            className="flex justify-center gap-2 mt-4 relative z-40"
            role="tablist"
            aria-label="בחירת חוות דעת"
          >
            {reversedOrder.map((reversedIndex) => {
              const index = getReversedIndex(reversedIndex);
              
              return (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 carousel-focus-visible ${
                    currentSlide === index
                      ? "w-10 bg-primary"
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => {
                    if (!animationInProgress) {
                      setAnimationInProgress(true);
                      api?.scrollTo(index);
                    }
                  }}
                  onFocus={() => {
                    if (!animationInProgress && index !== currentSlide) {
                      api?.scrollTo(index);
                    }
                  }}
                  disabled={animationInProgress}
                  aria-label={`חוות דעת של ${testimonials[index].name}`}
                  aria-selected={currentSlide === index}
                  role="tab"
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        /* Removed star animation */
        
        /* Card transition with improved timing */
        .carousel-card-transition {
          transition: all 500ms cubic-bezier(0.33, 1, 0.68, 1);
        }
        
        /* Focus styles for improved keyboard navigation */
        .carousel-focus-visible:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.25);
        }
        
        /* Quotation mark style - Fixed to show on both right and left */
        .testimonial-quote {
          position: relative;
          padding: 0 1.5rem;
        }
        
        .testimonial-quote::before {
          content: '\\201C';
          position: absolute;
          font-size: 2rem;
          right: 0;
          top: -0.5rem;
          color: rgba(255, 255, 255, 0.3);
        }
        
        .testimonial-quote::after {
          content: '\\201D';
          position: absolute;
          font-size: 2rem;
          left: 0;
          bottom: -1rem;
          color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;