
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Navbar = () => {
  const [cartItems, setCartItems] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Get cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart.length);

    // Listen for cart updates
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(updatedCart.length);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdate', handleStorageChange);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLinks = () => (
    <>
      <Button variant="ghost" asChild>
        <Link to="/">בית</Link>
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection('about')}>
        אודות
      </Button>
      <Button variant="ghost" asChild>
        <Link to="/blog">בלוג</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link to="/shop">חנות</Link>
      </Button>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        {/* Mobile navbar with explicit right/left positioning */}
        <div className="relative md:hidden h-16">
          {/* Logo explicitly on left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Link to="/">
              <img src="/Logo.svg" alt="Detail Zone Logo" className="h-14" />
            </Link>
          </div>
          
          {/* Menu and Cart together on the right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Cart icon next to menu button */}
            {cartItems > 0 && (
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {cartItems}
                  </span>
                </Link>
              </Button>
            )}
            
            {/* Menu button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2">
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                  <Button variant="default" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/contact">צור קשר</Link>
                  </Button>
                  
                  {cartItems > 0 && (
                    <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/cart" className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        הסל שלי ({cartItems})
                      </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop navbar (unchanged) */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <img src="/Logo.svg" alt="Detail Zone Logo" className="h-12" />
          </Link>

          {/* Navigation Links */}
          <div className="flex justify-center gap-4">
            <NavLinks />
          </div>

          {/* Cart and CTA */}
          <div className="flex items-center gap-4">
            {cartItems > 0 && (
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {cartItems}
                  </span>
                </Link>
              </Button>
            )}
            <Button variant="default" asChild>
              <Link to="/contact">צור קשר</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
