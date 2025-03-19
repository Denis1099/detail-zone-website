
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, AdminUser } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type AdminAuthContextType = {
  session: Session | null;
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Clear site storage for development purpose
  // Remove this for production build
  useEffect(() => {
    const clearStorageOnce = () => {
      try {
        if (!localStorage.getItem('admin-auth-cleared')) {
          console.log("⚠️ Development: Clearing auth state on initial load");
          supabase.auth.signOut();
          localStorage.setItem('admin-auth-cleared', 'true');
        }
      } catch (e) {
        console.error("Storage error:", e);
      }
    };
    
    // Only run this in development mode
    if (import.meta.env.DEV) {
      clearStorageOnce();
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log("Auth state changed:", event, currentSession?.user?.id);
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, clearing state");
        setSession(null);
        setUser(null);
        setAdminUser(null);
        setLoading(false);
        return;
      }

      if (currentSession?.user) {
        await fetchAdminUser(currentSession.user.id);
      } else {
        setAdminUser(null);
        setLoading(false);
      }
    });

    // THEN check for existing session
    const getSession = async () => {
      try {
        console.log("Checking for existing session...");
        setLoading(true);
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Current session:", currentSession);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          console.log("Session found, fetching admin user data");
          await fetchAdminUser(currentSession.user.id);
        } else {
          console.log("No session found");
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        setLoading(false);
      }
    };

    getSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchAdminUser = async (userId: string) => {
    try {
      console.log("Fetching admin user for ID:", userId);
      setLoading(true);
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching admin user:', error);
        setAdminUser(null);
      } else if (!data) {
        console.log("No admin user found for ID:", userId);
        setAdminUser(null);
      } else {
        console.log("Admin user data found:", data);
        setAdminUser(data as AdminUser);
      }
    } catch (error) {
      console.error('Error in fetchAdminUser:', error);
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      console.log("Signing in with email:", email);
      
      // Clear any existing session first to prevent conflicts
      await supabase.auth.signOut();
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (authError) {
        throw authError;
      }
      
      if (!data.user) {
        throw new Error('לא התקבלו פרטי משתמש מהשרת');
      }
      
      console.log("Auth successful for user ID:", data.user.id);
      
      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();
      
      console.log("Admin lookup result:", adminData);
      
      if (adminError) {
        console.error("Admin lookup error:", adminError);
        await supabase.auth.signOut();
        throw new Error(`שגיאת מסד נתונים: ${adminError.message}`);
      }
      
      if (!adminData) {
        console.log("User is not an admin, signing out");
        await supabase.auth.signOut();
        throw new Error('משתמש זה אינו מנהל. אנא ודא את סטטוס המנהל שלך.');
      }
      
      console.log("Admin authentication successful");
      setAdminUser(adminData as AdminUser);
      
      toast({
        title: 'ברוך שובך!',
        description: 'התחברת בהצלחה.',
      });
      
    } catch (error: any) {
      console.error("Login error:", error);
      await supabase.auth.signOut();
      setAdminUser(null);
      
      toast({
        variant: 'destructive',
        title: 'שגיאת אימות',
        description: error.message || 'ההתחברות נכשלה',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log("Signing out...");
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setAdminUser(null);
      toast({
        title: 'התנתקת',
        description: 'התנתקת בהצלחה.',
      });
    } catch (error: any) {
      console.error("Signout error:", error);
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'ההתנתקות נכשלה',
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    adminUser,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!adminUser,
    isSuperAdmin: adminUser?.is_super_admin || false,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
