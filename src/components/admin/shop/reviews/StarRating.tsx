
import React from 'react';
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({ 
  rating, 
  size = 'sm', 
  interactive = false,
  onChange
}: StarRatingProps) {
  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  
  const handleClick = (starValue: number) => {
    if (interactive && onChange) {
      onChange(starValue);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div 
          key={star}
          className={interactive ? 'cursor-pointer' : ''}
          onClick={() => handleClick(star)}
        >
          <Star 
            className={`${starSize} ${rating >= star 
              ? 'fill-primary text-primary' 
              : 'text-muted-foreground'}`} 
          />
        </div>
      ))}
    </div>
  );
}
