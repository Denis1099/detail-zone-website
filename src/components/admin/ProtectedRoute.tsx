
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAdminAuth();

  useEffect(() => {
    // Check current session on component mount
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error checking session:", error);
          return;
        }
        console.log("Current session in ProtectedRoute:", data.session);
      } catch (error) {
        console.error("Exception checking session:", error);
      }
    };
    
    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center" dir="rtl">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
