
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        {/* Logo Section */}
        <div className="flex justify-center mb-12">
          <Link to="/" className="inline-block">
            <svg width="205" height="30" viewBox="0 0 205 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.14844 7.94141L0.441406 6.85156V3.79297L8.7207 3.61719H12.1484C15.793 3.61719 18.6113 4.67773 20.6035 6.79883C22.5957 8.9082 23.5918 11.9668 23.5918 15.9746C23.5918 18.6348 23.0996 20.9492 22.1152 22.918C21.1309 24.8867 19.7363 26.3926 17.9316 27.4355C16.1387 28.4785 14.0293 29 11.6035 29H0.441406V25.9414L3.14844 24.8516V7.94141ZM11.709 24.6758C13.584 24.6758 15.0254 24.0254 16.0332 22.7246C17.041 21.4121 17.5449 19.2207 17.5449 16.1504C17.5449 13.2207 17.0762 11.123 16.1387 9.85742C15.2012 8.58008 13.8066 7.94141 11.9551 7.94141H8.7207V24.6758H11.709Z M32.2754 20.4746C32.3691 21.916 32.8027 23.041 33.5762 23.8496C34.3613 24.6465 35.3809 25.0449 36.6348 25.0449C37.5254 25.0449 38.416 24.9219 39.3066 24.6758C40.209 24.418 40.9531 24.1602 41.5391 23.9023C42.1367 23.6328 42.5176 23.4453 42.6816 23.3398L44.2285 26.3281C44.2285 26.375 43.8066 26.6738 42.9629 27.2246C42.1309 27.7637 41.1055 28.2559 39.8867 28.7012C38.6797 29.1348 37.3906 29.3516 36.0195 29.3516C32.9727 29.3516 30.6523 28.5078 29.0586 26.8203C27.4648 25.1328 26.668 22.7422 26.668 19.6484C26.668 17.5625 27.0488 15.7344 27.8105 14.1641C28.584 12.582 29.6914 11.3633 31.1328 10.5078C32.5742 9.64062 34.2852 9.20703 36.2656 9.20703C38.9023 9.20703 40.9238 9.96289 42.3301 11.4746C43.7363 12.9863 44.4395 15.0488 44.4395 17.6621C44.4395 18.2363 44.4102 18.793 44.3516 19.332C44.293 19.8711 44.252 20.2109 44.2285 20.3516L32.2754 20.4746Z" fill="white"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Quick Links */}
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

          {/* Follow Us */}
          <div className="text-right">
            <h3 className="font-bold mb-4">עקבו אחרינו</h3>
            <div className="flex flex-row-reverse gap-4">
              <a href="#" className="hover:text-primary p-2 rounded-full hover:bg-white/5 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary p-2 rounded-full hover:bg-white/5 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary p-2 rounded-full hover:bg-white/5 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Subscribe */}
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
