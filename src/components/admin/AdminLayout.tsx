
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
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/blog', label: 'Blog Posts', icon: FileEdit },
  { path: '/admin/shop', label: 'Shop Items', icon: Store },
  { path: '/admin/services', label: 'Services', icon: Settings },
  { path: '/admin/media', label: 'Media Library', icon: Image },
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
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary/10",
          isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"
        )}
        onClick={() => setOpen(false)}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card/50 p-4">
        <div className="flex h-14 items-center px-4 border-b mb-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-4 border-t">
          <div className="px-3 py-2">
            <p className="text-xs text-muted-foreground">Signed in as:</p>
            <p className="font-medium truncate">{adminUser?.email}</p>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center px-4 border-b">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto" 
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
              <p className="text-xs text-muted-foreground">Signed in as:</p>
              <p className="font-medium truncate">{adminUser?.email}</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <div className="lg:hidden w-8" /> {/* Placeholder for mobile menu button */}
          <h1 className="text-lg font-semibold lg:hidden">Admin Panel</h1>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
