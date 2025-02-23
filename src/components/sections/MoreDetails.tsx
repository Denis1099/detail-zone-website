
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Facebook, Instagram, MessageCircle } from "lucide-react";

export const MoreDetails = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">פרטי התקשרות</h2>
          <p className="text-muted-foreground">מוזמנים ליצור קשר או לבקר אותנו</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card className="glass-card p-4 h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3390.829284365661!2d34.6550145!3d31.7953463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502a23938902c91%3A0x75043bd0638f767c!2sHaAvoda%20St%2038%2C%20Ashdod!5e0!3m2!1sen!2sil!4v1707928167345!5m2!1sen!2sil"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "0.5rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Card>

          {/* Contact Details */}
          <Card className="glass-card p-8">
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <Button size="icon" variant="ghost" asChild>
                  <a href="tel:05447166278" className="text-primary hover:text-primary">
                    <Phone className="h-6 w-6" />
                  </a>
                </Button>
                <div className="text-right">
                  <p className="font-medium">טלפון</p>
                  <a href="tel:05447166278" className="text-primary hover:underline">
                    054-471-66278
                  </a>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="font-medium mb-1">כתובת</p>
                <p className="text-muted-foreground">העבודה 38, אשדוד</p>
              </div>

              {/* Social Links */}
              <div>
                <p className="font-medium mb-4">עקבו אחרינו</p>
                <div className="flex gap-4">
                  <Button size="icon" variant="ghost" className="hover:text-[#4267B2]" asChild>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="icon" variant="ghost" className="hover:text-[#E1306C]" asChild>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="icon" variant="ghost" className="hover:text-[#25D366]" asChild>
                    <a href="https://wa.me/9725447166278" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
