
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

type AnimatedCounterProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

const AnimatedCounter = ({ end, duration = 3000, suffix = "" }: AnimatedCounterProps) => {
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
          טיפלנו במעל ל-<AnimatedCounter end={2000} /> רכבים 
          ב-<AnimatedCounter end={6} /> שנות עבודה 
          עם <AnimatedCounter end={98} suffix="%" /> אחוזי שביעות רצון.
        </p>

        <div className="mt-4 flex justify-center">
          {Array(5).fill(0).map((_, index) => (
            <Star 
              key={index}
              className="text-primary mx-1 w-8 h-8 md:w-10 md:h-10"
              fill="#1babbb"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
