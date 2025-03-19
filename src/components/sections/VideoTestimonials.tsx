
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

type VideoTestimonial = {
  id: string;
  name: string;
  text: string;
  videoUrl: string;
  thumbnail: string;
  profileImage: string;
};

// Example data - this would typically come from your data folder
const videoTestimonials: VideoTestimonial[] = [
  {
    id: "video1",
    name: "אלכס משיח",
    text: "כיצד ציפוי הננו הגן על הרכב שלי במשך שנתיים",
    videoUrl: "https://www.youtube.com/embed/zGCxZCexDmw",
    thumbnail: "/testimonial-cars/david-car.webp",
    profileImage: "/testimonial-profiles/david-aviram-pfp.webp"
  },
  {
    id: "video2",
    name: "דניאל כהן",
    text: "הרכב שלי נראה כמו חדש אחרי הטיפול",
    videoUrl: "https://www.youtube.com/embed/n_ZHTA0LJdw",
    thumbnail: "/testimonial-cars/sharon-car.webp",
    profileImage: "/testimonial-profiles/sharon-edri-pfp.webp"
  },
  {
    id: "video3",
    name: "ישראל לוי",
    text: "ההבדל בין לפני ואחרי פשוט מדהים",
    videoUrl: "https://www.youtube.com/embed/bUV9wTZDnok",
    thumbnail: "/testimonial-cars/yakir-car.webp",
    profileImage: "/testimonial-profiles/yakir-pfp.webp"
  }
];

export const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-3 md:mb-4 inline-block px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20"
          >
            סרטוני המלצות
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-text"
          >
            צפו בחוויות לקוחותינו
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videoTestimonials.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-secondary/30 to-primary/20 backdrop-blur-md border border-accent/10"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                    <img 
                      src={video.profileImage} 
                      alt={video.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-text">{video.name}</h3>
                    <p className="text-sm text-text/70">{video.text}</p>
                  </div>
                </div>

                <div 
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setActiveVideo(video.id)}
                >
                  {activeVideo === video.id ? (
                    <iframe
                      src={`${video.videoUrl}?autoplay=1`}
                      title={video.name}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  ) : (
                    <>
                      <img 
                        src={video.thumbnail} 
                        alt={`סרטון המלצה של ${video.name}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/60">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="w-16 h-16 rounded-full bg-primary/80 border-primary hover:bg-primary text-white"
                        >
                          <Video className="h-8 w-8" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
