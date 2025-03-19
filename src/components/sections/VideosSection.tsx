
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Video } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export const VideosSection = () => {
  // Filter testimonials that have videos
  const videoTestimonials = testimonials.filter(
    (testimonial) => testimonial.videoUrl
  );

  if (videoTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-black/50 backdrop-blur-sm" id="videos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <Video className="h-8 w-8 text-primary" />
            <span>הלקוחות מספרים</span>
          </h2>
          <p className="mt-3 text-text/80 max-w-2xl mx-auto">
            צפו בסרטונים של לקוחות מרוצים מספרים על החוויה שלהם ב-DetailZone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {videoTestimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-background/10 backdrop-blur-md border border-accent/20 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <CardContent className="p-0">
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.profileImage} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                  </div>
                </div>
                
                <div className="aspect-video w-full">
                  <iframe
                    src={testimonial.videoUrl}
                    title={`עדות וידאו מאת ${testimonial.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
                
                <div className="p-4">
                  <p className="text-white/80 text-sm">{testimonial.text.substring(0, 100)}...</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
