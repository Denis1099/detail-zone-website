
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const beforeAfterPairs = [
  {
    title: "חידוש פנים הרכב",
    before: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    after: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4"
  },
  {
    title: "פוליש ווקס",
    before: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    after: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
  },
  {
    title: "ציפוי קרמי",
    before: "https://images.unsplash.com/photo-1542362567-b07e54358753",
    after: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341"
  }
];

const BeforeAfterSlider = ({ before, after, title }) => {
  const x = useMotionValue(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const background = useTransform(x, [-sliderWidth, 0], ["100%", "0%"]);

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl" 
         onMouseDown={(e) => setSliderWidth(e.currentTarget.offsetWidth)}>
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${before})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${after})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: useTransform(x, [-sliderWidth, 0], 
            ["polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
             "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"]
          )
        }}
      />
      
      <motion.div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -sliderWidth, right: 0 }}
        dragElastic={0}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="text-black">⟷</div>
        </div>
      </motion.div>
      
      <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full">
        <span className="text-sm text-white">{title}</span>
      </div>
    </div>
  );
};

export const Portfolio = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">עבודות אחרונות</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            הצצה לתוצאות העבודה שלנו. הזז את הסליידר כדי לראות את ההבדל
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterPairs.map((pair, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlider {...pair} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
