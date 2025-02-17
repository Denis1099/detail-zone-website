
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Social Links */}
          <div className="text-right">
            <img src="/lovable-uploads/a4581448-321b-42c7-9671-83ef98cec59e.png" alt="AIT Logo" className="h-16 mb-6" />
            <div className="flex justify-end space-x-4 space-x-reverse">
              <a href="#" className="hover:text-primary">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <h3 className="text-lg font-bold mb-4">צור קשר</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-end">077-4447021</p>
              <p>יעקב פיכמן 11 פתח תקווה</p>
              <Link to="/contact" className="text-primary hover:underline">
                מידע נוסף ותיאום תור
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-right">
            <h3 className="text-lg font-bold mb-4">ניווט באתר</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary">דף הבית</Link></li>
              <li><Link to="/about" className="hover:text-primary">אודותינו</Link></li>
              <li><Link to="/services" className="hover:text-primary">השירותים שלנו</Link></li>
              <li><Link to="/projects" className="hover:text-primary">פרויקטים</Link></li>
              <li><Link to="/faq" className="hover:text-primary">שאלות נפוצות</Link></li>
              <li><Link to="/blog" className="hover:text-primary">סרטונים</Link></li>
              <li><Link to="/contact" className="hover:text-primary">צור קשר</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
