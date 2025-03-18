
import React from "react";

interface TestimonialNavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  disabled: boolean;
}

export const TestimonialNavButtons = ({ onPrev, onNext, disabled }: TestimonialNavButtonsProps) => {
  return (
    <>
      <div className="absolute left-2 md:left-8 top-1/2 mt-6 transform -translate-y-1/2 z-40">
        <button
          onClick={onPrev}
          className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md hover:bg-slate-50 hover:border-primary/30 transition-all carousel-focus-visible disabled:opacity-50"
          aria-label="לדף הקודם"
          disabled={disabled}
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
          onClick={onNext}
          className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md hover:bg-slate-50 hover:border-primary/30 transition-all carousel-focus-visible disabled:opacity-50"
          aria-label="לדף הבא"
          disabled={disabled}
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
    </>
  );
};
