
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Navbar = () => {
  const [cartItems, setCartItems] = useState<number>(0);

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

  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <Link to="/">
            <img src="/Logo.svg" alt="Detail Zone Logo" className="h-12" />
          </Link>

          {/* Navigation Links - Center (Hidden on Mobile) */}
          <div className="hidden md:flex justify-center gap-4">
            <NavLinks />
          </div>

          {/* Cart and CTA - Right Side */}
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
            <Button variant="default" className="hidden md:flex" asChild>
              <Link to="/contact">צור קשר</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                  <Button variant="default" asChild>
                    <Link to="/contact">צור קשר</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
