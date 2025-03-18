
import React from "react";

export const TestimonialStyles = () => {
  return (
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
  );
};
