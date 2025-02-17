import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PhoneCall, Car, Home, Star, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
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

      {/* Services Section */}
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

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium mb-4 inline-block">
              ממליצ��ם עלינו
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

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative">
          <Card className="glass-card max-w-4xl mx-auto p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                רוצה להתחיל?
              </h2>
              <p className="text-gray-400">
                השאר פרטים ונחזור אליך בהקדם
              </p>
            </div>
            <form className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="שם מלא"
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
              <input
                type="tel"
                placeholder="טלפון"
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
              <textarea
                placeholder="הודעה"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
              <Button className="w-full" size="lg">
                <ChevronLeft className="ml-2 h-4 w-4" />
                שלח פרטים
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

const services = [
  {
    icon: <Car className="h-8 w-8" />,
    title: "דיטיילינג מלא",
    description: "טיפול מקיף הכולל ניקוי, פוליש וציפוי הגנה לרכב",
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: "שירות עד הבית",
    description: "אנחנו מגיעים אליך עם כל הציוד הנדרש",
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "מוצרי דיטיילינג",
    description: "מבחר מוצרים מקצועיים לטיפול ברכב",
  },
];

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

export default Index;
