
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const testimonials = [
  {
    rating: 5,
    text: "שירות מעולה, מקצועי ואדיב. הרכב נראה כמו חדש!",
    name: "יוסי כהן",
  },
  {
    rating: 5,
    text: "הגעה עד הבית, עבודה נקייה ומחיר הוגן. ממליץ בחום!",
    name: "דני לוי",
  },
  {
    rating: 5,
    text: "תוצאות מדהימות, צוות מקצועי ושירותי. אחזור שוב!",
    name: "מירי דוד",
  },
];

const videoTestimonials = [
  {
    id: "4naJH4_3qFY",
    thumbnail: `https://img.youtube.com/vi/4naJH4_3qFY/maxresdefault.jpg`,
  },
  {
    id: "d9yHOep_dcY",
    thumbnail: `https://img.youtube.com/vi/d9yHOep_dcY/maxresdefault.jpg`,
  },
  {
    id: "-JaYsFr35ok",
    thumbnail: `https://img.youtube.com/vi/-JaYsFr35ok/maxresdefault.jpg`,
  },
  {
    id: "-4P6NBADNPU",
    thumbnail: `https://img.youtube.com/vi/-4P6NBADNPU/maxresdefault.jpg`,
  },
  {
    id: "vMyqMDwLSP4",
    thumbnail: `https://img.youtube.com/vi/vMyqMDwLSP4/maxresdefault.jpg`,
  },
  {
    id: "yCuDjwdbXcU",
    thumbnail: `https://img.youtube.com/vi/yCuDjwdbXcU/maxresdefault.jpg`,
  },
];

export const Testimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium mb-4 inline-block">
            ממליצים עלינו
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            מה הלקוחות אומרים
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card p-6">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-primary fill-primary"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-center">{testimonial.text}</p>
                <div className="font-medium text-center">{testimonial.name}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {videoTestimonials.map((video) => (
            <Dialog key={video.id}>
              <DialogTrigger asChild>
                <motion.div
                  className="relative aspect-[9/16] cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 z-10 rounded-lg" />
                  <img
                    src={video.thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full aspect-video p-0">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};
