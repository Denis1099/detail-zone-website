
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { useEffect } from "react";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import BlogEditor from "./pages/admin/BlogEditor";
import ShopEditor from "./pages/admin/ShopEditor";
import ServicesEditor from "./pages/admin/ServicesEditor";
import MediaLibrary from "./pages/admin/MediaLibrary";
import Gallery from "./pages/Gallery";
import Cart from "./pages/Cart";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const queryClient = new QueryClient();

// Create router with proper data router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Index />
      </>
    ),
  },
  {
    path: "/shop",
    element: (
      <>
        <ScrollToTop />
        <Shop />
      </>
    ),
  },
  {
    path: "/shop/:id",
    element: (
      <>
        <ScrollToTop />
        <ProductDetails />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <ScrollToTop />
        <Cart />
      </>
    ),
  },
  {
    path: "/blog",
    element: (
      <>
        <ScrollToTop />
        <Blog />
      </>
    ),
  },
  {
    path: "/blog/:id",
    element: (
      <>
        <ScrollToTop />
        <BlogPost />
      </>
    ),
  },
  {
    path: "/gallery",
    element: (
      <>
        <ScrollToTop />
        <Gallery />
      </>
    ),
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/blog",
        element: <BlogEditor />,
      },
      {
        path: "/admin/shop",
        element: <ShopEditor />,
      },
      {
        path: "/admin/services",
        element: <ServicesEditor />,
      },
      {
        path: "/admin/media",
        element: <MediaLibrary />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
