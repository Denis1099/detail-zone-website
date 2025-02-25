
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

interface CTAFormProps {
  formId?: string;
}

export const CTAForm = ({ formId = "main-page" }: CTAFormProps) => {
  return (
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
          <form className="max-w-md mx-auto space-y-4" id={formId}>
            <input
              type="text"
              placeholder="שם מלא"
              className="w-full px-4 py-2 rounded-lg bg-background/50 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-right"
              dir="rtl"
            />
            <input
              type="tel"
              placeholder="טלפון"
              className="w-full px-4 py-2 rounded-lg bg-background/50 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-right"
              dir="rtl"
            />
            <textarea
              placeholder="הודעה"
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-background/50 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-right"
              dir="rtl"
            />
            <Button className="w-full" size="lg">
              <ChevronLeft className="ml-2 h-4 w-4" />
              שלח פרטים
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
