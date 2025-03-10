
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type CounterProps = {
  end: number;
  label: string;
  duration?: number;
  suffix?: string;
};

const Counter = ({
  end,
  label,
  duration = 3000,
  suffix = ""
}: CounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  const [count, setCount] = useState(0);

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

  return <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {isInView ? count : 0}{suffix}
      </div>
      <div className="text-sm md:text-base text-text/80">{label}</div>
    </div>;
};

export const AboutUs = () => {
  return <section className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-black to-card relative overflow-hidden py-6" id="about" dir="rtl">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')]" />
      </div>

      <div className="container mx-auto px-4 flex flex-col h-full">
        <div className="text-center mb-6">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-3xl md:text-4xl font-bold text-text mb-2">
            מי אנחנו?
          </motion.h2>
          <motion.p initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            צוות מקצועי וניסיון עשיר בתחום הדיטיילינג והטיפוח לרכב
          </motion.p>
        </div>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8">
          {/* Left column - Text content */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} viewport={{
          once: true
        }} className="space-y-4 pr-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-text">
                הסיפור שלנו
              </h3>
              <p className="text-text/80 leading-relaxed mb-2 text-sm md:text-base">
                ב-Detail Zone, אנחנו מקפידים על איכות ושירות ללא פשרות כבר למעלה מעשור. המומחיות שלנו בטיפולי דיטיילינג מקצועיים הפכה אותנו למובילים בדרום הארץ.
              </p>
              <p className="text-text/80 leading-relaxed text-sm md:text-base">
                הצוות שלנו, בהובלת דניאל, משלב ידע מקצועי עם תשוקה לרכבים ולפרטים הקטנים. אנו מאמינים שכל רכב ראוי לטיפול אישי ומותאם, ולכן אנו משתמשים רק בחומרים איכותיים ובטכניקות מתקדמות מהעולם.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-text">
                הגישה שלנו
              </h3>
              <p className="text-text/80 leading-relaxed text-sm md:text-base">
                המטרה שלנו היא להחזיר את הרכב שלכם למצב מושלם, בין אם מדובר בניקוי פנימי מעמיק, פוליש וציפוי קרמי, או טיפולים מיוחדים. אנו מציעים שירות נייד להגעה עד אליכם או עבודה במתחם המקצועי שלנו.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="rounded-full font-bold"
              >
                קרא עוד
              </Button>
            </div>
          </motion.div>

          {/* Right column - Images */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} viewport={{
          once: true
        }} className="flex justify-center items-center">
            <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-sm aspect-[4/5]">
              <img src="/lovable-uploads/daniel.png" alt="מומחה דיטיילינג מטפל ברכב" className="w-full h-full object-cover object-top" />
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        
      </div>
    </section>;
};
