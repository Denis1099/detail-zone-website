
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type CounterProps = {
  end: number;
  label: string;
  duration?: number;
  suffix?: string;
};

const Counter = ({ end, label, duration = 2000, suffix = "" }: CounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {isInView ? count : 0}{suffix}
      </div>
      <div className="text-sm md:text-base text-text/80">{label}</div>
    </div>
  );
};

export const AboutUs = () => {
  return (
    <section 
      className="py-20 bg-gradient-to-b from-black to-card relative overflow-hidden" 
      id="about" 
      dir="rtl"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')]"/>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-text mb-4"
          >
            <span className="text-primary">מי </span>אנחנו?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            צוות מקצועי וניסיון עשיר בתחום הדיטיילינג והטיפוח לרכב
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-text">
                הסיפור שלנו
              </h3>
              <p className="text-text/80 leading-relaxed mb-4">
                ב-Detail Zone, אנחנו מקפידים על איכות ושירות ללא פשרות כבר למעלה מעשור. המומחיות שלנו בטיפולי דיטיילינג מקצועיים הפכה אותנו למובילים בדרום הארץ.
              </p>
              <p className="text-text/80 leading-relaxed">
                הצוות שלנו, בהובלת דניאל, משלב ידע מקצועי עם תשוקה לרכבים ולפרטים הקטנים. אנו מאמינים שכל רכב ראוי לטיפול אישי ומותאם, ולכן אנו משתמשים רק בחומרים איכותיים ובטכניקות מתקדמות מהעולם.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-text">
                הגישה שלנו
              </h3>
              <p className="text-text/80 leading-relaxed">
                המטרה שלנו היא להחזיר את הרכב שלכם למצב מושלם, בין אם מדובר בניקוי פנימי מעמיק, פוליש וציפוי קרמי, או טיפולים מיוחדים. אנו מציעים שירות נייד להגעה עד אליכם או עבודה במתחם המקצועי שלנו.
              </p>
            </div>
          </motion.div>

          {/* Right column - Images */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-12 grid-rows-6 gap-3 h-[600px]"
          >
            <div className="col-span-8 row-span-3 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/bf1aea89-b8c8-48c1-b4c5-3d4d40db6cda.png" 
                alt="מומחה דיטיילינג מטפל ברכב" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-4 row-span-6 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1582539240614-18d985c08b9c" 
                alt="צוות עבודה מקצועי" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-8 row-span-3 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c" 
                alt="ציוד מקצועי לטיפול ברכב" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 py-12 px-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <Counter end={5000} label="לקוחות מרוצים" />
            <Counter end={98} label="אחוזי שביעות רצון" suffix="%" />
            <Counter end={12} label="שנות ניסיון" suffix="+" />
            <Counter end={15000} label="רכבים טופלו" suffix="+" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
