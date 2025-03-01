
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedCounterProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

const AnimatedCounter = ({ end, duration = 1500, suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrameId: number;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };
      
      animationFrameId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={counterRef} className="font-bold text-primary">
      {isInView ? count : 0}{suffix}
    </span>
  );
};

export const CounterSection = () => {
  return (
    <section className="bg-black relative h-[33vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden" dir="rtl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')]" />
      </div>

      <motion.div 
        className="container mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-xl md:text-2xl text-text mb-8 leading-relaxed">
          טיפלנו במעל ל-<AnimatedCounter end={15000} /> רכבים 
          ב-<AnimatedCounter end={4} /> שנות עבודה 
          עם <AnimatedCounter end={98} suffix="%" /> אחוזי שביעות רצון.
        </p>

        <div className="mt-8">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d849.0721146020093!2d34.81596!3d31.242995!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502a3218b9bfe33%3A0x99f84b9f7fe66e18!2sDetail%20Zone!5e0!3m2!1sen!2sil!4v1689952867296!5m2!1sen!2sil" 
            className="w-full max-w-xl h-32 mx-auto rounded-lg shadow-lg border border-primary/30 glass-card"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
            aria-label="Google Maps"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
};
