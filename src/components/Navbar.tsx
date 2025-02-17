
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Logo
          </Link>
          
          <div className="space-x-4 space-x-reverse"> {/* space-x-reverse for RTL */}
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
            <Button variant="default">
              <Link to="/contact">צור קשר</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
