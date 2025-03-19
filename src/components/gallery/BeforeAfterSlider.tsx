
import { useState, useRef, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label?: string;
}

export const BeforeAfterSlider = ({ before, after, label }: BeforeAfterSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50); // Start at 50% (middle)
  
  // Initialize container width on mount and window resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || !isDragging) return;
    
    // Get container bounds
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate position (reversed for RTL)
    let clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const containerRight = rect.right;
    const distance = containerRight - clientX;
    
    // Convert to percentage (reversed for RTL)
    let newPosition = (distance / rect.width) * 100;
    
    // Clamp between 0 and 100
    newPosition = Math.max(0, Math.min(100, newPosition));
    setPosition(newPosition);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e);
  };

  // Handle mouse events
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      if (!containerRef.current) return;
      
      // Get container bounds
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate position (reversed for RTL)
      const containerRight = rect.right;
      const distance = containerRight - e.clientX;
      
      // Convert to percentage (reversed for RTL)
      let newPosition = (distance / rect.width) * 100;
      
      // Clamp between 0 and 100
      newPosition = Math.max(0, Math.min(100, newPosition));
      setPosition(newPosition);
    };

    const handleTouchMoveGlobal = (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      e.preventDefault();
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerRight = rect.right;
      const distance = containerRight - e.touches[0].clientX;
      
      let newPosition = (distance / rect.width) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));
      setPosition(newPosition);
    };
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMoveGlobal);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl">
      {/* Card container with 1:1 aspect ratio */}
      <AspectRatio ratio={1} className="w-full">
        <div 
          ref={containerRef}
          className="relative w-full h-full overflow-hidden cursor-ew-resize"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Label */}
          {label && (
            <div className="absolute top-3 right-3 z-30 bg-background/80 px-3 py-1 rounded-full text-text text-sm font-medium border border-secondary/20">
              {label}
            </div>
          )}
          
          {/* Before image (background) */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${before})`,
            }}
          >
            {/* "Before" Label */}
            <div className="absolute bottom-3 right-3 bg-secondary/80 px-2 py-0.5 rounded text-text text-xs font-medium">
              לפני
            </div>
          </div>
          
          {/* After image (revealed by slider) */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${after})`,
              clipPath: `polygon(${100-position}% 0%, 100% 0%, 100% 100%, ${100-position}% 100%)`,
            }}
          >
            {/* "After" Label */}
            <div className="absolute bottom-3 left-3 bg-accent/80 px-2 py-0.5 rounded text-background text-xs font-medium">
              אחרי
            </div>
          </div>
          
          {/* Divider line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-text z-10"
            style={{ right: `${position}%` }}
          >
            {/* Handle with bidirectional arrow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md border-2 border-text">
              <span className="text-text font-bold text-sm">&lt;&gt;</span>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};
