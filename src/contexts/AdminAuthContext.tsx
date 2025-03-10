
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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchAdminUser(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchAdminUser(session.user.id);
      } else {
        setAdminUser(null);
        setLoading(false);
      }
    });

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
        .single();
      
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
    setError(null);
    
    try {
      console.log("Signing in with email:", email);
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
        .single();
      
      console.log("Admin lookup result:", adminData, adminError);
      
      if (adminError) {
        console.error("Admin lookup error:", adminError);
        await supabase.auth.signOut();
        throw new Error(`שגיאת מסד נתונים: ${adminError.message}`);
      }
      
      if (!adminData) {
        await supabase.auth.signOut();
        throw new Error('משתמש זה אינו מנהל. אנא ודא את סטטוס המנהל שלך.');
      }
      
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
