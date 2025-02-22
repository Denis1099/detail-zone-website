
import { Card } from "@/components/ui/card";
import { Car, Shield, Droplet, CircleDot, PaintBucket, Brush, DollarSign, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <div className="flex justify-center"><Shield className="h-8 w-8" /></div>,
    title: "ציפוי ננו לכל חלקי הרכב",
    description: "הגנה מתקדמת לשמירה על מראה חדש",
  },
  {
    icon: <div className="flex justify-center"><Car className="h-8 w-8" /></div>,
    title: "דיטיילינג וחידוש פנים הרכב",
    description: "ניקוי וחידוש מקצועי של פנים הרכב",
  },
  {
    icon: <div className="flex justify-center"><Droplet className="h-8 w-8" /></div>,
    title: "ציפוי ננו לעור",
    description: "הגנה מיוחדת לריפודי עור",
  },
  {
    icon: <div className="flex justify-center"><CircleDot className="h-8 w-8" /></div>,
    title: "ציפוי ננו לג׳אנטים",
    description: "הגנה והברקה לג'אנטים",
  },
  {
    icon: <div className="flex justify-center"><Shield className="h-8 w-8" /></div>,
    title: "עיטוף ppf להגנה משריטות",
    description: "הגנה מקסימלית מפני שריטות ופגיעות",
  },
  {
    icon: <div className="flex justify-center"><PaintBucket className="h-8 w-8" /></div>,
    title: "חידוש צבע, פוליש רב שלבי",
    description: "השבת הברק המקורי לצבע הרכב",
  },
  {
    icon: <div className="flex justify-center"><DollarSign className="h-8 w-8" /></div>,
    title: "חידוש רכב לפני מכירה",
    description: "שדרוג מראה הרכב למכירה מהירה",
  },
  {
    icon: <div className="flex justify-center"><Brush className="h-8 w-8" /></div>,
    title: "תיקוני צבע",
    description: "תיקונים מקצועיים לפגיעות בצבע",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
                <p className="text-gray-400 text-center">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
