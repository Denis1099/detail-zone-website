
import { useState, useRef, useEffect } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label?: string;
}

export const BeforeAfterSlider = ({ before, after, label }: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!containerRef.current || !isDragging) return;
    
    // Get container bounds
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate position (reversed for RTL)
    let clientX: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const containerRight = rect.right;
    const distance = containerRight - clientX;
    
    // Convert to percentage (reversed for RTL)
    let newPosition = (distance / rect.width) * 100;
    
    // Clamp between 0 and 100
    newPosition = Math.max(0, Math.min(100, newPosition));
    setPosition(newPosition);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    handleMove(e);
  };

  // Handle mouse events
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e);
    };
    
    const handleTouchMoveEvent = (e: TouchEvent) => {
      handleTouchMove(e);
    };
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMoveEvent, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMoveEvent);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl">
      {/* Card container */}
      <div 
        ref={containerRef}
        className="relative aspect-video overflow-hidden cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Label */}
        {label && (
          <div className="absolute top-3 right-3 z-30 bg-black/70 px-3 py-1 rounded-full text-white text-sm font-medium">
            {label}
          </div>
        )}
        
        {/* Before image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${before})`,
          }}
        >
          {/* "Before" Label */}
          <div className="absolute bottom-3 right-3 bg-red-500/80 px-2 py-0.5 rounded text-white text-xs font-medium">
            לפני
          </div>
        </div>
        
        {/* After image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${after})`,
            clipPath: `polygon(${100-position}% 0%, 100% 0%, 100% 100%, ${100-position}% 100%)`,
          }}
        >
          {/* "After" Label */}
          <div className="absolute bottom-3 left-3 bg-green-500/80 px-2 py-0.5 rounded text-white text-xs font-medium">
            אחרי
          </div>
        </div>
        
        {/* Divider line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white z-10"
          style={{ right: `${position}%` }}
        >
          {/* Handle with bidirectional arrow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">&lt;&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
