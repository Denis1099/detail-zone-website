import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Youtube, Tiktok } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-12">
          <Link to="/" className="inline-block">
            <img src="/Logo.svg" alt="Detail Zone Logo" className="h-12" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-right">
            <h3 className="font-bold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li><Link to="/services" className="hover:text-primary">שירותים</Link></li>
              <li><Link to="/shop" className="hover:text-primary">חנות</Link></li>
              <li><Link to="/blog" className="hover:text-primary">בלוג</Link></li>
              <li><Link to="/contact" className="hover:text-primary">צור קשר</Link></li>
            </ul>
          </div>

          <div className="text-right">
            <h3 className="font-bold mb-4">עקבו אחרינו</h3>
            <div className="flex justify-end gap-6">
              <a href="https://www.facebook.com/detailzone07" target="_blank" rel="noopener noreferrer" className="hover:text-primary p-2 rounded-full hover:bg-white/5 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/detail__zone/" target="_blank" rel="noopener noreferrer" className="hover:text-primary p-2 rounded-full hover:bg-white/5 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@daniel-detailzone" target="_blank" rel="noopener noreferrer" className="hover:text-primary p-2 rounded-full hover:bg-white/5 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://www.tiktok.com/@danieldetailzone" target="_blank" rel="noopener noreferrer" className="hover:text-primary p-2 rounded-full hover:bg-white/5 transition-colors">
                <Tiktok className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="text-right">
            <h3 className="font-bold mb-4">הישארו מעודכנים</h3>
            <p className="text-sm text-gray-400 mb-4">
              הצטרפו לניוזלטר שלנו לעדכונים על שירותים ומבצעים מיוחדים
            </p>
            <form className="space-y-2">
              <Input 
                type="email" 
                placeholder="הזינו את האימייל שלכם"
                className="text-right"
              />
              <Button className="w-full">הרשמה לעדכונים</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400 order-2 md:order-1">
              © 2024 Detail Zone. כל הזכויות שמורות.
            </div>
            <div className="flex items-center gap-4 order-1 md:order-2">
              <Link to="/privacy" className="text-sm hover:text-primary">מדיניות פרטיות</Link>
              <Link to="/terms" className="text-sm hover:text-primary">תנאי שימוש</Link>
              <Link to="/cookies" className="text-sm hover:text-primary">מדיניות עוגיות</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
