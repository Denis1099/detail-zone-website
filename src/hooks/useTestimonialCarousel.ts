
import { useState, useCallback, useRef, useEffect } from "react";
import { Testimonial } from "@/data/testimonials";

export const useTestimonialCarousel = (testimonials: Testimonial[]) => {
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
  
  // Navigation functions
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

  // API event handling
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
  }, [api, testimonials.length]);

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

  // Keyboard navigation
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
  }, [currentSlide, testimonials.length]);

  // Touch/Mouse event handlers
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

  return {
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
  };
};
