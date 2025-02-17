
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img 
        src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        alt="Car Detailing"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="container relative z-20 mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-primary font-medium mb-4 inline-block">
            הדיטיילינג המקצועי בדרום
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-glow">
            שירותי דיטיילינג
            <br />
            ברמה אחרת
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            אנחנו מתמחים בטיפול מקצועי ברכב שלך, עם אפשרות הגעה עד אליך
          </p>
          <Button size="lg" className="animate-pulse">
            <PhoneCall className="ml-2 h-4 w-4" />
            קבע תור עכשיו
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
