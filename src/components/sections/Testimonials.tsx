
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

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

export const Testimonials = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card p-6">
                <div className="flex items-center mb-4">
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
                <p className="text-gray-300 mb-4">{testimonial.text}</p>
                <div className="font-medium">{testimonial.name}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
