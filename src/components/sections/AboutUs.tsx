
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return <section className=" flex flex-col justify-between bg-gradient-to-b from-black to-card  relative overflow-hidden" id="about" dir="rtl">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] pointer-events-none">
        <div className="absolute inset-0 " />
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
        }} className="text-3xl md:text-4xl font-bold text-text mb-4">
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
        }} className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-4 md:mb-8">
            צוות מקצועי וניסיון עשיר בתחום הדיטיילינג והטיפוח לרכב
          </motion.p>
        </div>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center mb-8 md:mb-20">
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
            <div className="space-y-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-text">
                  הסיפור שלנו
                </h3>
                <p className="text-text/80 leading-relaxed mb-4 text-sm md:text-base">
                אני דניאל, הבעלים של DetailZone, עם 6 שנות ניסיון בדיטיילינג וציפוי ננו-קרמי. טיפלנו ביותר מ-2,000 רכבים, ואצלנו אין פשרות על איכות – כי הרכב שלך והשם שלנו זה כל הסיפור.
                </p>
                <p className="text-text/80 leading-relaxed mb-4 text-sm md:text-base">
                מומחי הדיטיילינג שלנו מתמחים בטיפול ברכבים חדשים ורכבי יוקרה, ומבטיחים להם הגנה מושלמת, ברק אינסופי ועמידות ארוכת טווח בעזרת חומרים מהשורה הראשונה.                </p>
              </div>

              {isMobile && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex justify-center items-center my-6"
                >
                  <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-sm aspect-[4/5]">
                    <img src="/lovable-uploads/daniel.png" alt="מומחה דיטיילינג מטפל ברכב" className="w-full h-full object-cover object-top" />
                  </div>
                </motion.div>
              )}

              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-text">
                למה לבחור ב-DetailZone?
                          </h3>
                <ul className="space-y-2 text-text/80 text-sm md:text-base">
                  <li className="flex items-start">
                    <span className="text-primary font-bold ml-2">✔</span>
                    <span>ניסיון מוכח – 6 שנים, 2,000 לקוחות מרוצים והמלצות שמדברות בעד עצמן.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold ml-2">✔</span>
                    <span>חומרים מתקדמים – שימוש בטכנולוגיה החדשנית ביותר לתוצאות שגורמות לכם לחזור</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold ml-2">✔</span>
                    <span>ציפוי ננו-קרמי ברמה הגבוהה ביותר – מראה חדש והגנה מקסימלית.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold ml-2">✔</span>
                    <span>שירות אישי ומקצועי – דגש על שביעות רצון מקצועיות ואנושיות.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold ml-2">✔</span>
                    <span>הגנה לטווח ארוך – שימור הרכב שלך במצב המיטבי לשנים קדימה.</span>
                  </li>
                </ul>
                <p className="text-text/80 leading-relaxed mt-4 text-sm md:text-base">
                ב-DetailZone, אנחנו לא רק מטפלים ברכב – אנחנו דואגים לו, כמו לרכב הפרטי שלנו.
                מתלבט? מחפש פתרון מקצועי? דבר איתנו לייעוץ ללא התחייבות!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column - Images - Only shown on non-mobile */}
          {!isMobile && (
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
          )}
        </div>

        {/* Stats section */}
        
      </div>
    </section>;
};
