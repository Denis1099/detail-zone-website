
import { Testimonial } from "@/data/testimonials";
import { Star } from "lucide-react";
import { CSSProperties } from "react";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  style: CSSProperties;
  onClick: () => void;
  isDragging: boolean;
}

export const TestimonialCard = ({
  testimonial,
  isActive,
  style,
  onClick,
  isDragging,
}: TestimonialCardProps) => {
  const { rating, text, name, profileImage, vehicleImage, videoUrl } = testimonial;

  return (
    <div
      className={`absolute inset-0 transition-all duration-300 rounded-xl shadow-xl overflow-hidden bg-background/10 backdrop-blur-md border border-accent/20 
        ${isActive ? "z-10 opacity-100" : "opacity-60 hover:opacity-75"}`}
      style={style}
      onClick={onClick}
      role="button"
      aria-pressed={isActive}
      tabIndex={isActive ? 0 : -1}
    >
      <div
        className={`h-full w-full p-5 pt-4 flex flex-col gap-6 overflow-y-auto`}
        onClick={(e) => isDragging && e.stopPropagation()}
      >
        {/* Profile information and rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-white text-sm">{name}</p>
              <div className="flex mt-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-3 w-3 ${
                      index < rating ? "text-primary fill-primary" : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial text */}
        <div className="flex-grow">
          <p className="text-white/90 text-sm md:text-base leading-relaxed">
            {text}
          </p>
        </div>

        {/* YouTube video if available */}
        {videoUrl && isActive && (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-2">
            <iframe
              src={videoUrl}
              title={`Testimonial video by ${name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            ></iframe>
          </div>
        )}

        {/* Vehicle image */}
        <div
          className={`w-full h-auto rounded-lg overflow-hidden ${
            videoUrl && isActive ? "hidden" : "block"
          }`}
        >
          <img
            src={vehicleImage}
            alt="Vehicle after treatment"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
