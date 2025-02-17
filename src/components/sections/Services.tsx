
import { Card } from "@/components/ui/card";
import { Car, Home, Star } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <div className="flex justify-center"><Car className="h-8 w-8" /></div>,
    title: "דיטיילינג מלא",
    description: "טיפול מקיף הכולל ניקוי, פוליש וציפוי הגנה לרכב",
  },
  {
    icon: <div className="flex justify-center"><Home className="h-8 w-8" /></div>,
    title: "שירות עד הבית",
    description: "אנחנו מגיעים אליך עם כל הציוד הנדרש",
  },
  {
    icon: <div className="flex justify-center"><Star className="h-8 w-8" /></div>,
    title: "מוצרי דיטיילינג",
    description: "מבחר מוצרים מקצועיים לטיפול ברכב",
  },
];

export const Services = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium mb-4 inline-block">
            השירותים שלנו
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            טיפול מושלם לרכב שלך
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card p-6 h-full hover:scale-105 transition-transform duration-300">
                <div className="text-primary mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
