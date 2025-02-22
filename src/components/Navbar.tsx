import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <Link to="/">
            <img src="/Logo.svg" alt="Detail Zone Logo" className="h-12" />
          </Link>

          {/* Navigation Links - Center */}
          <div className="flex justify-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/">בית</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/about">אודות</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/blog">בלוג</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/shop">חנות</Link>
            </Button>
          </div>

          {/* CTA Button - Right Side */}
          <div>
            <Button variant="default" asChild>
              <Link to="/contact">צור קשר</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};