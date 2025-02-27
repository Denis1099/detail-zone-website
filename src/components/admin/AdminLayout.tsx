
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import {
  LayoutDashboard,
  FileEdit,
  Store,
  Settings,
  Menu,
  X,
  LogOut,
  Upload,
  Image,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/admin/dashboard', label: 'לוח בקרה', icon: LayoutDashboard },
  { path: '/admin/blog', label: 'פוסטים בבלוג', icon: FileEdit },
  { path: '/admin/shop', label: 'פריטי חנות', icon: Store },
  { path: '/admin/services', label: 'שירותים', icon: Settings },
  { path: '/admin/media', label: 'ספריית מדיה', icon: Image },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut, adminUser } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: any }) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary/10 text-right",
          isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"
        )}
        onClick={() => setOpen(false)}
      >
        <span>{label}</span>
        <Icon className="h-5 w-5 mr-auto" />
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-l bg-card/50 p-4">
        <div className="flex h-14 items-center px-4 border-b mb-4">
          <h1 className="text-xl font-bold">פאנל ניהול</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-4 border-t">
          <div className="px-3 py-2">
            <p className="text-xs text-muted-foreground">מחובר כ:</p>
            <p className="font-medium truncate">{adminUser?.email}</p>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-end" 
            onClick={handleSignOut}
          >
            <span>התנתק</span>
            <LogOut className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="fixed right-4 top-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-0">
          <div className="flex h-14 items-center px-4 border-b">
            <h1 className="text-xl font-bold">פאנל ניהול</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-auto" 
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2 p-4">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>

          <div className="mt-auto space-y-4 p-4 border-t">
            <div className="px-3 py-2">
              <p className="text-xs text-muted-foreground">מחובר כ:</p>
              <p className="font-medium truncate">{adminUser?.email}</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-end" 
              onClick={handleSignOut}
            >
              <span>התנתק</span>
              <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <div className="lg:hidden w-8" /> {/* Placeholder for mobile menu button */}
          <h1 className="text-lg font-semibold lg:hidden">פאנל ניהול</h1>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
