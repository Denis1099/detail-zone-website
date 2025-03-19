
import { motion } from "framer-motion";

export const VideoTestimonials = () => {
  // YouTube short links converted to embed format, with the specified video removed
  const videoLinks = [
    "https://www.youtube.com/embed/d9yHOep_dcY",
    "https://www.youtube.com/embed/-JaYsFr35ok",
    "https://www.youtube.com/embed/vMyqMDwLSP4",
    "https://www.youtube.com/embed/yCuDjwdbXcU"
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background/95 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium mb-3 md:mb-4 inline-block px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20"
          >
            צפו בנו בפעולה
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-text"
          >
            סרטוני העבודה שלנו
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-[36%] mx-auto">
          {videoLinks.map((videoUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-secondary/20 to-primary/10 backdrop-blur-md border border-accent/10"
            >
              <div className="aspect-[9/16] w-full">
                <iframe
                  src={videoUrl}
                  title={`Video testimonial ${index + 1}`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
