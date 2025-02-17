
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Right side navigation */}
          <div className="space-x-4 space-x-reverse order-1"> {/* space-x-reverse for RTL */}
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

          {/* Center logo */}
          <Link to="/" className="text-2xl font-bold text-primary order-2">
            <img src="/lovable-uploads/8ecd6f4d-adfd-4b53-9698-6d0980f307fb.png" alt="Detail Zone" className="h-8" />
          </Link>

          {/* Left side CTA */}
          <div className="order-3">
            <Button variant="default" asChild>
              <Link to="/contact">צור קשר</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
